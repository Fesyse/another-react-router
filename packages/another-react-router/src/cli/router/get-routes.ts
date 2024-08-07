import * as fs from "fs"
import * as nodePath from "path"
import { FILE_TYPE, FileType, type RawRoute } from "@/browser"

const supportedFileExtensions = ["tsx", "jsx", "js", "ts"] as const

type NeccessaryRoutesOptions = {
  routesPath: string
  cwd: string
}
type GetRoutesOptions =
  | (NeccessaryRoutesOptions & {
      prevRoutes: RawRoute[]
      originalRoutesPath: string
    })
  | NeccessaryRoutesOptions

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
  const routes = "prevRoutes" in options ? options.prevRoutes : []
  const routesPath = options.routesPath
  const originalRoutesPath =
    "originalRoutesPath" in options ? options.originalRoutesPath : routesPath!
  nodePath.sep

  const folders: string[] = []
  const routeFiles: RawFileRoute[] = fs
    .readdirSync(routesPath!, { withFileTypes: true })
    .map(file => {
      if (file.isDirectory()) {
        if (file.name.startsWith("_")) return
        folders.push(file.name)
        return undefined
      }

      const fileType = getFileType(file.name)

      if (!fileType) return undefined
      if (fileType !== FILE_TYPE.PAGE) return { fileType, file }

      //@ts-expect-error asd
      const content = fs.readFileSync(file.path + file.name).toString()

      const useOleg =
        content.includes('"use oleg"') || content.includes("'use oleg'")

      return { fileType, file, useOleg }
    })
    .filter(route => !!route)

  // making sure there always page.(js/ts/jsx/tsx) file - otherwise skipping this route
  if (routeFiles.some(file => file.fileType === FILE_TYPE.PAGE)) {
    // now we are creating new route
    const newRoute: Partial<RawRoute> = {}

    // @ts-expect-error asd
    const path = routeFiles[0]!.file.path as string
    const newRoutePath =
      "/" + path.slice(originalRoutesPath.length, path.length - 1)
    newRoute.path =
      newRoutePath.length === 1 ? newRoutePath : newRoutePath + "/"
    routeFiles.map(routeFile => {
      if (routeFile?.useOleg) {
        newRoute.useOleg = true
      }

      newRoute[routeFile.fileType] = nodePath
        .join(path, routeFile.file.name)
        .replaceAll("\\", "/")
    })

    routes.push(newRoute as RawRoute)
  }

  // then mapping through all folders in directory
  folders
    .map(folder => {
      return getRoutes({
        ...options,
        routesPath: routesPath + folder + "/",
        prevRoutes: routes,
        originalRoutesPath,
      })
    })
    .flatMap(routes => routes)

  return routes
}

export { getRoutes }
