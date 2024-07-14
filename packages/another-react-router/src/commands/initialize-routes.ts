import { Command } from "commander"
import * as fs from "fs"
import * as path from "path"
import { handleCliError } from "../cli-utils"
import { Route } from "../router"
import { getRawRoutes, getRoutes } from "../router/get-routes"
import { getConfigTemplate } from "../utils"

type InitializeRoutesActionOptions = {
	routes: string
	config: string
	cwd: string
	esm: boolean
	ts: boolean
}

export const initializeRoutes = new Command("init")
	.option(
		"-ts, --ts",
		"check if config file output will be written with typescript rules.",
		true
	)
	.option(
		"-e, --esm",
		"check if config file output will be written with esm rules.",
		false
	)
	.option("-r, --routes [routes]", "the path to your routes.", "./src/routes/")
	.option(
		"-c, --config [config]",
		"the path where another-react-router.config.(ts/js) file will be initialized.",
		"./"
	)
	.option(
		"-cw, --cwd <cwd>",
		"the working directory. defaults to the current directory.",
		process.cwd()
	)
	.action(async (options: InitializeRoutesActionOptions) => {
		try {
			const routesPath = path
				.join(
					options.cwd,
					options.routes.endsWith("/") ? options.routes : options.routes + "/"
				)
				.replaceAll("\\", "/")
			const rawRoutes = getRawRoutes({ routesPath, cwd: options.cwd })
			let routes = await getRoutes(rawRoutes, routesPath, options.config)
			routes = routes.map<Route>(route => ({
				path: route.path,
				page: path.relative(options.config, route.page).replaceAll("\\", "/"),
				layout: route.layout
					? path.relative(options.config, route.layout).replaceAll("\\", "/")
					: undefined,
				"not-found": route["not-found"]
					? path
							.relative(options.config, route["not-found"])
							.replaceAll("\\", "/")
					: undefined
			}))

			const fileContent = JSON.stringify(routes)
			const configPath = path.join(
				options.cwd,
				options.config,
				`another-react-router.config.${options.ts ? "ts" : "js"}`
			)
			fs.writeFileSync(
				configPath,
				getConfigTemplate(fileContent, options.ts, options.esm)
			)
		} catch (err) {
			handleCliError(err)
		}
	})
