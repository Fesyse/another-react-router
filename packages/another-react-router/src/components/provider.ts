import { type PropsWithChildren } from "react"
import { type InitRouterOptions, type Route, initRouter } from "../router"

export function AnotherReactRouterProvider<T extends Route[]>(
	props: PropsWithChildren<InitRouterOptions<T>>
) {
	props.routes
	initRouter<InitRouterOptions<T>>(props)

	window.addEventListener("locationchange", function () {
		console.log("location changed!")
	})

	return props.children
}
