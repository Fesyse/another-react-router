import { type Route, type RouteWithModules } from "@/browser/"

const getRoutesComponents = (routes: RouteWithModules[]): Promise<Route[]> => {
  return Promise.all(
    routes.map<Promise<Route>>(async route => {
      const [page, layout, notFound] = await Promise.all([
        route.page,
        route.layout,
        route["not-found"],
      ])
      return {
        path: route.path as (typeof route)["path"],
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
      } satisfies Route
    })
  )
}

export { getRoutesComponents }
