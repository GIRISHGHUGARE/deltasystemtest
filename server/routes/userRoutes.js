const express = require("express");
const { addUser, getUsers, updateUser, deleteUser, toggleUserStatus } = require("../controllers/userController");
const upload = require("../utils/multerConfig");

const router = express.Router();

router.post("/", upload.single("profileImage"), addUser);
router.get("/", getUsers);
router.put("/:id", upload.single("profileImage"), updateUser);
router.delete("/:id", deleteUser);
router.patch("/status/:id", toggleUserStatus);

module.exports = router;
