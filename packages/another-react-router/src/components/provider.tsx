import React, { useEffect, useState } from "react"
import { useParams } from "../hooks"
import { useInitRouter } from "../hooks/use-init-router"
import { type InitRouterOptions, type RouteWithComponents } from "../router"

const getNotFoundPage = (routes: RouteWithComponents[]) => {}

export function AnotherReactRouterProvider<T extends RouteWithComponents[]>(
	props: InitRouterOptions<T>
) {
	const [component, setComponent] = useState<React.ReactNode>()

	const currentPath = useInitRouter(props)
	useEffect(() => {
		const route = props.routes.find(route => route.path === currentPath)
		if (!route) return
		const params = useParams()
		setComponent(
			route.layout ? (
				<route.layout params={params}>
					<route.page params={params} />
				</route.layout>
			) : (
				<route.page params={params} />
			)
		)
	}, [currentPath])

	return component
}
