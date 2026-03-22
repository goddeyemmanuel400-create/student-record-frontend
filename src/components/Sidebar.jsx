function Sidebar({ page, setPage }) {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-5 flex flex-col">
      <h1 className="text-2xl font-bold mb-8 px-2 text-blue-400">Student Admin</h1>
      <div className="flex flex-col gap-2">
        <button onClick={() => setPage("dashboard")} className={`w-full text-left 
          p-3 rounded-lg transition-all duration-200 ${page === "dashboard" ? "bg-blue-600 text-white shadow-md font-bold" :
           "text-gray-400 hover:bg-gray-800 hover:text-white"}`}>Dashboard
            </button>
            <button onClick={() => setPage("students")} className={`w-full text-left 
          p-3 rounded-lg transition-all duration-200 ${page === "students" ? "bg-blue-600 text-white shadow-md font-bold" :
           "text-gray-400 hover:bg-gray-800 hover:text-white"}`}>Students
            </button>
            <button onClick={() => setPage("analytics")} className={`w-full text-left 
          p-3 rounded-lg transition-all duration-200 ${page === "analytics" ? "bg-blue-600 text-white shadow-md font-bold" :
           "text-gray-400 hover:bg-gray-800 hover:text-white"}`}>Analytics
            </button>
            <button onClick={() => setPage("settings")} className={`w-full text-left 
          p-3 rounded-lg transition-all duration-200 ${page === "settings" ? "bg-blue-600 text-white shadow-md font-bold" :
           "text-gray-400 hover:bg-gray-800 hover:text-white"}`}>Settings
            </button>
      </div>
      < div className="mt-auto pt-4 border-t border-gray-800 text-xs text-gray-500 text-center">
      vl.0.4 - 2026
      </div>
      </div>
  );
}
      
export default Sidebar;