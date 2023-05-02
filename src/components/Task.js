
// after using the boiler plate of the react(via writing this 'rafce', for this we install a extension called es7+react)
// the boiler plate here, is nothing jsut gives us a arroow function inside a costant, and then app;ied a div tag inside it


// this component simply shows the tasks(in the form of list) which are added

import {FaCheckDouble, FaEdit, FaRegTrashAlt} from "react-icons/fa"

const Task = ({task, index, deleteTask, getSingleTask, setTocomplete}) => {
  return (
    <div className={task.completed ? "task completed" : "task"}>
      <p>
        <b>{index+1}. </b>
       {task.name}
      </p>
      <div className="task-icons">
        <FaCheckDouble color="green " onClick={()=>setTocomplete(task)} />
        <FaEdit color="purple" onClick={()=>getSingleTask(task)}/>
        <FaRegTrashAlt color="red"  onClick={()=>deleteTask(task._id)}/>
      </div>
    </div>
  )
}

export default Task;