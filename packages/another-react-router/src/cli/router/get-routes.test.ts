import { expect, test } from "vitest"
import { getRoutes } from "./get-routes"
import * as path from "path"
import * as fs from "fs"
import { RawRoute } from "@/browser"
import { getRouteAsString } from "../commands/initialize-routes"

const cwd = process.cwd()
const routesPath = "test/routes/"
const rootDirectoryPath = path.join(cwd, routesPath)

test("basic route tree", () => {
  // "./routes/"
  fs.mkdirSync(rootDirectoryPath)
  fs.appendFileSync(path.join(rootDirectoryPath, "page.tsx"), "")

  const userDirectory = path.join(rootDirectoryPath, "user")
  // "./routes/user/"
  fs.mkdirSync(userDirectory)
  fs.appendFileSync(path.join(userDirectory, "page.tsx"), "")

  const userIdDirectory = path.join(userDirectory, "[id]")
  // "./routes/user/[id]/"
  fs.mkdirSync(userIdDirectory)
  fs.appendFileSync(path.join(userIdDirectory, "page.tsx"), "")

  const routes = getRoutes({
    routesPath,
    cwd,
  })
  fs.rmdirSync(rootDirectoryPath, { recursive: true })
  expect(routes).toEqual<RawRoute[]>([
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
