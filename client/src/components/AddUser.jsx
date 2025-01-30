import React, { useState } from "react";
import { addUser } from "../api/userApi";
import toast from "react-hot-toast";

const AddUser = ({ refreshUsers }) => {
    const [user, setUser] = useState({ name: "", email: "", number: "", profileImage: null, status: "active" });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setUser({ ...user, profileImage: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(user).forEach(([key, value]) => formData.append(key, value));

        try {
            await addUser(formData);
            toast.success("User added successfully!");
            refreshUsers();
        } catch (error) {
            toast.error(error.response?.data?.error || "Error adding user!");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="name"
                placeholder="Name"
                required
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                required
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            />
            <input
                type="text"
                name="number"
                placeholder="Number"
                required
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            />
            <input
                type="file"
                name="profileImage"
                onChange={handleFileChange}
                className="w-full bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
            />
            <select
                name="status"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
            <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all">
                Add User
            </button>
        </form>
    );
};

export default AddUser;
