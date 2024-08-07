import { RawRoute } from "@/browser"

const getHrefType = (routes: RawRoute[]) => {
  const types = routes
    .map(route => route.path)
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
