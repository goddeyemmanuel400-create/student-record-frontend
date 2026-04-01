import {Bar} from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js"
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)
function Dashboard({students, chartData})
 {
    const topStudents= students.length > 0 ? [...students].sort((a, b) => (b.gpa || 0) - (a.gpa || 0))[0] : null;
    const passingCount = students.filter(s => ((Number(s.math)+Number(s.english)+Number(s.science))/3) >= 50).length;
    
    return (
        <div className="p-4 sm:p-6">
       
            <h1 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-white">Analytics Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-600 text-white p-4 sm:p-5 rounded-xl shadow-md">
            <h2 className="text-xs sm:text-sm uppercase font-semibold opacity-80">Total Students</h2>
            <p className="text-2xl sm:text-3xl font-black">
                {students.length}
            </p>
        </div>
        
        <div className="bg-emerald-500 text-white p-4 sm:p-5 rounded-xl shadow-md">
        <h2 className="text-xs sm:text-sm uppercase font-semibold opacity-80">Average GPA</h2>
        <p className="text-xl sm:text-3xl font-bold">
            {students.length > 0 ? (students.reduce((acc, s) => acc + (parseFloat(s.gpa || 0)), 0) / students.length).toFixed(2) : "0.00"}
        </p>
        </div>
        <div className="bg-purple-600 text-white p-4 sm:p-5 rounded-xl shadow-md">
        <h2 className="text-xs sm:text-sm uppercase font-semibold opacity-80">Top Performance</h2>
        <p className="text-sm uppercase font-bold truncate">{topStudents ? topStudents.name : "N/A"}
        </p>
        </div>
        <div className="bg-orange-500 text-white p-4 sm:p-5 rounded-xl shadow-md">
        <h2 className="text-xs sm:text-sm uppercase font-semibold opacity-80">Pass Rate</h2>
        <p className="text-xl sm:text-3xl font-black">
            {students.length ? Math.round((passingCount / students.length) * 100): 0}%
        </p>
        </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-base sm:text-lg font-bold mb-4 text-gray-800 dark:text-white">Student GPA Performance</h2>
        <div className="h-64 sm:h-72 md:h-96 flex items-center justify-center">
            {students.length > 0 && chartData ? (
                <Bar data={chartData} options={{
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        } }
                }} />
            ) : (<div className="text-center text-gray-400 dark:text-gray-300">
                <p className="text-lg ">No chart data available</p>
                    <p className="text-sm">Add students in the records tab see analytics.</p>
            </div>
          
        )}        </div>
        </div>
        </div>
        
    );
}
        export default Dashboard;