const WARNING = `// THIS FILE SHOULD NOT BE MODIFIED
// With love by another-react-router developers 💗`

const getConfigTemplate = (fileContent: string, ts: boolean, esm: boolean) => {
	if (ts) {
		return `
${WARNING}
import { type Route } from "another-react-router"

const routes = ${fileContent}  as const satisfies Route[]

export { routes }
`
	} else if (esm) {
		return `
${WARNING}
const routes = ${fileContent}

export { routes }
`
	} else {
		return `
${WARNING}

const routes = ${fileContent}

module.exports = { routes }
`
	}
}

export { getConfigTemplate }
