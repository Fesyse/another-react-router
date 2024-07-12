import * as path from "path"
import React, { useEffect, useState } from "react"
import { type InitRouterOptions, type Route, useInitRouter } from "../router"

export function AnotherReactRouterProvider<T extends Route[]>(
	props: InitRouterOptions<T>
) {
	const [component, setComponent] = useState<React.ReactNode>()

	const currentPath = useInitRouter(props)
	useEffect(() => {
		;(async () => {
			const route = props.routes.find(route => {
				return route.path === "/"
			})
			if (!route) return
			const Page = route.page
			const Layout = route.layout
			const NotFound = route["not-found"]
			const params = {}

			setComponent(
				Layout ? (
					<Layout params={params}>
						<Page params={params} />
					</Layout>
				) : (
					<Page params={params} />
				)
			)
		})()
	}, [currentPath])

	return component
}
