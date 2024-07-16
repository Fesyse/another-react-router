import React, { useEffect, useState } from "react"
import { useParams } from "../hooks"
import { useInitRouter } from "../hooks/use-init-router"
import { type InitRouterOptions, type Route } from "../router"

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
			console.log([pageModule, layoutModule, notFoundModule])

			const Page = pageModule.default ?? pageModule.Page
			const Layout = layoutModule?.default ?? layoutModule?.Layout
			const NotFound = notFoundModule?.default ?? notFoundModule?.NotFound
			const params = useParams()

			setComponent(<Page params={params} />)
		})()
	}, [currentPath])

	return component
}
