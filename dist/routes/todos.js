"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let todos = [];
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
    res.status(200).json({ newtodo: newTodo });
});
router.put('/edit/:id', (req, res, next) => {
    const params = req.body;
    const id = params.id;
    const index = todos.findIndex((todo) => todo.id === id);
    const body = req.body;
    if (index >= 0) {
        todos[index] = {
            id: todos[index].id,
            text: body.text
        };
        return res.status(201).json({ message: 'todo updated', todo: todos });
    }
    res.status(404).json({ message: 'to do not found' });
});
router.delete('/deletetodo/:id', (req, res, next) => {
    const params = req.params;
    const id = params.id;
    if (id) {
        todos = todos.filter((todo) => todo.id !== id);
        res.status(200).json({ message: "success", todos: todos });
    }
    else {
        res.status(404).json({ message: "id not found" });
    }
});
exports.default = router;
