import * as fs from "fs"
import * as nodePath from "path"
import { FILE_TYPE, FileType, type RawRoute } from "@/browser"

const supportedFileExtensions = ["tsx", "jsx", "js", "ts"] as const

type GetRoutesOptions = {
  originalRoutesPath?: string
  routesPath: string
  cwd: string
}

type GetRoutes = (options: GetRoutesOptions) => RawRoute[]
interface RawFileRoute {
  fileType: FileType
  file: fs.Dirent
  useOleg?: boolean
}

function getFileType(fileName: string): FileType | undefined {
  const fileNameSplitted = fileName.split(".")
  const fileExtension =
    fileNameSplitted[fileNameSplitted.length - 1]!.toLowerCase()
  const realFileName = fileNameSplitted[0]

  if (!realFileName) return undefined
  if (!supportedFileExtensions.some(extension => fileExtension === extension))
    return undefined

  const valuesOfFileType = Object.values(FILE_TYPE)
  const keysOfFileType = Object.keys(FILE_TYPE) as (keyof typeof FILE_TYPE)[]
  if (!valuesOfFileType.some(type => type === realFileName)) return undefined

  const indexOfFileType =
    keysOfFileType[valuesOfFileType.findIndex(type => type === realFileName)]

  return indexOfFileType ? FILE_TYPE[indexOfFileType] : undefined
}

const getRoutes: GetRoutes = options => {
  const routes: RawRoute[] = []
  const routesPath = options.routesPath
  const originalRoutesPath =
    "originalRoutesPath" in options ? options.originalRoutesPath! : routesPath

  const folders: string[] = []
  const routeFiles: RawFileRoute[] = fs
    .readdirSync(routesPath, { withFileTypes: true })
    .map(file => {
      if (file.isDirectory()) {
        if (file.name.startsWith("_")) return
        folders.push(file.name)
        return undefined
      }

      const fileType = getFileType(file.name)

      if (!fileType) return undefined
      if (fileType !== FILE_TYPE.PAGE) return { fileType, file }

      const content = fs
        // @ts-expect-error path property is included in file
        .readFileSync(nodePath.join(file.path, file.name))
        .toString()

      const useOleg =
        content.includes('"use oleg"') || content.includes("'use oleg'")

      return { fileType, file, useOleg }
    })
    .filter(route => !!route)

  // now we are creating new route
  const newRoute: RawRoute = {
    // settings default children routes to empty array
    routes: [],
  }

  // making sure there always page.(js/ts/jsx/tsx) file - otherwise skipping this route
  if (routeFiles.some(file => file.fileType === FILE_TYPE.PAGE)) {
    // @ts-expect-error path property is included in file
    const path = routeFiles[0]!.file.path as string
    const newRoutePath =
      "/" + path.slice(originalRoutesPath.length, path.length - 1)

    // @ts-expect-error
    newRoute.path =
      newRoutePath.length === 1 ? newRoutePath : newRoutePath + "/"
    routeFiles.map(routeFile => {
      // @ts-expect-error
      if (routeFile?.useOleg) newRoute.useOleg = true

      // @ts-expect-error
      newRoute[routeFile.fileType] = nodePath
        .join(path, routeFile.file.name)
        .replaceAll("\\", "/")
    })
  }

  // then mapping through all folders in directory
  const childrenRoutes = folders
    .map(folder =>
      getRoutes({
        ...options,
        routesPath: routesPath + folder + "/",
        originalRoutesPath,
      })
    )
    .flat()

  newRoute.routes = childrenRoutes
  routes.push(newRoute)

  return routes
}

export { getRoutes }
