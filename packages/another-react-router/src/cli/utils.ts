import chalk from "chalk"
import fs from "fs-extra"
import path from "path"
import { type PackageJson } from "type-fest"

const WARNING = `// THIS FILE SHOULD NOT BE MODIFIED
// With love by another-react-router developers 💗`

type TemplateType = {
	ts: boolean
	esm: boolean
}

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

const getConfigTemplate = (
	routes: string,
	hrefType: string,
	type: TemplateType
) => {
	if (type.ts) {
		return `
${WARNING}
import { type RawRoute, getRoutesComponents } from "another-react-router"

const rawRoutes: RawRoute[] = ${routes}
const routes = await getRoutesComponents(rawRoutes)

type HrefType = ${hrefType}

export { routes, type HrefType }
`
	} else if (type.esm) {
		return `
${WARNING}
import { getRoutesComponents } from "another-react-router"

const rawRoutes = ${routes}
const routes = await getRoutesComponents(rawRoutes)

export { routes }
`
	} else {
		return `
${WARNING}

const { getRoutesComponents } = require("another-react-router")

const rawRoutes = ${routes}
const routes = await getRoutesComponents(rawRoutes)

module.exports = { routes }
`
	}
}

const getTimeTemplate = () => {
	const date = new Date()
	const hours = date.getHours()
	const minutes = date.getMinutes() % 60
	const seconds = date.getSeconds() % (60 * 60)

	const time = `[${Math.floor(hours / 10)}${hours % 10}:${Math.floor(minutes / 10)}${minutes % 10}:${Math.floor(seconds / 10)}${seconds % 10}]`
	return time
}

export {
	cliLogger,
	getTimeTemplate,
	getConfigTemplate,
	handleCliError,
	getPackageInfo
}
