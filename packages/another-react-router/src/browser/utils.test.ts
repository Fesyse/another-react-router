import { expect, test } from "vitest"
import { flatRoutes } from "./utils"
import type { FlattenRoute, Route } from "./types"
import { createElement } from "react"
import type { PageComponent } from "./components"

const mockPageComponent: PageComponent = props => createElement("div")

test("basic flat routes", () => {
  const routes: Route[] = [
    {
      path: "/",
      page: mockPageComponent,
      routes: [
        {
          path: "/user/",
          page: mockPageComponent,
          routes: [
            {
              path: "/user/[id]/",
              page: mockPageComponent,
              routes: [],
            },
          ],
        },
      ],
    },
  ]

  expect(flatRoutes(routes)).toEqual<FlattenRoute[]>([
    {
      path: "/",
      page: mockPageComponent,
    },
    {
      path: "/user/",
      page: mockPageComponent,
    },
    {
      path: "/user/[id]/",
      page: mockPageComponent,
    },
  ])
})
test("flat routes without page.tsx file", () => {
  const routes: Route[] = [
    {
      path: "/",
      page: mockPageComponent,
      routes: [
        {
          routes: [
            {
              path: "/user/[id]/",
              page: mockPageComponent,
              routes: [],
            },
          ],
        },
      ],
    },
  ]

  expect(flatRoutes(routes)).toEqual<FlattenRoute[]>([
    {
      path: "/",
      page: mockPageComponent,
    },
    {
      path: "/user/[id]/",
      page: mockPageComponent,
    },
  ])
})
