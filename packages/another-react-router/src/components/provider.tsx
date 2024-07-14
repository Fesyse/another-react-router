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
			const route = props.routes[0]
			if (!route) return
			const [pageModule, layoutModule, notFoundModule] = await Promise.all([
				import(`./${route.page}`),
				route.layout ? import(`./${route.layout}`) : undefined,
				route["not-found"] ? import(`./${route["not-found"]}`) : undefined
			])

			const Page = pageModule.default ?? pageModule.Page
			const Layout = layoutModule?.default ?? layoutModule?.Layout
			const NotFound = notFoundModule?.default ?? notFoundModule?.NotFound
			const params = {}

			setComponent(<Page params={params} />)
		})()
	}, [currentPath])

	return component
}
