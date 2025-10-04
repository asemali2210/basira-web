"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import useAuth from "@/hooks/useAuth/useAuth";
import styles from "./sidebar.module.scss";

const NAV_ITEMS = [
  { labelKey: "items.home", href: "/" },
  { labelKey: "items.lessons", href: "/lessons" },
  { labelKey: "items.schedule", href: "/schedule" },
  { labelKey: "items.inbox", href: "/inbox" },
  { labelKey: "items.shop", href: "/shop" },
  { labelKey: "items.profile", href: "/profile" },
];

const LANGUAGE_LABELS = {
  en: "language.english",
  ar: "language.arabic",
};

function normalizePathname(pathname) {
  if (!pathname) {
    return "/";
  }

  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];
  const hasLocale = routing.locales.includes(maybeLocale);
  const normalized = hasLocale ? `/${segments.slice(1).join("/")}` : pathname;
  const trimmed =
    normalized.endsWith("/") && normalized !== "/"
      ? normalized.slice(0, -1)
      : normalized;

  return trimmed || "/";
}

function isItemActive(currentPath, href) {
  if (href === "/") {
    return currentPath === "/";
  }

  return currentPath === href || currentPath.startsWith(`${href}/`);
}

function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const tSidebar = useTranslations("sidebar");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  const currentPath = normalizePathname(pathname);
  const languageOptions = routing.locales.map((code) => ({
    code,
    label: tCommon(LANGUAGE_LABELS[code] ?? LANGUAGE_LABELS.en),
  }));

  const handleLogout = () => {
    logout();
    router.push("/auth/sign-in");
  };

  return (
    <nav className={styles.siteSidebar}>
      <div className={styles.logoRow}>
        <Image
          src="/assest/logo.png"
          alt={tSidebar("logoAlt")}
          width={120}
          height={40}
          priority
        />
      </div>

      <ul className={styles.navList}>
        {NAV_ITEMS.map((item) => {
          const active = isItemActive(currentPath, item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${styles.navLink} ${
                  active ? styles.navLinkActive : ""
                }`}
              >
                {tSidebar(item.labelKey)}
              </Link>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            className={`${styles.navLink} ${styles.navLinkLogout}`}
            onClick={handleLogout}
          >
            {tSidebar("logout")}
          </button>
        </li>
      </ul>

      <div
        className={styles.languageSwitcher}
        role="group"
        aria-label={tCommon("languageSwitcherLabel")}
      >
        {languageOptions.map(({ code, label }) => (
          <Link
            key={code}
            href={currentPath}
            locale={code}
            className={`${styles.languageOption} ${
              locale === code ? styles.languageOptionActive : ""
            }`}
            aria-current={locale === code ? "true" : undefined}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.promoCard}>
          <p className={styles.promoHeading}>{tSidebar("promo.heading")}</p>
          <p className={styles.promoHighlight}>{tSidebar("promo.highlight")}</p>
          <p className={styles.promoDescription}>
            {tSidebar("promo.description")}
          </p>
          <button type="button" className={styles.promoButton}>
            {tSidebar("promo.cta")}
          </button>
        </div>

        <div className={styles.illustration}>
          <Image
            src="/assest/sidebar-image.svg"
            alt={tSidebar("promoImageAlt")}
            width={180}
            height={140}
          />
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
