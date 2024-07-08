import { initRouter } from "another-react-router"
import type { FC, PropsWithChildren } from "react"

export const AnotherReactRouterProvider: FC<PropsWithChildren> = ({
	children
}) => {
	initRouter({})
	return children
}
