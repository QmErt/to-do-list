import React from 'react';

export default ({ name }) => (
  <>
    <h1>Hello {name}!</h1>
    <p> Start editing and see your changes reflected here immediately!</p>
  </>
);
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

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
    <div className="container mt-5">
      <h1>Todo List</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="btn btn-success mt-2" onClick={addTask}>
          Add Task
        </button>
      </div>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  className="form-control"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
                <div>
                  <button className="btn btn-primary mx-1" onClick={saveEditedTask}>
                    Save
                  </button>
                  <button className="btn btn-secondary" onClick={cancelEditing}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                {task.text}
                <div>
                  <button className="btn btn-warning mx-1" onClick={() => startEditing(task.id, task.text)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>
                    Delete
                  </button>
                </div>
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
