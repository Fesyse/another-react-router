import { Route } from "@/browser"

const getHrefType = (routes: Route[]) => {
  let types = routes.map(route => route.path)

  types = types.map(type => {
    let splittedType = type.split("/").filter(type => type !== "")
    let withAngledBrackets = false
    splittedType = splittedType.map(type => {
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
