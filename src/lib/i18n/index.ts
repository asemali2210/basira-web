import en from "./locales/en.json";
import ar from "./locales/ar.json";

export const localeMessages = {
  en,
  ar,
} as const;

export type AppLocale = keyof typeof localeMessages;
export type AppMessages = (typeof localeMessages)[AppLocale];

export function getMessages(locale: AppLocale): AppMessages {
  return localeMessages[locale];
}
