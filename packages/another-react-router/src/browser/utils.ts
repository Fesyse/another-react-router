const isRouterPathMatcheWithCurrentPath = (
	routerPath: string,
	path: string
): boolean => {
	if (routerPath === path) return true

	const splittedRouterPath = routerPath.split("/").filter(path => path !== "")
	const splittedPath = path.split("/").filter(path => path !== "")

	if (
		splittedRouterPath.length !== splittedPath.length &&
		splittedRouterPath.every(
			path => !(path.startsWith("[...") && path.endsWith("]"))
		)
	)
		return false

	for (let i = 0; i < splittedRouterPath.length; i++) {
		if (
			splittedRouterPath[i]?.startsWith("[") &&
			splittedRouterPath[i]?.endsWith("]")
		) {
			if (!splittedRouterPath[i]?.startsWith("[...")) continue

			// making sure everything before spread route matches
			if (
				isRouterPathMatcheWithCurrentPath(
					splittedRouterPath.slice(0, i).join("/"),
					splittedPath.slice(0, i).join("/")
				)
			)
				break
		}

		if (splittedRouterPath[i] !== splittedPath[i]) return false
	}
	return true
}

const normalizePathname = (pathname: string) =>
	pathname.endsWith("/") ? pathname : pathname + "/"

export { isRouterPathMatcheWithCurrentPath, normalizePathname }
