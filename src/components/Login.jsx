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
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <form 
            onSubmit={handleLogin}
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Login</h2>
                <input
                type="text"
                placeholder="Username"
                className="w-full mb-3 p-2 border rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}/>
                <input
                type="text"
                placeholder="Password"
                className="w-full mb-4 p-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />

                <button className="w-full bg-blue-500 text-white py-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
}
export default Login;