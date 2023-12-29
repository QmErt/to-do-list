import React, { useState } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const startEditing = (id, text) => {
    setEditingTaskId(id);
    setEditedTask(text);
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditedTask('');
  };

  const saveEditedTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId ? { ...task, text: editedTask } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditedTask('');
  };

  return (
    <div>
      <h1>To Do List</h1>
      <div>
        <input 
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="addtask-button" onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
                <button className="saveedit-button" onClick={saveEditedTask}>Save</button>
                <button className="canceledit-button" onClick={cancelEditing}>Cancel</button>
              </>
            ) : (
              <>
                {task.text}
                
                <button className="edit-button" onClick={() => startEditing(task.id, task.text)}>
                  Edit
                </button>

                <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;
