import { FlattenRoute, Route } from "./types"

const isRouterPathMatcheWithCurrentPath = (
  routerPath: string,
  path: string
): boolean => {
  if (routerPath === path) return true

  const splittedRouterPath = routerPath.split("/").filter(path => path !== "")
  const splittedPath = path.split("/").filter(path => path !== "")

  if (
    splittedRouterPath.length !== splittedPath.length &&
    // checking if router path doesnt has spread routes because length will be different
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

const flatRoutes = (routes: Route[]): FlattenRoute[] => {
  return routes
    .map(route =>
      "path" in route
        ? [
            {
              ...route,
              routes: undefined,
            },
            ...flatRoutes(route.routes),
          ]
        : flatRoutes(route.routes)
    )
    .flat()
}

const normalizePathname = (pathname: string) =>
  pathname.endsWith("/") ? pathname : pathname + "/"

export { isRouterPathMatcheWithCurrentPath, normalizePathname, flatRoutes }
