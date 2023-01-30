import { useEffect, useState } from 'react'
import uuid from 'react-uuid';

interface ITask {
  id: string,
  content: string,
  finished: boolean
}

function App() {

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTask, setNewTask] = useState<ITask>({ id: '', content: '', finished: false });
  const [qtyTasks, setQtyTasks] = useState<number>(0);
  const [qtyFinishedTasks, setQtyFinishedTasks] = useState<number>(0);

  function createTask(event: any) {

    event.preventDefault();
    setTasks([...tasks, newTask ])
    setNewTask({ id: '', content: '', finished: false })
  }

  function changeNewTask(event: any) {
    const task = { 
      id: uuid(),
      content: event.target.value,
      finished: false
    }
    setNewTask(task)
  }

  function finishTask(id: string) {
    const taskIndex = tasks.findIndex(item => item.id === id);

    const taskChanged = tasks.find(item => item.id === id);

    if (taskChanged) {
      const task = {
        ...taskChanged,
        finished: !taskChanged.finished
      }

      const newTaskList = tasks.map((item, index) => {
        if (index === taskIndex) {
          return task
        } else {
          return item;
        }
      })

      setTasks(newTaskList);

    }
  }

  useEffect(() => {

    const finishedTasks = tasks.filter(task => task.finished === true).length;
    setQtyFinishedTasks(finishedTasks);
    console.log('finishedTasks xxx -> ', finishedTasks)

    const allTasks = tasks.length;
    setQtyTasks(allTasks)
    console.log('allTasks xxx -> ', allTasks)


  }, [tasks])

  return (
    <div className="App">
      <p>to do logo</p>

      <form action="#" onSubmit={createTask}>
        <input 
          type="text" 
          value={newTask.content} 
          onChange={changeNewTask}
        />
        <button type="submit">Criar</button>
      </form>

      <p>tarefas criadas: {qtyTasks}</p>
      <p>tarefas concluidas: {qtyFinishedTasks}</p>

      <p>tarefas criadas</p>
      {tasks.map(item => {
        return (
          <div key={item.id}>

            <p>
              
              {item.content + ' '} - <span>{item.finished ? 'concluido ' : 'em aberto '}</span>
              {item.finished ?  (
                <a href="#" onClick={() => finishTask(item.id)}>reabrir tarefa {' '}</a>
              ) : (
                <a href="#" onClick={() => finishTask(item.id)}>finalizar tarefa {' '}</a>
              )}
            
            </p>
            
            

          </div>
        )
      })}

    </div>
  )
}

export default App
