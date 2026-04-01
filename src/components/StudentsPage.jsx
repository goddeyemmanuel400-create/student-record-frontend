import StudentForm from "./StudentForm";    
import StudentTable from "./StudentTable";
import Stats from "./Stats";
import * as XLSX from "xlsx";
import {saveAs} from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function StudentsPage({
    students, 
    sortedStudents,
    addStudent,
    updateStudent,
    editIndex,
    search,
    setSearch,
    setSortType,
    deleteStudent,
    editStudent,
    currentPage,
    setCurrentPage,
    totalPages
}) {
 
        
        const exportToExcel = () => {
            const worksheet = XLSX.utils.json_to_sheet(students);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
            const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
            const data = new Blob([excelBuffer], { type: 
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            saveAs(data, "students.xlsx");
        };
        const downloadPDF = () => {
            const  doc = new jsPDF();
            doc.setFontSize(18);
            doc.text("Student Result Report", 14, 22);
            doc.setFontSize(11);
            doc.setTextColor(100);
            doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
            const tableColumn = ["Name", "Math", "English", "Science", "Total", "Average", "Grade"];
            const tableRows = students.map(student => {
                const total = Number(student.math) + Number(student.english) + Number(student.science);
                const average = (total /3).toFixed(1); 
                let grade = "F";
                if (average >= 70) grade = "A";
                else if (average >= 60) grade = "B";
                else if (average >= 50) grade = "C";
                else if (average >= 40) grade = "D";

                return[
                student.name,
                student.math,
                student.english,
                student.science,
                total,
                average,
                grade
            ]
        });
            autoTable(doc,{
                head: [tableColumn],
                body: tableRows,
                startY: 35,
                them:'grid',
                headStyles: { fillColor: [37, 99, 235] }
            });
            doc.save("Student_Results.pdf");
        };

    
         

            return (
                <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                    <h1 className="text-xl sm:text-2xl font-bold">Student Management</h1>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button onClick={exportToExcel}
                        className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-green-700 transition text-sm sm:text-base">
                        Export to Excel
                      </button>
                      <button 
                        onClick={downloadPDF}
                        className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition text-sm sm:text-base">
                        Download Results PDF
                      </button>
                    </div>
                </div>
                <StudentForm 
                    addStudent={addStudent} 
                    updateStudent={updateStudent} 
                    editIndex={editIndex}
                    students={students}
                />
                <div className="flex flex-col gap-4 mb-6 bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search Students</label>
                <input
                type="text"
                    placeholder="Type student name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 p-3 sm:p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base"
                />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 dark:text-gray-300 font-medium text-sm sm:text-base whitespace-nowrap">Sort By:</span>
                        <div className="flex gap-2">
                        <button onClick={() => setSortType("name")}
                        className="px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors text-sm font-semibold text-gray-900 dark:text-white min-h-[40px]">
                            Name
                        </button>
                        <button onClick={() => setSortType("average")} className="px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors text-sm font-semibold text-gray-900 dark:text-white min-h-[40px]">
                            Average
                        </button>
                        </div>
                    </div>
                </div>
                 </div>
                 <div className="overflow-x-auto">
                   <StudentTable 
                    students={sortedStudents} 
                    deleteStudent={deleteStudent} 
                    editStudent={editStudent}
                />
                </div>
                <Stats students={students} />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-700 dark:text-gray-300 text-center sm:text-left">
                        Showing Page <span className="font-bold">{currentPage}</span> of <span className="font-bold">{totalPages || 1}</span>
                    </p>
                    <div className="flex justify-center sm:justify-end gap-2">
                        <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className={`px-4 py-2 rounded-md border text-sm sm:text-base min-h-[40px] transition-colors ${
                            currentPage === 1
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900 border-gray-300 dark:border-gray-600'
                        }`}>
                            Previous
                        </button>
                        <button
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className={`px-4 py-2 rounded-md border text-sm sm:text-base min-h-[40px] transition-colors ${
                            currentPage === totalPages || totalPages === 0
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900 border-gray-300 dark:border-gray-600'
                        }`}>
                            Next
                        </button>
                    </div>
                </div>
                </>
            );
        }

export default StudentsPage