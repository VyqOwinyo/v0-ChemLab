"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface LanguageSwitcherProps {
  language: string
  setLanguage: (language: string) => void
}

const languages = [
  { value: "English", label: "English" },
  { value: "Spanish", label: "Español" },
  { value: "French", label: "Français" },
  { value: "German", label: "Deutsch" },
  { value: "Chinese", label: "中文" },
  { value: "Japanese", label: "日本語" },
]

export function LanguageSwitcher({ language, setLanguage }: LanguageSwitcherProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[120px] justify-between">
          {language}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[120px]">
        {languages.map((languageOption) => (
          <DropdownMenuItem
            key={languageOption.value}
            onClick={() => setLanguage(languageOption.value)}
            className={cn("flex items-center justify-between", language === languageOption.value && "font-medium")}
          >
            {languageOption.label}
            {language === languageOption.value && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
