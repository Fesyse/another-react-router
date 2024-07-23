const isRouterPathMatcheWithCurrentPath = (
	routerPath: string,
	path: string
): boolean => {
	if (routerPath === path) return true

	const splittedRouterPath = routerPath.split("/").filter(path => path !== "")
	const splittedPath = path.split("/").filter(path => path !== "")

	for (let i = 0; i < splittedRouterPath.length; i++) {
		if (
			splittedRouterPath[i]?.startsWith("[") &&
			splittedRouterPath[i]?.endsWith("]")
		) {
			if (splittedRouterPath[i]?.startsWith("[...")) break
			else continue
		}
		if (splittedRouterPath[i] !== splittedPath[i]) return false
	}
	return true
}

const normalizePathname = (pathname: string) =>
	pathname.endsWith("/") ? pathname : pathname + "/"

export { isRouterPathMatcheWithCurrentPath, normalizePathname }
