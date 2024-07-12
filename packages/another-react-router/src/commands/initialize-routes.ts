import { Command } from "commander"
import * as fs from "fs"
import * as path from "path"
import { handleCliError } from "../cli-utils"
import { Route } from "../router"
import { getRoutes } from "../router/get-routes"
import { getConfigTemplate } from "../utils"

type InitializeRoutesActionOptions = {
	routes: string
	config: string
	cwd: string
	esm: boolean
	"no-ts": boolean
}

export const initializeRoutes = new Command("init")
	.option(
		"-nt, --no-ts",
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
		"the path where another-react-router.config.json will be initialized.",
		"./src/"
	)
	.option(
		"-cw, --cwd <cwd>",
		"the working directory. defaults to the current directory.",
		process.cwd()
	)
	.action(async (options: InitializeRoutesActionOptions) => {
		try {
			const routesPath = path.join(
				options.routes.endsWith("/") ? options.routes : options.routes + "/"
			)
			let routes = getRoutes({ routesPath })

			routes = routes.map<Route>(route => {
				const page = route.page.replaceAll("\\", "/")
				const notFound = route["not-found"]?.replaceAll("\\", "/")
				const layout = route.layout?.replaceAll("\\", "/")
				return {
					...route,
					page,
					"not-found": notFound,
					layout
				}
			})

			const fileContent = JSON.stringify(routes)
			const configPath = path.join(
				options.cwd,
				options.config,
				`another-react-router.config.${options["no-ts"] ? "js" : "ts"}`
			)
			fs.writeFileSync(
				configPath,
				getConfigTemplate(fileContent, options["no-ts"], options.esm)
			)
		} catch (err) {
			handleCliError(err)
		}
	})
