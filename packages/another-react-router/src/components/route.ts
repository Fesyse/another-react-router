import { type FC, type PropsWithChildren } from "react"

type PageProps = {
	params: Record<string, unknown>
}

type PageComponent = FC<PageProps>
type LayoutComponent = FC<PropsWithChildren<PageProps>>
type NotFoundComponent = FC

export { PageProps, PageComponent, LayoutComponent, NotFoundComponent }
