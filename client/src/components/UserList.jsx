import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser, toggleUserStatus } from "../api/userApi";
import toast from "react-hot-toast";
import UpdateUser from "./UpdateUser"; // ✅ Import the UpdateUser component

const UserList = ({ refresh }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // State to store user being updated
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    useEffect(() => {
        fetchUsers()
            .then((res) => setUsers(res.data))
            .catch((err) => console.error(err));
    }, [refresh]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await deleteUser(id);
            toast.success("User has been deleted.");
            refresh();
        }
    };

    const handleToggleStatus = async (id) => {
        await toggleUserStatus(id);
        refresh();
    };

    // Filter users based on search query
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination Logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    return (
        <div className="overflow-x-auto">
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by name or status"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4 p-2 border rounded w-full dark:bg-gray-800 dark:text-white"
            />

            <table className="w-full border border-gray-300 dark:border-gray-600 rounded-lg">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700">
                        <th className="p-3">Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Number</th>
                        <th className="p-3">Profile</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user) => (
                        <tr key={user._id} className="border-t dark:border-gray-600">
                            <td className="p-3">{user.name}</td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3">{user.number}</td>
                            <td className="p-3">
                                {user.profileImage && (
                                    <img
                                        src={`http://localhost:5000/${user.profileImage}`}
                                        alt="Profile"
                                        width="50"
                                        className="rounded-lg"
                                    />
                                )}
                            </td>
                            <td className="p-3">
                                <span className={`px-3 py-1 rounded-full text-white text-sm ${user.status === "active" ? "bg-green-500" : "bg-red-500"}`}>
                                    {user.status}
                                </span>
                            </td>
                            <td className="p-3 flex space-x-2">
                                <button
                                    onClick={() => handleToggleStatus(user._id)}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    {user.status === "active" ? "Deactivate" : "Activate"}
                                </button>
                                <button
                                    onClick={() => setSelectedUser(user)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4 space-x-2 mb-4">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded-lg ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white"}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            {/* Update User Modal */}
            {selectedUser && (
                <UpdateUser user={selectedUser} closeModal={() => setSelectedUser(null)} refresh={refresh} />
            )}
        </div>
    );
};

export default UserList;
