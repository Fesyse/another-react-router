import { RawRoute, RouteWithComponents } from "@/browser/router"

const getRoutesComponents = <TRoutes extends RawRoute[]>(
	routes: TRoutes
): Promise<RouteWithComponents[]> => {
	return Promise.all(
		routes.map<Promise<RouteWithComponents>>(async route => {
			const [page, layout, notFound] = await Promise.all([
				route.page,
				route.layout,
				route["not-found"]
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
				useOleg: route.useOleg
			} satisfies RouteWithComponents
		})
	)
}

export { getRoutesComponents }
