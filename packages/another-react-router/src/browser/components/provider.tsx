import React, { useEffect, useState } from "react"
import { RouterContext, RouterContextProvider } from "./context"
import { NotFound } from "./not-found"
import { WithOleg } from "./with-oleg"
import { type InitRouterOptions, type RouteWithComponents } from "@/browser"
import { useParams } from "@/browser/hooks"
import { useInitRouter } from "@/browser/hooks/use-init-router"
import { isRouterPathMatcheWithCurrentPath } from "@/browser/utils"

const findRouteFromPath = (
	path: string,
	routes: RouteWithComponents[]
): RouteWithComponents | undefined => {
	for (const route of routes) {
		if (isRouterPathMatcheWithCurrentPath(route.path, path)) return route
		else continue
	}
	return undefined
}

const getNotFoundPage = (
	path: string,
	routes: RouteWithComponents[]
): React.ReactNode => {
	const route = findRouteFromPath(path, routes)
	const NotFoundComponent = route?.["not-found"] ?? NotFound
	return <NotFoundComponent />
}

const AnotherReactRouterProvider: React.FC<InitRouterOptions> = props => {
	const [component, setComponent] = useState<React.ReactNode>()
	const params = useParams()

	const currentPath = useInitRouter(props)

	useEffect(() => {
		const route = props.routes.find(route =>
			isRouterPathMatcheWithCurrentPath(route.path, currentPath)
		)
		if (!route) return setComponent(getNotFoundPage(currentPath, props.routes))

		setComponent(
			route.layout ? (
				<route.layout params={params}>
					{route.useOleg ? (
						<WithOleg>
							<route.page params={params} />
						</WithOleg>
					) : (
						<route.page params={params} />
					)}
				</route.layout>
			) : route.useOleg ? (
				<WithOleg>
					<route.page params={params} />
				</WithOleg>
			) : (
				<route.page params={params} />
			)
		)
	}, [currentPath])

	return (
		<RouterContextProvider
			routesPathnames={props.routes.map(route => route.path)}
		>
			{component}
		</RouterContextProvider>
	)
}

export { AnotherReactRouterProvider }
