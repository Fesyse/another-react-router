const getConfigTemplate = (
	fileContent: string,
	noTs: boolean,
	esm: boolean
) => {
	if (!noTs) {
		return `
// THIS FILE SHOULD NOT BE MODIFIED
// With love by another-react-router developers 💗

const routes = ${fileContent} as const

export { routes }
`
	} else if (esm) {
		return `const routes = ${fileContent}\n\nexport { routes }`
	} else {
		return `const routes = ${fileContent}\n\nmodule.exports = { routes }`
	}
}

export { getConfigTemplate }
