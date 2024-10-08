import { Command } from "commander"
import { initializeRoutes } from "./commands/initialize-routes"
import { getPackageInfo } from "./utils"

async function initCli() {
	const packageInfo = await getPackageInfo()

	const program = new Command()
		.name("arr")
		.description(
			"cli that helps configuring your router with another-react-router npm package"
		)
		.version(
			packageInfo.version || "1.0.0",
			"-v, --version",
			"display the version number"
		)

	program.addCommand(initializeRoutes)

	program.parse()
}

initCli()
