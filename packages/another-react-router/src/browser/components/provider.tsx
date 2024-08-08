import React, { useEffect, useState } from "react"
import { RouterContextProvider } from "./context"
import { NotFound } from "./not-found"
import { WithOleg } from "./with-oleg"
import { type FlattenRoute, type InitRouterOptions } from "@/browser"
import { useParams } from "@/browser/hooks"
import { useInitRouter } from "@/browser/hooks/use-init-router"
import { flatRoutes, isRouterPathMatcheWithCurrentPath } from "@/browser/utils"
import { Layouts, LayoutsProps } from "./layouts"

const findRouteFromPath = (
  path: string,
  routes: FlattenRoute[]
): FlattenRoute | undefined => {
  for (const route of routes) {
    if (isRouterPathMatcheWithCurrentPath(route.path, path)) return route
    else continue
  }
  return undefined
}

const getNotFoundPage = (
  path: string,
  routes: FlattenRoute[]
): React.ReactNode => {
  const route = findRouteFromPath(path, routes)
  const NotFoundComponent = route?.["not-found"] ?? NotFound
  return <NotFoundComponent />
}

const AnotherReactRouterProvider: React.FC<InitRouterOptions> = props => {
  const [component, setComponent] = useState<React.ReactNode>()
  const params = useParams()

  const [currentPath, setCurrentPath] = useInitRouter(props)
  const flattenRoutes = flatRoutes(props.routes)

  useEffect(() => {
    const route = flattenRoutes.find(route =>
      "path" in route
        ? isRouterPathMatcheWithCurrentPath(route.path, currentPath)
        : FontFaceSetLoadEvent
    )
    if (!route) return setComponent(getNotFoundPage(currentPath, flattenRoutes))

    const layoutsProps: LayoutsProps = {
      route,
      routes: props.routes,
      flattenRoutes,
      params,
    }
    setComponent(
      !route.useOleg ? (
        <Layouts {...layoutsProps}>
          {route.useOleg ? (
            <WithOleg>
              <route.page params={params} />
            </WithOleg>
          ) : (
            <route.page params={params} />
          )}
        </Layouts>
      ) : (
        <WithOleg>
          <route.page params={params} />
        </WithOleg>
      )
    )
  }, [currentPath])

  return (
    <RouterContextProvider
      pathname={currentPath}
      setPathname={setCurrentPath}
      routesPathnames={flattenRoutes.map(route => route.path)}
    >
      {component}
    </RouterContextProvider>
  )
}

export { AnotherReactRouterProvider }
