const loaders = {
  en: () => import("../../messages/en/index.js"),
  ar: () => import("../../messages/ar/index.js"),
};

export async function loadMessages(locale) {
  const loader = loaders[locale];

  if (!loader) {
    throw new Error(`Unsupported locale: ${locale}`);
  }

  const { default: messages } = await loader();

  return messages;
}
