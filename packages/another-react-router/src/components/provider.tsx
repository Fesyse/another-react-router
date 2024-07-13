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
			const pageModule = await import(route.page)
			const layoutModule = route.layout ? await import(route.layout) : undefined
			const notFoundModule = route["not-found"]
				? await import(route["not-found"])
				: undefined

			const Page = pageModule.default ?? pageModule.Page
			const Layout = layoutModule?.default ?? layoutModule?.Layout
			const NotFound = notFoundModule?.default ?? notFoundModule?.NotFound
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
