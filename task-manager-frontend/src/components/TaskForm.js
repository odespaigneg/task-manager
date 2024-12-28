import React, { useState } from 'react';
import axios from '../helpers/axios-helper';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/tasks', { title, description });
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <input 
                type="text"
                placeholder="Título de la tarea"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="border p-2 w-full"
            />
            <input 
                type="text"
                placeholder="Descripción (opcional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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