import { Command } from "commander"
import * as fs from "fs"
import * as path from "path"
import { handleCliError } from "../cli-utils"
import { getRoutes } from "../router/get-routes"

type InitializeRoutesActionOptions = {
	routes: string
	config: string
	cwd: string
}

export const initializeRoutes = new Command("init")
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
				options.cwd,
				options.routes.endsWith("/") ? options.routes : options.routes + "/"
			)
			const routes = getRoutes({ routesPath })

			const fileContent = JSON.stringify(routes)
			const configPath = path.join(
				options.cwd,
				options.config,
				"another-react-router.config.json"
			)
			fs.writeFileSync(configPath, fileContent)
		} catch (err) {
			handleCliError(err)
		}
	})
