import { type FC, type PropsWithChildren } from "react"

export * from "./provider"

type Params = Record<string, string | string[] | undefined>

type PageProps = {
  params: Params
}
type LayoutProps = PageProps

type PageComponent = FC<PageProps>
type LayoutComponent = FC<PropsWithChildren<PageProps>>
type NotFoundComponent = FC

type LinkComponent<THref extends string> = React.FC<
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > & { href?: THref }
>

export type {
  Params,
  PageProps,
  LayoutProps,
  PageComponent,
  LayoutComponent,
  NotFoundComponent,
  LinkComponent,
}
