

function StudentTable ({students, deleteStudent, editStudent}) {
    return(
    <div>
        <h2>Student Records</h2>
        <table border="1" cellPadding="8">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Math</th>
                    <th>English</th>
                    <th>Science</th>
                    <th>total</th>
                    <th>Average</th>
                    <th>Grade</th>
                    <th>GPA</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student, index) => {
                    const total =
                    student.math + student.english + student.science
                    const average = (total / 3).toFixed(1)
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
                        <tr key={index}>
                            <td>{student.name}</td>
                            <td>{student.math}</td>
                            <td>{student.english}</td>
                            <td>{student.science}</td>
                            <td>{total}</td>
                            <td>{average}</td>
                            <td>{grade}</td>
                            <td>{gpa}</td>
                            <td>
                                <button onClick={() => editStudent(index)}>Edit</button>
                                <button onClick={() => deleteStudent(index)}>Delete</button>
                                
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    )
}

export default StudentTable