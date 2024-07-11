import React from "react"
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
	const currentPath = useInitRouter(props)
	let Page: PageComponent
	let Layout: LayoutComponent | undefined
	let NotFound: NotFoundComponent | undefined
	let params: PageProps["params"]

	const route = props.routes.find(route => {
		return route.path === "/"
	})
	if (!route) return
	Page = require(route.page) as PageComponent
	Layout = route.layout ? (require(route.layout) as LayoutComponent) : undefined
	NotFound = route["not-found"]
		? (require(route["not-found"]) as NotFoundComponent)
		: undefined
	params = {}
	console.log(route)

	if (Layout) {
		return (
			<Layout params={params}>
				<Page params={params} />
			</Layout>
		)
	}
	return <Page params={params} />
}
