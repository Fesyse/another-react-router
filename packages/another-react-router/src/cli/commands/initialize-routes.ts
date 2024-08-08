import { watch } from "chokidar"
import { Command } from "commander"
import * as fs from "fs"
import debounce from "lodash.debounce"
import * as path from "path"
import { getHrefType } from "@/cli/router/get-href-type"
import { getRoutes } from "@/cli/router/get-routes"
import { getConfigTemplate, getTimeTemplate } from "@/cli/utils"
import { cliLogger, handleCliError } from "@/cli/utils"
import { RawRoute } from "@/browser"

type InitializeRoutesActionOptions = {
  routes: string
  config: string
  cwd: string
  watch: boolean
  esm: boolean
  ts: boolean
}

export const getRouteAsString = (route: RawRoute): string =>
  "page" in route
    ? `{path:"${route.path}",page:import('./${route.page}')${route.layout ? `,layout:import('./${route.layout}')` : ""}${route["not-found"] ? `,"not-found":import('./${route["not-found"]}')` : ""}${route?.useOleg ? `,useOleg:true` : ""},routes:[${route.routes.map(_route => getRouteAsString(_route)).join("/")}]}`
    : `{routes:[${route.routes.map(_route => getRouteAsString(_route)).join("/")}]}`

export const initializeRoutes = new Command("init")
  .option(
    "-w, --watch",
    "check if routes path should be watching for file changes, and regenerate config if it is.",
    false
  )
  .option(
    "-ts, --ts",
    "check if config file output will be written with typescript rules.",
    true
  )
  .option(
    "-e, --esm",
    "check if config file output will be written with esm rules.",
    false
  )
  .option("-r, --routes [routes]", "the path to your routes.", "./src/routes/")
  .option(
    "-c, --config [config]",
    "the path where another-react-router.config.(ts/js) file will be initialized.",
    "./"
  )
  .option(
    "-cw, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .action(async (options: InitializeRoutesActionOptions) => {
    try {
      function initializeRoutes() {
        const routesPath = path
          .join(
            options.cwd,
            options.routes.endsWith("/") ? options.routes : options.routes + "/"
          )
          .replaceAll("\\", "/")
        const routes: RawRoute[] = getRoutes({
          routesPath,
          cwd: options.cwd,
        }).map(route =>
          "page" in route
            ? {
                path: route.path,
                page: path
                  .relative(options.config, route.page)
                  .replaceAll("\\", "/"),
                layout: route.layout
                  ? path
                      .relative(options.config, route.layout)
                      .replaceAll("\\", "/")
                  : undefined,
                "not-found": route["not-found"]
                  ? path
                      .relative(options.config, route["not-found"])
                      .replaceAll("\\", "/")
                  : undefined,
                useOleg: route.useOleg ? true : undefined,
                routes: route.routes,
              }
            : { routes: route.routes }
        )
        const hrefType = getHrefType(routes)

        const routesAsString =
          "[" + routes.map(getRouteAsString).join(",") + "]"

        const configPath = path.join(
          options.cwd,
          options.config,
          `another-react-router.config.${options.ts ? "ts" : "js"}`
        )

        fs.writeFileSync(
          configPath,
          getConfigTemplate(routesAsString, hrefType, { ...options })
        )

        const _configPath = path
          .join(
            options.config,
            `another-react-router.config.${options.ts ? "ts" : "js"}`
          )
          .replaceAll("\\", "/")

        cliLogger.success(
          getTimeTemplate() +
            `✨ Successfully initialized routes in ${_configPath}.`
        )
      }

      if (!options.watch) return initializeRoutes()
      const debouncedInitializeRoutes = debounce(initializeRoutes, 500)

      const watcher = watch(options.routes)
      watcher.on("all", debouncedInitializeRoutes)
    } catch (err) {
      handleCliError(err)
    }
  })
