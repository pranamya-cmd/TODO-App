const express = require("express");
const router = express.Router();
const {getAllTodosAssociatedWithUser, getTodoById,createTodo, updateTodo, deleteTodo} = require("../controllers/todo.controller");

router.get("/", getAllTodosAssociatedWithUser);
router.get("/:id", getTodoById);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router; 