import { AnotherReactRouterProvider as RouterProvider } from "another-react-router"
import type { FC, PropsWithChildren } from "react"
import { routes } from "../../another-react-router.config"

export const AnotherReactRouterProvider: FC<PropsWithChildren> = ({
	children
}) => {
	return <RouterProvider routes={routes}>{children}</RouterProvider>
}
