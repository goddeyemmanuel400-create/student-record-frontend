function Sidebar({ page, setPage, isOpen, onClose }) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 left-0 h-full w-64 z-50 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-5 flex flex-col transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:h-auto md:w-64`}
      >
        <div className="flex items-center justify-between md:justify-start mb-8">
          <h1 className="text-2xl font-bold text-blue-400">Student Admin</h1>
          <button
            className="md:hidden text-gray-600 dark:text-gray-200 px-2 py-1 rounded bg-gray-200 dark:bg-gray-800"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <button onClick={() => { setPage('dashboard'); onClose(); }} className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${page === 'dashboard' ? 'bg-blue-600 text-white shadow-md font-bold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'}`}>Dashboard</button>
          <button onClick={() => { setPage('students'); onClose(); }} className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${page === 'students' ? 'bg-blue-600 text-white shadow-md font-bold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'}`}>Students</button>
          <button onClick={() => { setPage('analytics'); onClose(); }} className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${page === 'analytics' ? 'bg-blue-600 text-white shadow-md font-bold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'}`}>Analytics</button>
          <button onClick={() => { setPage('settings'); onClose(); }} className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${page === 'settings' ? 'bg-blue-600 text-white shadow-md font-bold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'}`}>Settings</button>
        </div>
        <div className="mt-auto pt-4 border-t border-gray-300 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-600 text-center">
          vl.0.4 - 2026
        </div>
      </div>
    </>
  );
}

export default Sidebar;