import { expect, test } from "vitest"
import { getRoutes } from "./get-routes"
import * as path from "path"
import * as fs from "fs"
import {
  FlattenRoute,
  getRoutesComponents,
  PageComponent,
  RawRoute,
  RouteWithModules,
} from "@/browser"
import { flatRoutes } from "@/browser/utils"
import { createElement } from "react"

const cwd = process.cwd()
const routesPath = "test/routes/"
const rootDirectoryPath = path.join(cwd, routesPath)

const mockPage: string = "export default function Page() {}"

test("basic route tree", async () => {
  // "./routes/"
  fs.mkdirSync(rootDirectoryPath)
  fs.appendFileSync(path.join(rootDirectoryPath, "page.tsx"), mockPage)

  const userDirectory = path.join(rootDirectoryPath, "user")
  // "./routes/user/"
  fs.mkdirSync(userDirectory)
  fs.appendFileSync(path.join(userDirectory, "page.tsx"), mockPage)

  const userIdDirectory = path.join(userDirectory, "[id]")
  // "./routes/user/[id]/"
  fs.mkdirSync(userIdDirectory)
  fs.appendFileSync(path.join(userIdDirectory, "page.tsx"), mockPage)

  const rawRoutes = getRoutes({
    routesPath,
    cwd,
  })
  fs.rmdirSync(rootDirectoryPath, { recursive: true })

  expect(rawRoutes).toEqual<RawRoute[]>([
    {
      path: "/",
      page: "test/routes/page.tsx",
      routes: [
        {
          path: "/user/",
          page: "test/routes/user/page.tsx",
          routes: [
            {
              path: "/user/[id]/",
              page: "test/routes/user/[id]/page.tsx",
              routes: [],
            },
          ],
        },
      ],
    },
  ])
})
