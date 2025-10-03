import { getTranslations } from "next-intl/server";
import LessonsTable from "@/components/LessonsTable/LessonsTable";

export default async function LessonsPage() {
  const t = await getTranslations();

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10 d-flex flex-column gap-4">
          <header>
            <h1 className="h3 mb-2">{t("main.lessons")}</h1>
            <p className="text-muted mb-0">{t("main.keepTrack")}</p>
          </header>
          <LessonsTable />
        </div>
      </div>
    </div>
  );
}
