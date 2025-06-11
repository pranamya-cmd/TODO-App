const User = require("../models/user.model");
const Todo = require("../models/todo.model");


const getAllTodosAssociatedWithUser = async (req, res) => {
    try {
        const user = req.user;
        const todos = await Todo.find({ user: user._id });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const getTodoById = async (req, res) => {
    console.log(req.params.id)

    try {
        const user = req.user;
        const todoId = req.params.id;
        const todo = await Todo.findOne({ _id: todoId, user: user._id });
        res.status(200).json(todo);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const createTodo = async (req, res) => {
    try {
        const user = req.user;
        const { title, description, category } = req.body;
        const newTodo = new Todo({
            title,
            description,
            category,
            user: user._id
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const updateTodo = async (req, res) => {
    try {
        const user = req.user;
        const todoId = req.params.id;
        const { title, description, category, status } = req.body;

        const todo = await Todo.findOne({ _id: todoId, user: user._id });
        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        // Maintain previous state if title or description is not provided
        todo.title = title !== undefined ? title : todo.title;
        todo.description = description !== undefined ? description : todo.description;
        todo.category = category !== undefined ? category : todo.category;
        todo.status = status !== undefined ? status : todo.status;

        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const deleteTodo = async (req, res) => {
    try {
        const user = req.user;
        const todoId = req.params.id;

        const todo = await Todo.findOne({ _id: todoId, user: user._id });

        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        await todo.deleteOne({
            _id: todoId,
            user: user._id
        });
        res.json({ message: 'Todo deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}




module.exports = {
    getAllTodosAssociatedWithUser,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
}

