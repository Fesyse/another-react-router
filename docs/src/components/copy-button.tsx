"use client"

import { CheckIcon, ClipboardIcon } from "lucide-react"
import { Button, type ButtonProps } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useCallback, useEffect, useState } from "react"
import { type DropdownMenuTriggerProps } from "@radix-ui/react-dropdown-menu"
import { type NpmCommands } from "@/types/unist"

interface CopyButtonProps extends ButtonProps {
  value: string
  src?: string
}

interface CopyNpmCommandButtonProps extends DropdownMenuTriggerProps {
  commands: Required<NpmCommands>
  iconClassName?: string
}

export function copyToClipboard(value: string) {
  navigator.clipboard.writeText(value)
}

export function CopyButton({
  value,
  className,
  src,
  variant = "ghost",
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <Button
      size='icon'
      variant={variant}
      className={cn(
        "relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-3 [&_svg]:w-3",
        className
      )}
      onClick={() => {
        copyToClipboard(value)
        setHasCopied(true)
      }}
      {...props}
    >
      <span className='sr-only'>Copy</span>
      {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
    </Button>
  )
}

export function CopyCommandButton({
  commands,
  className,
  iconClassName,
  ...props
}: CopyNpmCommandButtonProps) {
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    setTimeout(() => setHasCopied(false), 2000)
  }, [hasCopied])

  const copyCommand = useCallback((value: string) => {
    copyToClipboard(value)
    setHasCopied(true)
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size='icon'
          variant='ghost'
          className={cn(
            "relative z-10 h-6 w-6 text-foreground dark:hover:bg-background/50 hover:bg-border dark:border-none border-foreground",
            className
          )}
          {...props}
        >
          {hasCopied ? (
            <CheckIcon className={cn("h-3 w-3", iconClassName)} />
          ) : (
            <ClipboardIcon className={cn("h-3 w-3", iconClassName)} />
          )}
          <span className='sr-only'>Copy</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => copyCommand(commands.__npmCommand__)}>
          npm
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyCommand(commands.__yarnCommand__)}>
          yarn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyCommand(commands.__pnpmCommand__)}>
          pnpm
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyCommand(commands.__bunCommand__)}>
          bun
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
