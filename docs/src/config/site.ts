import { type Metadata } from "next"

export const siteConfig = {
  title: "%s | Another react router",
  authors: [
    {
      name: "Another react router team",
      url: "https://github.com/another-react-router",
    },
  ],
  applicationName: "Another react router",
  description:
    "Another react router is a npm package, that allowes developers and users comfortable route between pages on their web applications.",
  icon: "/icon.svg",
} satisfies Metadata & { icon: string }
