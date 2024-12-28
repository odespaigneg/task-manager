import React from 'react';
import TaskList from './components/TaskList';

const App = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Gestión de Tareas</h1>
            <TaskList />
        </div>
    );
};

export default App;