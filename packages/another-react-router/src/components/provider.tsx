import React, { useEffect, useState } from "react"
import { useParams } from "../hooks"
import { useInitRouter } from "../hooks/use-init-router"
import { type InitRouterOptions, type RouteWithComponents } from "../router"
import { isRouterPathMatchesWithCurrentPath } from "../utils"
import WithOleg from "./with-oleg"

const getNotFoundPage = (
	path: string,
	routes: RouteWithComponents[]
): React.ReactNode => {
	return
}

export function AnotherReactRouterProvider<T extends RouteWithComponents[]>(
	props: InitRouterOptions<T>
) {
	const [component, setComponent] = useState<React.ReactNode>()

	const currentPath = useInitRouter(props)

	useEffect(() => {
		const route = props.routes.find(route =>
			isRouterPathMatchesWithCurrentPath(route.path, currentPath)
		)
		if (!route) return setComponent(getNotFoundPage(currentPath, props.routes))
		const params = useParams()

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

	return component
}
