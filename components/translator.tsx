"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import LanguageSwitcher from "@/components/language-switcher"

interface TranslatorProps {
  lang: "en" | "de" | "es" | "fr"
  dictionary: any
  action: (prev: any, formData: FormData) => Promise<any>
}

export default function Translator({ lang, dictionary, action }: TranslatorProps) {
  const [state, formAction, isPending] = useActionState(action, {
    translatedText: "",
    error: null,
  })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{dictionary.common.title}</CardTitle>
          <LanguageSwitcher currentLang={lang} dictionary={dictionary} />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{dictionary.common.welcome}</h2>
            <p className="text-muted-foreground">{dictionary.common.description}</p>
          </div>

          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="text" className="font-medium">
                {dictionary.common.original_text_label}
              </label>
              <Textarea
                id="text"
                name="text"
                defaultValue="Hello, world! This is a test sentence for DeepL translation."
                rows={5}
                className="w-full"
              />
            </div>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Translating..." : dictionary.common.translate_button}
            </Button>
          </form>

          {state.error && (
            <div className="text-red-500 text-sm" role="alert">
              Error: {state.error}
            </div>
          )}

          <div className="space-y-2">
            <label className="font-medium">{dictionary.common.translated_text_label}</label>
            <Textarea
              readOnly
              value={state.translatedText}
              rows={5}
              className="w-full bg-gray-100"
              placeholder="Translated text will appear here..."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
