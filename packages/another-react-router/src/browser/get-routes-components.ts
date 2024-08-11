import { type Route, type RouteWithModules } from "@/browser/"

/**
 * This function is used in `config` file to get all routes from generated `rawRoutes`,
 * so its not usefull in other scenarios
 */
const getRoutesComponents = (routes: RouteWithModules[]): Promise<Route[]> => {
  return Promise.all(
    routes.map<Promise<Route>>(async route => {
      if (!("path" in route))
        return { routes: await getRoutesComponents(route.routes) }
      const [page, layout, notFound, routes] = await Promise.all([
        route.page,
        route.layout,
        route["not-found"],
        getRoutesComponents(route.routes),
      ])
      return {
        path: route.path,
        page: "default" in page ? page.default : page.Page,
        layout: layout
          ? "default" in layout
            ? layout?.default
            : layout?.Layout
          : undefined,
        "not-found": notFound
          ? "default" in notFound
            ? notFound?.default
            : notFound?.NotFoundPage
          : undefined,
        useOleg: route.useOleg,
        routes,
      } satisfies Route
    })
  )
}

export { getRoutesComponents }
