"use client"

import { ApiTutorials } from "./api-tutorials"
import { LanguageProvider } from "@/contexts/language-context"

export default function ClientApiTutorials() {
  return (
    <LanguageProvider>
      <ApiTutorials />
    </LanguageProvider>
  )
}
