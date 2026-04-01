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
         className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow mb-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-900 dark:text-white"> {editIndex !== null ?
             "Edit Student" : "Add Student"}</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input
                type="text"
                placeholder="Enter student name"
                className="w-full border border-gray-300 dark:border-gray-600 p-3 sm:p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Math Score</label>
                <input
                type="number"
                placeholder="0-100"
                className="w-full border border-gray-300 dark:border-gray-600 p-3 sm:p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={math}
                min="0"
                max="100"
                onChange={(e) => setMath (e.target.value)}
                />
            </div>
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">English Score</label>
                <input
                type="number"
                placeholder="0-100"
                className="w-full border border-gray-300 dark:border-gray-600 p-3 sm:p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={english}
                min="0"
                max="100"
                onChange={(e) => setEnglish(e.target.value)}
                />
            </div>
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Science Score</label>
                <input
                type="number"
                placeholder="0-100"
                className="w-full border border-gray-300 dark:border-gray-600 p-3 sm:p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={science}
                min="0"
                max="100"
                onChange={(e) => setScience(e.target.value)}
                />
            </div>
            </div>
            <div className="mt-6 flex justify-end">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-6 py-3 sm:px-6 sm:py-2 rounded-lg font-medium transition-colors text-sm sm:text-base min-h-[44px]">
                    {editIndex !== null ? "Update Student" : "Add Student"}
                </button>
            </div>
        </form>
    )
 }
 export default StudentForm