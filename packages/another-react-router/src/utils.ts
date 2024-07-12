const WARNING = `// THIS FILE SHOULD NOT BE MODIFIED
// With love by another-react-router developers 💗`

const getConfigTemplate = (
	fileContent: string,
	noTs: boolean,
	esm: boolean
) => {
	if (!noTs) {
		return `
${WARNING}
import { type RawRoute, getRoutesFromConfig } from "another-react-router"

const rawRoutes = ${fileContent} as const satisfies RawRoute[]
const routes = await getRoutesFromConfig(rawRoutes)

export { routes }
`
	} else if (esm) {
		return `
${WARNING}
import { getRoutesFromConfig } from "another-react-router"

const rawRoutes = ${fileContent}
const routes = await getRoutesFromConfig(rawRoutes)

export { routes }
`
	} else {
		return `
${WARNING}

const getRoutesFromConfig = require("another-react-router").getRoutesFromConfig

const rawRoutes = await getRoutesFromConfig(${fileContent})
const routes = await getRoutesFromConfig(rawRoutes)

module.exports = { routes }
`
	}
}

export { getConfigTemplate }
