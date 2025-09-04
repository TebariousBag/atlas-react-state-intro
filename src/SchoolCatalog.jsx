import { useEffect, useState } from "react";

export default function SchoolCatalog() {
  // courses will hold the data, setCourses will be used to update after API call
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("/api/courses.json")
      .then((response) => response.json())
      .then((data) => setCourses(data));
    // use [] as second arg tells it to run after component renders
  }, []);

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input type="text" placeholder="Search" />
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
          {courses.map((course) => (
            <tr key={course}>
              <td key={course.trimester}>{course.trimester}</td>
              <td key={course.courseNumber}>{course.courseNumber}</td>
              <td>Beginning Procedural Programming</td>
              <td>2</td>
              <td>30</td>
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
