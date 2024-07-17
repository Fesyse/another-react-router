const isRouterPathMatchesWithCurrentPath = (
	routerPath: string,
	currentPath: string
): boolean => {
	return routerPath === currentPath
}

export { isRouterPathMatchesWithCurrentPath }
