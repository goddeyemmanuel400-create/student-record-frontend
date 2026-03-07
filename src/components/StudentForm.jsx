 import { useState } from "react";
 function StudentForm({ addStudent, updateStudent, editIndex }) {
    const [name, setName] = useState ("")
    const [math, setMath] = useState ("")
    const [english, setEnglish] = useState ("")
    const [science, setScience] = useState ("")

    function handleSubmit (e) {
        e.preventDefault()

        if (!name || !math || !english || !science) {
            alert("Please fill all fields")
            return
        }
        const student = {
            name, 
            math: Number(math),
            english:Number(english),
            science: Number(science),
        }
        if (editIndex !== null) {
            updateStudent(student)
            
        } else {
            addStudent(student)
        }
        setName ("")
        setMath("")
        setEnglish("")
        setScience("")

    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Student</h2>
            <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <input
            type="number"
            placeholder="Math"
            value={math}
            onChange={(e) => setMath (e.target.value)}
            />
            <input
            type="number"
            placeholder="English"
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
            />
            <input
            type="number"
            placeholder="Science"
            value={science}
            onChange={(e) => setScience(e.target.value)}
            />
            <button type="submit">Add Student</button>
        </form>
    )
 }
 export default StudentForm