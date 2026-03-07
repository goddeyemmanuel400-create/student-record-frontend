function Stats({students}) {
    if (students.length === 0) {
        return <h3>No statistics yet</h3>
    }
    const average = students.map(student => 
        (student.math + student.english + student.science) / 3)
        
    const classAverage = (average.reduce((a, b) => a + b, 0) / average.length)
    const highestAverage = Math.max(...average)
    const lowestAverage = Math.min(...average)
    return (
        <div>
            <h2>Class Statistics</h2>
            <p>Total Students: {students.length}</p>
            <p>Class Average: {classAverage.toFixed(1)}</p>
            <p>Highest Average: {highestAverage.toFixed(1)}</p>
            <p>Lowest Average: {lowestAverage.toFixed(1)}</p>
        </div>
    )
}

export default Stats