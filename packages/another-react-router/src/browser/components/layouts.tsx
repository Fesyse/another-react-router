import type { FC, PropsWithChildren } from "react"
import type {
  FlattenRoute,
  LayoutComponent,
  LayoutProps as LayoutComponentProps,
  Route,
} from "@/browser/"
import React from "react"

export type LayoutsProps = {
  routes: Route[]
  flattenRoutes: FlattenRoute[]
  route: FlattenRoute
} & LayoutComponentProps

type LayoutProps = {
  layouts: LayoutComponent[]
} & LayoutComponentProps

export const getLayouts = (
  routes: Route[],
  routePath: string
): LayoutComponent[] => {
  const matchingRoutes = routes.filter(route =>
    "path" in route ? routePath.startsWith(route.path) : false
  )
  return (
    matchingRoutes
      // @ts-expect-error below we checked if path is in route
      .map(route => [route.layout, ...getLayouts(route.routes, routePath)])
      .flat()
      .filter(l => !!l)
  )
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  layouts,
  children: page,
  ...props
}) => {
  const RouteLayout = layouts[0]
  if (!RouteLayout) return page
  return (
    <RouteLayout {...props}>
      <Layout layouts={layouts.slice(1)} {...props}>
        {page}
      </Layout>
    </RouteLayout>
  )
}

export const Layouts: FC<PropsWithChildren<LayoutsProps>> = ({
  children: page,
  routes,
  flattenRoutes,
  route,
  ...props
}) => {
  const layouts = getLayouts(routes, route.path)
  console.log(layouts)
  return (
    <Layout layouts={layouts} {...props}>
      {page}
    </Layout>
  )
}
