"use client";

import styles from "./LessonsTable.module.scss";

const demoLessons = [
  {
    id: 1,
    name: "Lesson",
    date: "2025-10-01",
    duration: "00:30",
    category: "Category",
    instructor: "Instructor",
    child: "Student",
    status: "active"
  }
];

export default function LessonsTable() {
  return (
    <div className={styles.tableWrapper}>
      <table className={`table ${styles.table}`}>
        <thead>
          <tr>
            <th scope="col">Lesson</th>
            <th scope="col">Date</th>
            <th scope="col">Duration</th>
            <th scope="col">Category</th>
            <th scope="col">Instructor</th>
            <th scope="col">Child</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {demoLessons.map((lesson) => (
            <tr key={lesson.id}>
              <td>{lesson.name}</td>
              <td>{lesson.date}</td>
              <td>{lesson.duration}</td>
              <td>{lesson.category}</td>
              <td>{lesson.instructor}</td>
              <td>{lesson.child}</td>
              <td>
                <span className="badge bg-primary text-uppercase">{lesson.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
