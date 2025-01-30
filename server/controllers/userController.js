const User = require("../models/User");

// Add User
exports.addUser = async (req, res) => {
    try {
        const { name, email, number, status } = req.body;
        const profileImage = req.file ? req.file.path : null;

        const newUser = new User({ name, email, number, profileImage, status });
        await newUser.save();

        res.status(201).json({ message: "User added successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update User
exports.updateUser = async (req, res) => {
    try {
        const { name, email, number, status } = req.body;
        const profileImage = req.file ? req.file.path : req.body.profileImage;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, number, profileImage, status },
            { new: true }
        );

        res.json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Toggle User Status
exports.toggleUserStatus = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.status = user.status === "active" ? "inactive" : "active";
        await user.save();

        res.json({ message: "User status updated", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
