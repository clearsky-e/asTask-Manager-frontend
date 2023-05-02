// okay so this is a component, and it shows the form, in the browser that take input 
// also it sends 3 parameters which are the createTask method, name that has been entered and a onChange function
// these parameters are defined in the TaskList component, as we are just calling from here


const TaskForm = ({createTask, name, handleInputChange, isEditing, updateTask}) => {
  return (
    <form className="task-form" onSubmit={isEditing? updateTask:createTask}>
        <input type="text" placeholder="Add a task" name="name" value={name} onChange={handleInputChange}/>
        <button type="submit">{isEditing ? "Edit" : "Add"}</button>

    </form>
  )
}

export default TaskForm;