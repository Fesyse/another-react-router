import { AnotherReactRouterProvider as RouterProvider } from "another-react-router"
import type { FC } from "react"
import { HrefType, routes } from "../../../another-react-router.config"

export const AnotherReactRouterProvider: FC = () => {
	return <RouterProvider routes={routes} />
}

export const Link: FC<
	Omit<
		React.DetailedHTMLProps<
			React.AnchorHTMLAttributes<HTMLAnchorElement>,
			HTMLAnchorElement
		>,
		"href"
	> & {
		href?: HrefType
	}
> = props => <a {...props} />
