import { RawRoute, RouteWithComponents } from "."

const getRoutesComponents = <TRoutes extends RawRoute[]>(
	routes: TRoutes
): Promise<RouteWithComponents[]> => {
	return Promise.all(
		routes.map<Promise<RouteWithComponents>>(async route => {
			const page = await route.page
			const layout = await route.layout
			const notFound = await route["not-found"]

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
					: undefined
			} satisfies RouteWithComponents
		})
	)
}

export { getRoutesComponents }
