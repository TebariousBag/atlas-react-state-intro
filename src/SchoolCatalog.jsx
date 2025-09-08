import { useEffect, useState } from "react";

export default function SchoolCatalog() {
  // courses will hold the data, setCourses will be used to update after API call
  const [courses, setCourses] = useState([]);
  // variable for state of search bar filter
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("/api/courses.json")
      .then((response) => response.json())
      .then((data) => setCourses(data));
    // use [] as second arg tells it to run after component renders
  }, []);

  // filter courses from json, case insensitive
  // filtering by courseName or courseNumber
  const filteredCourses = courses.filter((course) => {
    const searchTerm = filter.toLowerCase();
    const courseNumber = course.courseNumber.toLowerCase();
    const courseName = course.courseName.toLowerCase();

    return courseNumber.includes(searchTerm) || courseName.includes(searchTerm);
  });

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input
        type="text"
        placeholder="Search"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Trimester</th>
            <th>Course Number</th>
            <th>Courses Name</th>
            <th>Semester Credits</th>
            <th>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((course) => (
            <tr key={course}>
              <td>{course.trimester}</td>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>{course.semesterCredits}</td>
              <td>{course.totalClockHours}</td>
              <td>
                <button>Enroll</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}
