 import { useState, useEffect } from "react";
 function StudentForm({ addStudent, updateStudent, editIndex, students }) {
    const [name, setName] = useState ("")
    const [math, setMath] = useState ("")
    const [english, setEnglish] = useState ("")
    const [science, setScience] = useState ("")
    
        useEffect(() => {
            if (editIndex !== null) {
                const s = students.find((stu) => stu._id ===editIndex);
                if (s) {
                setName(s.name);
                setMath(s.math);
                setEnglish(s.english);
                setScience(s.science);
                }
            } else {
                setName("");
                setMath("");
                setEnglish("");
                setScience("");
            }
        }, [editIndex, students]);

    function handleSubmit (e) {
        e.preventDefault();

        if (!name || !math || !english || !science) {
            alert("Please fill all fields")
            return
        }
        const avg = (Number(math) + Number(english) + Number(science)) / 3;
        let calculatedGPA = 0;
        if (avg >= 90) {
            calculatedGPA = 4.0;
        } else if (avg >= 80) {
            calculatedGPA = 3.0;
        } else if (avg >= 70) {
            calculatedGPA = 2.0;
        } else if (avg >= 60) {
            calculatedGPA = 1.0;
        } else {
            calculatedGPA = 0.0;
        }
      

        const student = {
            name, 
            math: Number(math),
            english:Number(english),
            science: Number(science),
            gpa: calculatedGPA,
            _id: editIndex !== null ? editIndex : undefined,
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
        <form onSubmit={handleSubmit}
         className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-bold mb-4"> {editIndex !== null ?
             "Edit Student" : "Add Student"}</h2>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <input
            type="number"
            placeholder="Math"
            className="border p-2 rounded"
            value={math}
            min="0"
            max="100"
            onChange={(e) => setMath (e.target.value)}
            />
            <input
            type="number"
            placeholder="English"
            className="border p-2 rounded"
            value={english}
            min="0"
            max="100"
            onChange={(e) => setEnglish(e.target.value)}
            />
            <input
            type="number"
            placeholder="Science"
            className="border p-2 rounded"
            value={science}
            min="0"
            max="100"
            onChange={(e) => setScience(e.target.value)}
            />
            </div>
            <button type="submit" className=" mt-4 bg-blue-600
             text-white px-6 py-2 rounded hover:bg-blue-700">
                {editIndex !== null ? "Update Student" : "Add Student"}
            </button>
        </form>
    )
 }
 export default StudentForm