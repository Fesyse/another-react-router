import { type FC, type PropsWithChildren } from "react"
import { type InitRouterOptions, type Route, initRouter } from "../router"

type InferRoutesType<T> = T extends { routes: infer R } ? R : never

type AnotherReactRouterProviderProps<TRoutes> = InitRouterOptions & {
	routes: TRoutes
}

export function AnotherReactRouterProvider<
	TRoutes extends Route[] = InferRoutesType<
		PropsWithChildren<AnotherReactRouterProviderProps<Route[]>>
	>
>(props: PropsWithChildren<AnotherReactRouterProviderProps<TRoutes>>) {
	props.routes
	initRouter(props)

	window.addEventListener("locationchange", function () {
		console.log("location changed!")
	})

	return props.children
}
