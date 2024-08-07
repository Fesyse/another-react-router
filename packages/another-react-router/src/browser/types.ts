import {
  LayoutComponent,
  NotFoundComponent,
  PageComponent,
} from "@/browser/components"
import { ObjectValues } from "@/types"

const FILE_TYPE = {
  PAGE: "page",
  LAYOUT: "layout",
  NOT_FOUND: "not-found",
} as const

type FileType = ObjectValues<typeof FILE_TYPE>

interface InitRouterOptions {
  /**
   * Provide routes that you created via cli
   * @example
   *```jsx
   * import { routes } from "../another-react-router.config.ts"
   *
   * const RouterProvider = () => {
   * 	return <AnotherReactRouterProvider routes={routes} />
   * }
   * ```
   */
  routes: Route[]
}

type Module<Key extends string, Type> =
  | Record<Key, Type>
  | Record<"default", Type>

interface RawRoute {
  path: string
  page: string
  layout?: string
  "not-found"?: string
  useOleg?: boolean
}
interface Route {
  path: string
  page: PageComponent
  layout?: LayoutComponent
  "not-found"?: NotFoundComponent
  useOleg?: boolean
}

interface RouteWithModules {
  path: string
  page: Promise<Module<"Page", PageComponent>>
  layout?: Promise<Module<"Layout", LayoutComponent>>
  "not-found"?: Promise<Module<"NotFoundPage", NotFoundComponent>>
  useOleg?: boolean
}

export * from "@/shared/get-routes-components"
export {
  type InitRouterOptions,
  type Route,
  type RawRoute,
  type RouteWithModules,
  type FileType,
  FILE_TYPE,
}
