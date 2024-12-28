const express = require('express');
const { body, validationResult } = require('express-validator');
const Task = require('../models/Task');
const router = express.Router();

router.post('/', [
    body('title').notEmpty().withMessage('El título es obligatorio'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, completed } = req.body;
    const newTask = new Task({ title, description, completed });
    await newTask.save();

    res.status(201).json(newTask);
});

router.get('/', async (req, res) => {
    const { status } = req.query;
    const filter = status === 'completed' ? { completed: true } : (status === 'pending' ? { completed: false } : {});
    const tasks = await Task.find(filter);
    res.json(tasks);
});

router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json(task);
});

router.put('/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json(task);
});

router.delete('/:id', async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json({ message: 'Tarea eliminada' });
});

module.exports = router;