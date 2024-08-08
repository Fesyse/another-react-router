import { useContext } from "react"
import { RouterContext } from "@/browser/components/context"

const usePathname = () => {
  const { pathname } = useContext(RouterContext)!

  return pathname
}

export { usePathname }
