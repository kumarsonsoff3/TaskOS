import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTaskTitle, dueDate })
      });
      if (!response.ok) throw new Error('Failed to create task');
      
      const createdTask = await response.json();
      setTasks([createdTask, ...tasks]);
      setNewTaskTitle('');
      setDueDate('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const response = await fetch(`/api/tasks/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed })
      });
      if (!response.ok) throw new Error('Failed to update task');
      
      const updatedTask = await response.json();
      setTasks(tasks.map(t => (t._id === updatedTask._id ? updatedTask : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete task');
      
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app-container">
      <div className="ambient-background"></div>
      
      <main className="glass-panel main-content">
        <header>
          <h1>TaskOS <span>Pro</span></h1>
          <p>Organize your day with elegance.</p>
        </header>

        {error && <div className="error-banner">{error}</div>}

        <form className="task-form" onSubmit={handleCreateTask}>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="What needs to be done?" 
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="task-input"
              autoFocus
            />
            <input 
              type="date" 
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="date-input"
            />
          </div>
          <button type="submit" className="primary-btn">
            Add Task
          </button>
        </form>

        <section className="tasks-section">
          {loading ? (
            <div className="loader"></div>
          ) : tasks.length === 0 ? (
            <div className="empty-state">
              <p>No tasks yet. Enjoy your free time!</p>
            </div>
          ) : (
            <ul className="task-list">
              {tasks.map(task => (
                <li key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  <label className="custom-checkbox">
                    <input 
                      type="checkbox" 
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task)}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <div className="task-details">
                    <span className="task-title">{task.title}</span>
                    {task.dueDate && (
                      <span className="task-date">
                        Due: {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    )}
                  </div>
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDeleteTask(task._id)}
                    aria-label="Delete Task"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
