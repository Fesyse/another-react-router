import chalk from "chalk"
import fs from "fs-extra"
import path from "path"
import { type PackageJson } from "type-fest"

function getPackageInfo() {
	const packageJsonPath = path.join("package.json")

	return fs.readJSONSync(packageJsonPath) as PackageJson
}

const cliLogger = {
	error(...args: unknown[]) {
		console.log(chalk.red(...args))
	},
	warn(...args: unknown[]) {
		console.log(chalk.yellow(...args))
	},
	info(...args: unknown[]) {
		console.log(chalk.cyan(...args))
	},
	success(...args: unknown[]) {
		console.log(chalk.green(...args))
	},
	break() {
		console.log("")
	}
}

const handleCliError = (error: unknown) => {
	if (typeof error === "string") {
		cliLogger.error(error)
		process.exit(1)
	}

	if (error instanceof Error) {
		cliLogger.error(error.message)
		process.exit(1)
	}

	cliLogger.error("Something went wrong. Please try again.")
	process.exit(1)
}

export { cliLogger, handleCliError, getPackageInfo }
