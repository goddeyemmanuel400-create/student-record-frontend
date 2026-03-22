import  {  useState, useEffect } from "react"
import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import StudentsPage from "./components/StudentsPage"
import Login from "./components/Login"

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") ==="true";
  });

  const [students, setStudents] = useState ([]);

   const [page, setPage] = useState("dashboard")
   
  const [search, setSearch] = useState("")
  const [sortType, setSortType] = useState("name")
  
const [currentPage, setCurrentPage] = useState(1);
const studentsPerPage = 5;

 const addStudent = async (student) => {
  try {
    const res = await fetch("https://student-record-backend-v8u1.onrender.com/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(student)
    });
    if (res.ok ){
    const data = await res.json();
    setStudents(prev => [...prev, data]);
    }
  } catch (err) {
    console.error("Error adding student:", err);
  }
  }
  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm("Delete this student?");
    if (!confirmDelete) return;
    try {
      const res =
      await fetch(`https://student-record-backend-v8u1.onrender.com/api/students/${id}`, {
        method: "DELETE"
      });
      if (res.ok){
      setStudents(prev => prev.filter(s => s._id !== id));
      }
    } catch (err) {
      console.error("Error deleting student:", err);
    };
{
    const updatedStudents = students.filter((_, i) => i !== index)
    setStudents(updatedStudents);
    setEditIndex(null);
}
  }
  const editStudent = (id) => {
    const studentToEdit = students.find((s) => s._id === id);
    setPage("students")
    setSearch(studentToEdit.name)
    setEditIndex(id);
  }
  const [editIndex, setEditIndex] = useState(null);

  const updateStudent = async (updatedStudent) => {
      try {
        const res = await fetch (`https://student-record-backend-v8u1.onrender.com/api/students/${updatedStudent._id}`,
          {
          method: "PUT",
          headers: { "Content-Type":
            "application/json",},
            body: JSON.stringify(updatedStudent),
          
        });
        if (res.ok) {
          const data = await res.json();
          setStudents((prev) => prev.map((s) => (s._id === data._id ? data: s)));
          setEditIndex(null); 
        } 
      }catch (err) {
          console.error ("Error updating student:", err);
        }
      };
  
    const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("https://student-record-backend-v8u1.onrender.com/api/students");
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };
    fetchStudents();
  }, []);

  const filterstudents = students.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()));

    const sortedStudents = [...filterstudents].sort((a, b) => {
      if (sortType === "name") {
        return a.name.localeCompare(b.name)
      }
      if (sortType === "average") {
        return (b.gpa || 0) - (a.gpa || 0);
      }
      return 0;
    });
    
const indexOfLastStudent = currentPage * studentsPerPage;
const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
const currentStudents = sortedStudents.slice(indexOfFirstStudent, indexOfLastStudent)
const totalPages = Math.ceil(students.length / studentsPerPage);

  const chartData = {
    labels: students.map(s => s.name), 
    datasets: [
    {
        label: " Student GPA",
        data: students.map(s => Number(s.gpa) || 0),
        backgroundColor: "#3b82f6",
        borderRadius: 6,      
  }
    ]
  };
  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />
  }
  return (
    <div className={darkMode ? "dark" : ""}>
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar page={page} setPage={setPage} />
      <div className="flex-1 p-6">
        <div className="flex justify-between mb-4">
        <button onClick={() => setDarkMode(!darkMode)}
         className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <button onClick={() => {localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
        }} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
      
        {page === "dashboard" && <Dashboard students={students}
         chartData={chartData} 
         />}
        {page === "students" && (<StudentsPage
            students={students}
            addStudent={addStudent}
            sortedStudents={currentStudents}
            search={search}
            setSearch={setSearch}
            setSortType={setSortType}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            updateStudent={updateStudent}
            deleteStudent={deleteStudent}
            editStudent={editStudent}
            editIndex={editIndex}
           
        />)}
        {page === "analytics" && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Analytics</h1>
            <p className="text-gray-600 dark:text-gray-300">Analytic content goes here.</p>
          </div>
        )}
        {page === "settings" && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your application settings here.</p>
          </div>
        )}
      </div>
    </div>
  </div>

  )
}
      
export default App;