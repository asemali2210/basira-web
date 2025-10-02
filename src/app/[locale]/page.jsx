import { getTranslations } from "next-intl/server";
import Button from "@/components/ui/Button/Button";

export default async function Home() {
  const t = await getTranslations("home");

  return (
    <div>
      <Button href="/auth/sign-in">{t("title")}</Button>
    </div>
  );
}