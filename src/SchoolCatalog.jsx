import { useEffect, useState } from "react";

export default function SchoolCatalog() {
  // courses will hold the data, setCourses will be used to update after API call
  const [courses, setCourses] = useState([]);
  // variable for state of search bar filter
  const [filter, setFilter] = useState("");
  // state for sorting
  const [sortConfig, setSortConfig] = useState({
    column: "",
    direction: "asc",
  });
  // state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // handling fof pagination
  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    const totalPages = Math.ceil(processedCourses.length / itemsPerPage);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // reset pagination when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  // sorting in ascending and desceending order
  const handleSort = (column) => {
    setSortConfig((prev) => ({
      column,
      direction:
        prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Filter and sort courses
  const processedCourses = courses
    .filter((course) => {
      const searchTerm = filter.toLowerCase();
      return (
        course.courseNumber.toLowerCase().includes(searchTerm) ||
        course.courseName.toLowerCase().includes(searchTerm)
      );
    })
    .sort((a, b) => {
      if (!sortConfig.column) return 0;

      const aValue = a[sortConfig.column].toString().toLowerCase();
      const bValue = b[sortConfig.column].toString().toLowerCase();

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

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
  // pagination to switch between pages
  const totalPages = Math.ceil(processedCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCourses = processedCourses.slice(startIndex, endIndex);

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
            <th
              onClick={() => handleSort("trimester")}
              style={{ cursor: "pointer" }}
            >
              Trimester{" "}
              {sortConfig.column === "trimester" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th
              onClick={() => handleSort("courseNumber")}
              style={{ cursor: "pointer" }}
            >
              Course Number{" "}
              {sortConfig.column === "courseNumber" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th
              onClick={() => handleSort("courseName")}
              style={{ cursor: "pointer" }}
            >
              Courses Name{" "}
              {sortConfig.column === "courseName" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th
              onClick={() => handleSort("semesterCredits")}
              style={{ cursor: "pointer" }}
            >
              Semester Credits{" "}
              {sortConfig.column === "semesterCredits" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th
              onClick={() => handleSort("totalClockHours")}
              style={{ cursor: "pointer" }}
            >
              Total Clock Hours{" "}
              {sortConfig.column === "totalClockHours" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCourses.map((course) => (
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
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}
