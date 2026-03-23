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
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Student Management</h1>
                    <button onClick={exportToExcel}
                    className="bg-green-600 text-white px-4 py-2 
                    rounded hover:bg-green-700 transition">
                        Export to Excel
                    </button>
                    <button 
                    onClick={downloadPDF}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700
                    transition flex items-center gap-2 mb-4">
                        <span></span>Download Results PDF
                    </button>
                </div>
                <StudentForm 
                    addStudent={addStudent} 
                    updateStudent={updateStudent} 
                    editIndex={editIndex}
                    students={students}
                />
                <div className="flex flex-col md:flex-row md:items-center justify-between 
                gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex-1">

                <input
                type="text"
                    placeholder="Search students..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-gray-600 font-medium whitespace-nowrap">Sort By:</span>
               

                <button onClick={() => setSortType("name")}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 
                 rounded-md transition-colors text-sm font-semibold">
                    
                     Name</button>
                <button onClick={() => setSortType("average")} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 
                 rounded-md transition-colors text-sm font-semibold">
                     Average
                </button>
                </div>
                 </div>

                <StudentTable 
                    students={sortedStudents} 
                    deleteStudent={deleteStudent} 
                    editStudent={editStudent}
                />
                <Stats students={students} />
                <div className="flex items-center justify-between mt-6 bg-white p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-700">
                        Showing Page <span className="font-bold">{currentPage}
                            </span> of <span className="font-bold">{totalPages || 1}</span>
                    </p>
                    <div className="space-x-2">

                        <button

                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className= {`px-4 py-2 rounded-md border ${currentPage === 1 ? 
                        'bg-gray-100 text-gray-400' : 'bg-white text-gray-600 hover:bg-blue-50'}`}>
                        
                            Previous
                        </button>

                        <button
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className={`px-4 py-2 rounded-md border ${currentPage === totalPages || totalPages === 0 ? 
                        'bg-gray-100 text-gray-400' : 'bg-white text-gray-600 hover:bg-blue-50' 
                        }`}>
                            Next
                        </button>
                    </div>
                </div>
                </>
            );
        }

export default StudentsPage