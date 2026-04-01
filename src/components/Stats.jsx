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
        <div className="mt-8">
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800 dark:text-white">Class Insights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700
                flex flex-col items-center">
                    <span className="text-gray-500 dark:text-gray-400 text-xs uppercase font-bold
                    tracking-wider">Total Students</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400">{students.length}</span>
                        <span className="text-gray-400 dark:text-gray-500 text-sm">Enrolled</span>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700
                flex flex-col items-center">
                    <span className="text-gray-500 dark:text-gray-400 text-xs uppercase font-bold
                    tracking-wider">Class Average</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-black text-green-600 dark:text-green-400">{classAverage.toFixed(1)}%</span>
                        </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700
                flex flex-col items-center">
                    <span className="text-gray-500 dark:text-gray-400 text-xs uppercase font-bold
                    tracking-wider">Highest Average</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-black text-yellow-600 dark:text-yellow-400">{highestAverage.toFixed(1)}%</span>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700
                flex flex-col items-center">
                    <span className="text-gray-500 dark:text-gray-400 text-xs uppercase font-bold
                    tracking-wider">Lowest Average</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-black text-red-600 dark:text-red-400">{lowestAverage.toFixed(1)}%</span>
                    </div>
                </div>
                </div>
        </div>
    );
}

export default Stats