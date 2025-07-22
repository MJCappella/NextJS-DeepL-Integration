"use server"

import { DEEPL_API_KEY, DEEPL_API_URL } from "@/lib/env" // Import environment variables

export async function translateText(text: string, targetLang: string) {
  if (!text || !targetLang) {
    return { error: "Missing text or target language" }
  }

  const deepLKey = DEEPL_API_KEY
  const deepLEndpoint = DEEPL_API_URL || "https://api-free.deepl.com/v2/translate"

  if (!deepLKey) {
    return { error: "DeepL API key not configured" }
  }

  try {
    const response = await fetch(deepLEndpoint, {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${deepLKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: [text],
        target_lang: targetLang.toUpperCase(), // DeepL expects uppercase language codes
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("DeepL API error:", errorData)
      return { error: `DeepL API error: ${errorData.message || response.statusText}` }
    }

    const data = await response.json()
    const translatedText = data.translations[0].text

    return { translatedText }
  } catch (error) {
    console.error("Error translating text:", error)
    return { error: "Failed to translate text" }
  }
}
