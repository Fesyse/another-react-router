const WARNING = `// THIS FILE SHOULD NOT BE MODIFIED
// With love by another-react-router developers 💗`

const getConfigTemplate = (fileContent: string, ts: boolean, esm: boolean) => {
	if (ts) {
		return `
${WARNING}
import { type RawRoute, getRoutesComponents } from "another-react-router"

const rawRoutes = ${fileContent} as const satisfies RawRoute[]
const routes = await getRoutesComponents(rawRoutes)

export { routes }
`
	} else if (esm) {
		return `
${WARNING}
import { getRoutesComponents } from "another-react-router"

const rawRoutes = ${fileContent}
const routes = await getRoutesComponents(rawRoutes)

export { routes }
`
	} else {
		return `
${WARNING}

const { getRoutesComponents } = require("another-react-router")

const rawRoutes = ${fileContent}
const routes = await getRoutesComponents(rawRoutes)

module.exports = { routes }
`
	}
}
const isRouterPathMatchesWithCurrentPath = (
	routerPath: string,
	currentPath: string
): boolean => {
	return routerPath === currentPath
}

export { getConfigTemplate, isRouterPathMatchesWithCurrentPath }
