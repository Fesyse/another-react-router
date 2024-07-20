import { type FC, type PropsWithChildren } from "react"

export * from "./provider"

type PageProps = {
	params: Record<string, unknown>
}

type PageComponent = FC<PageProps>
type LayoutComponent = FC<PropsWithChildren<PageProps>>
type NotFoundComponent = FC

type LinkComponent<THref extends string = string> = React.FC<
	React.DetailedHTMLProps<
		React.AnchorHTMLAttributes<HTMLAnchorElement>,
		HTMLAnchorElement
	> & { href?: THref }
>

export type {
	PageProps,
	PageComponent,
	LayoutComponent,
	NotFoundComponent,
	LinkComponent
}
