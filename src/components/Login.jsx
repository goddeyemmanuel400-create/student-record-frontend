import { useState } from "react";

function Login ({setIsLoggedIn }) {
    const  [username, setUsername] = useState ("");
    const [password, setPassword] = useState ("");

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === "DaMin" && password === "Em101") {
            localStorage.setItem("isLoggedIn", "true");
            setIsLoggedIn(true);
        } else {
            alert("Invaled login details");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <form
            onSubmit={handleLogin}
            className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md w-full max-w-sm mx-4">
                <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">Login</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
                        <input
                        type="text"
                        placeholder="Enter username"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                        <input
                        type="password"
                        placeholder="Enter password"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors text-sm sm:text-base mt-6 min-h-[48px]">
                    Login
                </button>
            </form>
        </div>
    );
}
export default Login;