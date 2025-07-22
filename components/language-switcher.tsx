"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

interface LanguageSwitcherProps {
  currentLang: string
  dictionary: {
    languages: {
      en: string
      de: string
      es: string
      fr: string
    }
  }
}

export default function LanguageSwitcher({ currentLang, dictionary }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()

  const changeLanguage = (newLang: string) => {
    const newPath = `/${newLang}${pathname.substring(3)}` // Replace /en/ with /de/, etc.
    router.push(newPath)
  }

  const languageNames: { [key: string]: string } = dictionary.languages

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">{dictionary.common.language_switcher_label}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            {languageNames[currentLang]}
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {Object.keys(languageNames).map((lang) => (
            <DropdownMenuItem key={lang} onClick={() => changeLanguage(lang)}>
              {languageNames[lang]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
