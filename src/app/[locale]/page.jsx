import Overview from "@/components/Main/Overview/Overview";
import StatsSection from "@/components/Main/Stats/StatsSection";
import CategoriesGrid from "@/components/Main/Lessons/CategoriesGrid";

export default function HomePage() {
  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10 d-flex flex-column gap-4">
          <Overview />
          <StatsSection />
          <CategoriesGrid />
        </div>
      </div>
    </div>
  );
}
