import { CopyCommandButton } from "@/components/copy-button"
import Balancer from "react-wrap-balancer"

export default function Home() {
  return (
    <div className='container pt-20 flex flex-col gap-2'>
      <h1 className='text-center text-4xl font-bold'>Another react router</h1>
      <h2 className='text-center text-xl text-foreground/50 max-w-[40rem] mx-auto'>
        <Balancer>
          is a npm package, that allowes developers and users comfortable route
          between pages on their web applications.
        </Balancer>
      </h2>
      <CopyCommandButton
        commands={{
          __npmCommand__: "npm install another-react-router",
          __yarnCommand__: "yarn add another-react-router",
          __pnpmCommand__: "pnpm add another-react-router",
          __bunCommand__: "bun add another-react-router",
        }}
      />
    </div>
  )
}
