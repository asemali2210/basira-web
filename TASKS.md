# TASKS.md

## Project context

- Tech: **Next.js/React**, **Bootstrap + SCSS Modules**, **Redux Toolkit**, **Strapi**, **i18n (AR/EN)**.
- Naming: **BEM** داخل SCSS Modules.
- Pages المطلوبة الآن:
  - **Home/Main** (فيها Sidebar جاهز) + **Overview** + **Stats cards** + **Lessons section** (Categories grid + demo card).
  - **Lessons page** (جدول دروس + ديمو صف واحد على الأقل).
  - Write simple, clear comments in plain English that explain why this code exists and how to use it—not only what it does.

---

## 0) Foundations (once)

- [ ] إنشاء بنية المجلدات الأساسية:
  ```
  src/
    components/
      Main/
        Overview/
          Overview.tsx
          Overview.module.scss
        Stats/
          StatCard.tsx
          StatCard.module.scss
        Lessons/
          CategoriesGrid.tsx
          CategoryCard.tsx
          CategoriesGrid.module.scss
      LessonsTable/
        LessonsTable.tsx
        LessonsTable.module.scss
    pages/
      index.tsx           // Home -> Main
      lessons/index.tsx   // Lessons page
    store/
      index.ts
      slices/
        notificationsSlice.ts
        categoriesSlice.ts
        lessonsSlice.ts
    lib/
      api.ts              // buildStrapiUrl + fetch helpers
      i18n/
        index.ts
        locales/
          en.json
          ar.json
  ```
- [ ] إعداد **Redux store** وربطه بالتطبيق.
- [ ] إضافة Bootstrap وتهيئة SCSS (import bootstrap + variables override إن لزم).
- [ ] تفعيل **i18n** بسيط (context أو next-intl/react-i18next) مع مفتاح لغة `en`/`ar` + دعم RTL.

---

## 1) API & Data Models (Strapi)

- [ ] إعداد دوال API في `lib/api.ts`:
  - `getOverview()`: { overviewText, notifications: [{id,text,icon,type}] }
  - `getStats()`: { inProgress, completed, categoriesCompleted, achievements }
  - `getCategories()`: [{id, title, iconUrl? }]
  - `getLessons(params)`: [{ id, name, date, duration, category, instructor, child, status }]
- [ ] تعريف Content Types المقابلة في Strapi (أو عمل Mock إن الـ CMS لسه مش جاهز).
- [ ] توحيد حقل **status** بقيم: `"active" | "completed"`.

---

## 2) Internationalization (AR/EN)

- [ ] مفاتيح ترجمة في `locales/en.json` و `locales/ar.json`:

```json
// en.json
{
  "main": {
    "overview": "Overview",
    "overviewSub": "Overview and notifications",
    "lessons": "Lessons",
    "lessonsSub": "Choose a category to begin a lesson.",
    "keepTrack": "Keep track of your current and completed lessons."
  },
  "stats": {
    "inProgress": "Lesson(s) in progress",
    "completed": "Lessons completed",
    "categoriesCompleted": "Categories completed",
    "achievements": "Achievements"
  },
  "table": {
    "lessonName": "Lesson name",
    "date": "Date",
    "duration": "Duration",
    "category": "Category",
    "instructor": "Instructor",
    "child": "Child",
    "status": "Status",
    "active": "Active",
    "completed": "Completed"
  },
  "notifications": "Notifications"
}
```

```json
// ar.json
{
  "main": {
    "overview": "نظرة عامة",
    "overviewSub": "ملخّص وإشعارات",
    "lessons": "الدروس",
    "lessonsSub": "اختر تصنيفًا لبدء درس.",
    "keepTrack": "تابع دروسك الحالية والمكتملة."
  },
  "stats": {
    "inProgress": "درس قيد التقدّم",
    "completed": "الدروس المكتملة",
    "categoriesCompleted": "التصنيفات المكتملة",
    "achievements": "الإنجازات"
  },
  "table": {
    "lessonName": "اسم الدرس",
    "date": "التاريخ",
    "duration": "المدّة",
    "category": "التصنيف",
    "instructor": "المدرّس",
    "child": "الطفل",
    "status": "الحالة",
    "active": "نشط",
    "completed": "مكتمل"
  },
  "notifications": "الإشعارات"
}
```

- [ ] دعم **RTL** عند اختيار `ar` (class على `<html dir="rtl" lang="ar">` + قلب التراص flex حيث يلزم).

---

## 3) Main Page – Overview (Top of main)

- [ ] **Overview header**:
  - العنوان: `t('main.overview')`
  - سطر فرعي: `t('main.overviewSub')`
  - أيقونة تنبيهات صغيرة بجوار النص (Bootstrap icon أو SVG).
- [ ] **Notifications list** (اختياري الآن):
  - عرض آخر 3 إشعارات بحد أقصى، كل إشعار فيه icon + نص.
  - الربط مع `notificationsSlice` (state: `{ items, unreadCount }`).

**SCSS/BEM** (`Overview.module.scss`):

```scss
.overview {
  &__header {
    /* flex align between title & icon */
  }
  &__title {
  }
  &__subtitle {
  }
  &__notifications {
    /* list styles */
  }
  &__notification-item {
    /* icon + text */
  }
}
```

---

## 4) Main Page – Stats (4 items under overview)

- [ ] مكوّن `StatCard` قابل لإعادة الاستخدام:
  - Props: `{ value: number; label: string; icon: ReactNode }`
  - تنسيق: أيقونة بالأعلى، الرقم كبير، أسفلهم label.
- [ ] أربعة كروت مرتبة Grid (Bootstrap row/col):
  1. **inProgress**: (number of lesson + lesson icon) | label: `t('stats.inProgress')`
  2. **completed**: (number + check icon) | `t('stats.completed')`
  3. **categoriesCompleted**: (number + categories icon) | `t('stats.categoriesCompleted')`
  4. **achievements**: (number + trophy icon) | `t('stats.achievements')`
- [ ] جلب القيم من `getStats()` مع تخزينها في `lessonsSlice.stats`.

**SCSS/BEM** (`StatCard.module.scss`):

```scss
.stat {
  &__icon {
    /* margin-bottom, size */
  }
  &__value {
    /* big font, fw-bold */
  }
  &__label {
    /* muted text */
  }
}
```

---

## 5) Main Page – Lessons section (Categories)

- [ ] Heading: `t('main.lessons')`
- [ ] Subtext: `t('main.lessonsSub')`
- [ ] Grid: **4 صناديق في الصف على شاشات lg**، تتدرّج إلى 2/md و1/sm.
- [ ] **CategoryCard** (ديمو واحد الآن):
  - يحتوي **title** + **icon/image**.
  - حدود البطاقة **رمادي**، و **الحد السفلي 4px** (Accent).
  - Hover بسيط (رفع خفيف + ظل).
- [ ] **CategoriesGrid** يجلب `getCategories()` ويعرضها (لو فاضي: بطاقة Demo ثابتة).

**SCSS/BEM** (`CategoriesGrid.module.scss`):

```scss
.categories {
  &__grid {
    /* row/cols spacing */
  }
  &__card {
    border: 1px solid var(--bs-gray-300);
    border-bottom-width: 4px;
    border-bottom-color: var(--bs-primary);
    &__title {
    }
    &__icon {
    }
  }
}
```

---

## 6) Lessons Page

- [ ] أعلى الصفحة:
  - Heading: `t('main.lessons')`
  - Subtext: `t('main.keepTrack')`
- [ ] **LessonsTable**:
  - الأعمدة: `Lesson name, Date, Duration, Category, Instructor, Child, Status`
  - حالة `Status` تعرض Badge: **Active** (primary) أو **Completed** (success).
  - صف ديمو واحد على الأقل (Mock)، ثم ربط لاحقًا مع API `getLessons()`.
  - ترتيب وفرز بدائي (اختياري الآن) — على الأقل **Responsive** على الشاشات الصغيرة (table-responsive).

---

## 7) Redux Slices (state shape + actions)

- [ ] `lessonsSlice`:
  ```ts
  {
    stats: { inProgress: 0, completed: 0, categoriesCompleted: 0, achievements: 0 },
    list: [],
    loading: false,
    error: null
  }
  // actions: fetchStats, fetchLessons (pending/fulfilled/rejected)
  ```
- [ ] `categoriesSlice`:
  ```ts
  { items: [], loading: false, error: null }
  // actions: fetchCategories
  ```
- [ ] `notificationsSlice`:
  ```ts
  { items: [], unreadCount: 0 }
  // actions: fetchNotifications, markAllRead
  ```

---

## 8) Icons

- [ ] استخدم Bootstrap Icons أو SVGs بسيطة:
  - lesson: `bi-journal-text`
  - check: `bi-check-circle`
  - categories: `bi-grid` أو `bi-collection`
  - achievements: `bi-trophy`
  - notifications bell: `bi-bell`
- [ ] لفّ الأيقونات داخل عنصر له class `__icon` لسهولة التحكم في الحجم واللون.

---

## 9) Responsiveness & RTL

- [ ] Grid للكروت: `row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3`
- [ ] تحويل الاتجاه عند `ar`: عكس الMargins حيث يلزم (مثلًا `ms-` ↔ `me-`).
- [ ] تأكد من أن الأيقونات والنصوص تصطف بشكل سليم في RTL.

---

## 10) Demo data (للعرض الفوري)

- [ ] **Stats demo**:
  - inProgress: 3
  - completed: 12
  - categoriesCompleted: 5
  - achievements: 2
- [ ] **Category demo**: [{ id: 1, title: "Math Basics", iconUrl: "/icons/math.svg" }]
- [ ] **Lesson demo row**:
  - name: "Fractions 101", date: "2025-10-01", duration: "00:30", category: "Math", instructor: "Mr. Ali", child: "Youssef", status: "active"

---

## 11) SCSS Modules + BEM قواعد سريعة

- كل مكوّن له ملف module خاص.
- أسماء BEM: `.block { &__element { &--modifier {} } }`.
- استخدم متغيرات Bootstrap للألوان (`var(--bs-primary)`) قدر الإمكان.

---

## 12) Accessibility

- [ ] العناوين بتسلسل منطقي (`h1` ثم `h2`…).
- [ ] أيقونات لها `aria-hidden` أو `aria-label` عند الحاجة.
- [ ] جداول ب `<th scope="col">` و `<caption>` اختياري.

---

## 13) Definition of Done (DoD)

- [ ] الـ Home تعرض Overview + Notifications + 4 StatCards صحيحة القيم (Mock أو API).
- [ ] Grid التصنيفات 4 في صف على lg + بطاقة ديمو ظاهرة لو مفيش بيانات.
- [ ] صفحة Lessons بها Heading/Subtext + جدول بالحقول المحددة + Badge للحالة.
- [ ] دعم لغتين (EN/AR) + RTL شغالين (نصوص من JSON).
- [ ] SCSS Modules منظمة + BEM.
- [ ] State يمر عبر Redux slices المذكورة (حتى لو Mock).
- [ ] Responsive يعمل من الموبايل حتى الـ Desktop.
- [ ] تمرّ lint/basic build بدون أخطاء.

---

## 14) Nice-to-have (لاحقًا)

- [ ] فلترة/بحث في جدول الدروس.
- [ ] Pagination بسيطة.
- [ ] Placeholder skeletons أثناء التحميل.
- [ ] ربط حقيقي مع Strapi endpoints.

---

### Prompt جاهز للوكيل (لتنفيذ المهمة)

Implement the tasks in `TASKS.md` for a Next.js app using Bootstrap + SCSS Modules, Redux Toolkit, Strapi, and i18n (EN/AR with RTL).

- Create components and pages per the file structure.
- Use BEM inside SCSS Modules.
- Build Main page with Overview + Notifications, then four StatCards (inProgress, completed, categoriesCompleted, achievements), then Lessons section with a 4-per-row categories grid (lg), and one demo CategoryCard with gray border and 4px bottom border.
- Build Lessons page with heading/subtext and a responsive table with columns [Lesson name, Date, Duration, Category, Instructor, Child, Status] using badges for status.
- Wire minimal Redux slices for lessons, categories, notifications.
- Provide mock data where API is not ready.
- Ensure i18n keys match `locales/en.json` and `locales/ar.json`, and RTL flips correctly.
- Ensure responsive behavior and pass basic build.
