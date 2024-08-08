import { RawRoute } from "@/browser"

type Route = {
  path: string
  page: string
  layout?: string
  "not-found"?: string
  useOleg?: boolean
  routes: RawRoute[]
}

const getHrefType = (routes: RawRoute[]) => {
  const types = routes
    .map(route => (route as Route).path)
    .map(type => {
      let withAngledBrackets = false
      const splittedType = type
        .split("/")
        .filter(type => type !== "")
        .map(type => {
          if (type.startsWith("[") && type.endsWith("]")) {
            withAngledBrackets = true
            return "/${string}"
          }
          return `/${type}`
        })
      if (withAngledBrackets) return "`" + splittedType.join("/") + "`"
      return "'" + splittedType.join("/") + "'"
    })

  return types.join(" | ")
}

export { getHrefType }
