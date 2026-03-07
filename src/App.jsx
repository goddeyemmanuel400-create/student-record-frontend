import  { useEffect, useState } from "react"
import StudentForm from "./components/StudentForm"
import StudentTable from "./components/StudentTable"
import Stats from "./components/Stats"
function App() {

  const [students, setStudents] = useState (() => {
    const savedStudents = localStorage.getItem("students")
    return savedStudents ? JSON.parse(savedStudents) : []
  })
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students))
  }, [students])

  const [search, setSearch] = useState("")
  const [sortType, setSortType] = useState("")

  const [editIndex, setEditIndex] = useState(null)

  const addStudent = (student) => {
    setStudents([...students, student])
  }
  const deleteStudent = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index)
    setStudents(updatedStudents)
  }
  
  const editStudent = (index) => {
    setEditIndex(index)
  }
  const updateStudent = (updatedStudent) => {
    const updatedStudents = [...students]
    updatedStudents[editIndex] = updatedStudent
    setStudents(updatedStudents)
    setEditIndex(null)
  }
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  )
  let sortedStudents = [...filteredStudents]
  if (sortType === "name") {
    sortedStudents.sort((a, b) => a.name.localeCompare(b.name))
  }
  if (sortType === "average") {
    sortedStudents.sort((a, b) => {
      const averageA = (a.math + a.english + a.science) / 3
      const averageB = (b.math + b.english + b.science) / 3
      return averageB - averageA
    }                               )
  }
  
  return (
    <div>
      <h1>Student Record System</h1>
      <p>Total Students: {students.length}</p>
      <StudentForm addStudent={addStudent} updateStudent={updateStudent}
       editIndex={editIndex} students={students}/>
       <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => setSortType("name")}>Sort by Name</button>
      <button onClick={() => setSortType("average")}>Sort by Average</button>
      <StudentTable students={sortedStudents} deleteStudent={deleteStudent}
      editStudent={editStudent}/>
      <Stats students={students}/>
      {/* Add your components and logic here */}
    </div>
  );
}
export default App;