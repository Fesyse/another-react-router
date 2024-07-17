import React, { useEffect, useState } from "react"
import WithOleg from "./with-oleg"
import { type InitRouterOptions, type RouteWithComponents } from "@/browser"
import { useParams } from "@/browser/hooks"
import { useInitRouter } from "@/browser/hooks/use-init-router"
import { isRouterPathMatchesWithCurrentPath } from "@/browser/utils"

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
