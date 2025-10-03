export type NotificationType = "info" | "success" | "warning";

export interface OverviewNotification {
  id: number;
  text: string;
  icon: string;
  type: NotificationType;
}

export interface OverviewResponse {
  overviewText: string;
  notifications: OverviewNotification[];
}

export interface StatsResponse {
  inProgress: number;
  completed: number;
  categoriesCompleted: number;
  achievements: number;
}

export interface CategoryItem {
  id: number;
  title: string;
  iconUrl?: string;
}

export type LessonStatus = "active" | "completed";

export interface LessonItem {
  id: number;
  name: string;
  date: string;
  duration: string;
  category: string;
  instructor: string;
  child: string;
  status: LessonStatus;
}

export interface LessonsParams {
  status?: LessonStatus;
}

const statsDemo: StatsResponse = {
  inProgress: 3,
  completed: 12,
  categoriesCompleted: 5,
  achievements: 2,
};

const categoriesDemo: CategoryItem[] = [
  { id: 1, title: "Math Basics", iconUrl: "/icons/math.svg" },
  { id: 2, title: "Science Lab", iconUrl: "/icons/science.svg" },
  { id: 3, title: "Reading", iconUrl: "/icons/reading.svg" },
  { id: 4, title: "Art Studio", iconUrl: "/icons/art.svg" },
];

const lessonsDemo: LessonItem[] = [
  {
    id: 1,
    name: "Fractions 101",
    date: "2025-10-01",
    duration: "00:30",
    category: "Math",
    instructor: "Mr. Ali",
    child: "Youssef",
    status: "active",
  },
  {
    id: 2,
    name: "Solar System",
    date: "2025-09-27",
    duration: "00:45",
    category: "Science",
    instructor: "Ms. Sarah",
    child: "Maya",
    status: "completed",
  },
];

export async function getOverview(): Promise<OverviewResponse> {
  return {
    overviewText: "Keep track of your learning journey.",
    notifications: [
      { id: 1, text: "New lesson assigned", icon: "bell", type: "info" },
      { id: 2, text: "Achievement unlocked", icon: "trophy", type: "success" },
      { id: 3, text: "Reminder: Finish homework", icon: "journal", type: "warning" },
    ],
  };
}

export async function getStats(): Promise<StatsResponse> {
  return statsDemo;
}

export async function getCategories(): Promise<CategoryItem[]> {
  return categoriesDemo;
}

export async function getLessons(params?: LessonsParams): Promise<LessonItem[]> {
  if (!params?.status) {
    return lessonsDemo;
  }

  return lessonsDemo.filter((lesson) => lesson.status === params.status);
}
