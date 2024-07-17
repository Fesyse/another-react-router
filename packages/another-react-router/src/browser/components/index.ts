import { type FC, type PropsWithChildren } from "react"

export * from "./provider"

type PageProps = {
	params: Record<string, unknown>
}

type PageComponent = FC<PageProps>
type LayoutComponent = FC<PropsWithChildren<PageProps>>
type NotFoundComponent = FC

type LinkComponent<TRoutes> = React.FC<
	React.ClassAttributes<HTMLAnchorElement> &
		React.AnchorHTMLAttributes<HTMLAnchorElement> &
		TRoutes
>

export {
	PageProps,
	PageComponent,
	LayoutComponent,
	NotFoundComponent,
	LinkComponent
}
