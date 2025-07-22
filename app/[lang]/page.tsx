import { getDictionary } from "./dictionaries"
import Translator from "@/components/translator"
import { translateText } from "@/actions/translate"

type Lang = "en" | "de" | "es" | "fr"

export default async function Page({ params }: { params: { lang: Lang } }) {
  const lang = params.lang
  const dictionary = await getDictionary(lang)

  // Server Action wrapped for form usage
  async function action(
    _prevState: any,
    formData: FormData,
  ): Promise<{ translatedText: string; error: string | null }> {
    "use server"
    const text = (formData.get("text") as string) || ""
    const result = await translateText(text, lang)
    if (result.error) {
      return { translatedText: "", error: result.error }
    }
    return { translatedText: result.translatedText, error: null }
  }

  return <Translator lang={lang} dictionary={dictionary} action={action} />
}
