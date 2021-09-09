import { useState } from 'react'
import { FiTrash, FiCheckSquare } from 'react-icons/fi'

import '../styles/tasklist.scss'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  // def hook to list of tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  // def hook to new task
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // function => create new task
  function handleCreateNewTask() {
    // if newTaskTitle is null => not allow/return
    if (!newTaskTitle) return

    // put value to newTask
    const newTask = {
      id: Math.random(), // bestPractice: use sequencial
      title: newTaskTitle,
      isComplete: false,
    }

    // add new task for array // bestPractice: use callBack 
    setTasks ((oldState) => [
      ...oldState,
      newTask
    ])

    // reset newTaskTitle
    setNewTaskTitle("")
  }

  // function => Turn value isComplete to task => true or false 
  function handleToggleTaskCompletion(id: number) {

    // update item in newTask
    const newTasks = tasks.map((task) => 
      task.id === id ? { ...task, isComplete: !task.isComplete, } : task 
    )

    // update state of listTask
    setTasks(newTasks)
  }

  function handleRemoveTask(id: number) {
    // filtrando listTask
    const filteredTasks = tasks.filter((task) => task.id !== id);
    // update state of listTask
    setTasks(filteredTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}