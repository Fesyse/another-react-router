import { AnotherReactRouterProvider as RouterProvider } from "another-react-router"
import type { FC } from "react"
import { routes } from "../../../another-react-router.config"

export const AnotherReactRouterProvider: FC = () => {
	return <RouterProvider routes={routes} />
}
