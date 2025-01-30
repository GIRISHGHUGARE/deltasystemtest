import React, { useState, useEffect } from "react";
import AddUser from "../components/AddUser";
import UserList from "../components/UserList";
import UpdateUser from "../components/UpdateUser";
import { FaSun, FaMoon } from "react-icons/fa";

const Home = () => {
    const [refresh, setRefresh] = useState(false);
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all ">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with Theme Toggle */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold mt-12">User Management Panel</h1>
                    <button
                        className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 transition-all hover:scale-105 mt-12"
                        onClick={() => setDarkMode(!darkMode)}
                    >
                        {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-900" />}
                    </button>
                </div>

                {/* User Form & List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg min-h-[450px] w-full">
                        <h2 className="text-lg sm:text-xl font-semibold mb-4">Add User</h2>
                        <AddUser refreshUsers={() => setRefresh(!refresh)} />
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg min-h-[450px] w-full">
                        <h2 className="text-lg sm:text-xl font-semibold mb-4">User List</h2>
                        <UserList
                            refresh={() => setRefresh(!refresh)}
                            UpdateUser={UpdateUser}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
