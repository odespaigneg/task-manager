import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTitle.trim() === '') return;

        addTask({ title: newTitle, description: newDescription });

        setNewTitle('');
        setNewDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <input
                type="text"
                placeholder="Título de la tarea"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
                className="border p-2 w-full"
            />
            <input
                type="text"
                placeholder="Descripción (opcional)"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="border p-2 w-full mt-2"
            />
            <button
                type="submit"
                className="bg-teal-500 text-white px-4 py-2 mt-2 rounded"
            >
                Agregar Tarea
            </button>
        </form>
    );
};

export default TaskForm;