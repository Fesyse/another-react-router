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
    .map(route => ("path" in route ? route.path : undefined))
    .filter(r => r)
    .map(type => {
      let withAngledBrackets = false
      const splittedType = type!
        .split("/")
        .filter(type => type !== "")
        .map(type => {
          if (type.startsWith("[") && type.endsWith("]")) {
            withAngledBrackets = true
            return "/${string}"
          }
          return `/${type}`
        })
      splittedType.unshift("/")
      if (withAngledBrackets) return "`" + splittedType.join("/") + "`"
      return "'" + splittedType.join("/") + "'"
    })

  return types.join(" | ")
}

export { getHrefType }
