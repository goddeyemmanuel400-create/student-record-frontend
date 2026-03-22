

function StudentTable ({students, deleteStudent, editStudent}) {
    return(
    <div className="bg-white p-4 rounded-lg shadow-md mt-6 overflow-x-auto">
        <h2 className="text-xl font-bold mb-4">Student Records</h2>
        <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-3 border-b">Name</th>
                    <th className="px-4 py-3 border-b">Math</th>
                    <th className="px-4 py-3 border-b">English</th>
                    <th className="px-4 py-3 border-b">Science</th>
                    <th className="px-4 py-3 border-b">total</th>
                    <th className="px-4 py-3 border-b">Average</th>
                    <th className="px-4 py-3 border-b">Grade</th>
                    <th className="px-4 py-3 border-b">GPA</th>
                    <th className="px-4 py-3 border-b">Actions</th>
                </tr>
            </thead>
            <tbody>
                {students.map((currentStudent) => {
                    const m = Number(currentStudent.math) || 0;
                    const e = Number(currentStudent.english) || 0;
                    const s = Number(currentStudent.science) || 0;

                    const total = m + e + s;
                    const average = (total / 3).toFixed(1);
                    let grade = ""
                    let gpa = 0
                    if (average >= 70) {
                        grade = "A"
                        gpa = 4.0
                    } else if (average >= 60) {
                        grade = "B"
                        gpa = 3.0
                    } else if (average >= 50) {
                        grade = "C"
                        gpa = 2.0
                    } else if (average >= 40) {
                        grade = "D"
                        gpa = 1.0
                    } else {
                        grade = "F"
                        gpa = 0.0
                    }
                    return (
                        <tr key={currentStudent._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 border-b">{currentStudent.name}</td>
                            <td className="px-4 py-3 border-b">{m}</td>
                            <td className="px-4 py-3 border-b">{e}</td>
                            <td className="px-4 py-3 border-b">{s}</td>
                            <td className="px-4 py-3 border-b font-medium">{total}</td>
                            <td className="px-4 py-3 border-b">{average}</td>
                            <td className="px-4 py-3 border-b">
                            <span className={`px-2 py-1 rounded text-sm font-bold ${grade === "F" ? 
                                "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                                {grade}
                            </span>
                            </td>
                            <td className="px-4 py-3 border-b">{gpa.toFixed(1)}</td>
                            <td className="px-4 py-3 border-b">
                                <button onClick={() => editStudent(currentStudent._id)} 
                                className="text-blue-600 hover:text-blue-800 mr-3 font-medium">
                                    Edit
                                </button>
                                <button onClick={() => deleteStudent(currentStudent._id)} className="
                                text-red-600 hover:text-red-800 font-medium">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    )
}

export default StudentTable;