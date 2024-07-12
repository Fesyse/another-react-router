import * as path from "path"
import React, { useEffect, useState } from "react"
import { type InitRouterOptions, type Route, useInitRouter } from "../router"
import type {
	LayoutComponent,
	NotFoundComponent,
	PageComponent,
	PageProps
} from "./route"

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
			const Page = (await import(`./${route.page}`)) as PageComponent
			const Layout = route.layout
				? ((await import(`./${route.layout}`)) as LayoutComponent)
				: undefined
			const NotFound = route["not-found"]
				? ((await import(`./${route["not-found"]}`)) as NotFoundComponent)
				: undefined
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
