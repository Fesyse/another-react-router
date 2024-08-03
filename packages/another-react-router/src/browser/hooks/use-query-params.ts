import { useContext } from "react"
import { RouterContext } from "@/browser/components/context"

export const useQueryParams = () => {
  const { pathname } = useContext(RouterContext)!

  return new URLSearchParams(pathname)
}
