import React, { useEffect, useState } from 'react';
import axios from '../helpers/axios-helper';
import TaskForm from './TaskForm';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [filter, setFilter] = useState('all'); // Estado para el filtro

    // Función para obtener todas las tareas
    const fetchTasks = async () => {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const deleteTask = async (id) => {
        await axios.delete(`/api/tasks/${id}`);
        fetchTasks();
    };

    const toggleCompleted = async (id, currentStatus) => {
        await axios.put(`/api/tasks/${id}`, { completed: !currentStatus });
        fetchTasks();
    };

    const startEditing = (task) => {
        setEditingTask(task);
        setNewTitle(task.title);
        setNewDescription(task.description || '');
    };

    const saveChanges = async (id) => {
        await axios.put(`/api/tasks/${id}`, { title: newTitle, description: newDescription });
        setEditingTask(null);
        setNewTitle('');
        setNewDescription('');
        fetchTasks();
    };

    const addTask = async (task) => {
        await axios.post('/api/tasks', task);
        fetchTasks(); // Actualizar la lista de tareas después de agregar
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
    });

    return (
        <div className="mt-4">
            <div className="mb-4">
                <TaskForm addTask={addTask} />
            </div>

            <div className="mb-4">
                <button onClick={() => setFilter('all')} className="mr-2 bg-gray-200 px-3 py-1 rounded">Todas</button>
                <button onClick={() => setFilter('completed')} className="mr-2 bg-green-200 px-3 py-1 rounded">Completadas</button>
                <button onClick={() => setFilter('pending')} className="bg-red-200 px-3 py-1 rounded">Pendientes</button>
            </div>
            
            <ul className="space-y-2">
                {filteredTasks.map(task => (
                    <li key={task._id} className="flex justify-between items-center border p-2">
                        <div className="flex-1">
                            <strong>{task.title}</strong> - {task.description} - {task.completed ? 'Completada' : 'Pendiente'}
                        </div>
                        <div>
                            <button 
                                onClick={() => toggleCompleted(task._id, task.completed)} 
                                className={`px-2 py-1 rounded ${task.completed ? 'bg-red-500' : 'bg-green-500'} text-white`}
                            >
                                {task.completed ? 'Marcar Pendiente' : 'Marcar Completada'}
                            </button>
                            <button 
                                onClick={() => startEditing(task)} 
                                className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
                            >
                                Editar
                            </button>
                            <button 
                                onClick={() => deleteTask(task._id)} 
                                className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {editingTask && (
                <div className="mt-4">
                    <h2 className="text-xl">Editar Tarea</h2>
                    <input 
                        type="text"
                        placeholder="Nuevo Título"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="border p-2 w-full"
                    />
                    <input 
                        type="text"
                        placeholder="Nueva Descripción (opcional)"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className="border p-2 w-full mt-2"
                    />
                    <button 
                        onClick={() => saveChanges(editingTask._id)} 
                        className="bg-teal-500 text-white px-4 py-2 mt-2 rounded"
                    >
                        Guardar Cambios
                    </button>
                </div>
            )}
        </div>
    );
};

export default TaskList;