import { RawRoute, RouteWithComponents } from "."

const getRoutesComponents = <TRoutes extends RawRoute[]>(
	routes: TRoutes
): Promise<RouteWithComponents[]> => {
	return Promise.all(
		routes.map<Promise<RouteWithComponents>>(async route => {
<<<<<<< HEAD
			const page = await route.page
			const layout = await route.layout
			const notFound = await route["not-found"]
=======
			const [page, layout, notFound] = await Promise.all([
				route.page,
				route.layout,
				route["not-found"]
			])

>>>>>>> 21db525b20324203795aa6b6c59150dc57754b8a
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
