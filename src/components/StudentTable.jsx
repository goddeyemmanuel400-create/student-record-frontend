

function StudentTable ({students, deleteStudent, editStudent}) {
    return(
    <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-md mt-6 overflow-x-auto">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-900 dark:text-white">Student Records</h2>
        <div className="block sm:hidden space-y-3">
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
                    <div key={currentStudent._id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-base">{currentStudent.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${grade === "F" ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300" : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"}`}>
                                        Grade {grade}
                                    </span>
                                    <span className="text-xs text-gray-600 dark:text-gray-400">GPA: {gpa.toFixed(1)}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => editStudent(currentStudent._id)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors min-h-[36px]">
                                    Edit
                                </button>
                                <button onClick={() => deleteStudent(currentStudent._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors min-h-[36px]">
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="bg-white dark:bg-gray-600 p-2 rounded">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Math:</span>
                                <span className="ml-1 text-gray-900 dark:text-white">{m}</span>
                            </div>
                            <div className="bg-white dark:bg-gray-600 p-2 rounded">
                                <span className="font-medium text-gray-700 dark:text-gray-300">English:</span>
                                <span className="ml-1 text-gray-900 dark:text-white">{e}</span>
                            </div>
                            <div className="bg-white dark:bg-gray-600 p-2 rounded">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Science:</span>
                                <span className="ml-1 text-gray-900 dark:text-white">{s}</span>
                            </div>
                            <div className="bg-white dark:bg-gray-600 p-2 rounded">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Total:</span>
                                <span className="ml-1 text-gray-900 dark:text-white font-semibold">{total}</span>
                            </div>
                            <div className="bg-white dark:bg-gray-600 p-2 rounded col-span-2">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Average:</span>
                                <span className="ml-1 text-gray-900 dark:text-white font-semibold">{average}%</span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full w-full text-left border-collapse text-sm sm:text-base">
            <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                    <th className="px-2 sm:px-4 py-3 border-b border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">Name</th>
                    <th className="px-2 sm:px-4 py-3 border-b border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">Math</th>
                    <th className="px-2 sm:px-4 py-3 border-b border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">English</th>
                    <th className="px-2 sm:px-4 py-3 border-b border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">Science</th>
                    <th className="px-2 sm:px-4 py-3 border-b border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">Total</th>
                    <th className="px-2 sm:px-4 py-3 border-b border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">Average</th>
                    <th className="px-2 sm:px-4 py-3 border-b border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">Grade</th>
                    <th className="px-2 sm:px-4 py-3 border-b border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">GPA</th>
                    <th className="px-2 sm:px-4 py-3 border-b border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">Actions</th>
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
                        <tr key={currentStudent._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-200 dark:border-gray-600">
                            <td className="px-4 py-3 text-gray-900 dark:text-white">{currentStudent.name}</td>
                            <td className="px-4 py-3 text-gray-900 dark:text-white">{m}</td>
                            <td className="px-4 py-3 text-gray-900 dark:text-white">{e}</td>
                            <td className="px-4 py-3 text-gray-900 dark:text-white">{s}</td>
                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{total}</td>
                            <td className="px-4 py-3 text-gray-900 dark:text-white">{average}</td>
                            <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-sm font-bold ${grade === "F" ? 
                                "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300" : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"}`}>
                                {grade}
                            </span>
                            </td>
                            <td className="px-2 sm:px-4 py-3 text-gray-900 dark:text-white">{gpa.toFixed(1)}</td>
                            <td className="px-2 sm:px-4 py-3">
                                <button onClick={() => editStudent(currentStudent._id)} 
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3 font-medium">
                                    Edit
                                </button>
                                <button onClick={() => deleteStudent(currentStudent._id)} className="
                                text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </div>
    </div>
    )
}

export default StudentTable;