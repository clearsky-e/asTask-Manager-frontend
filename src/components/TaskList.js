import TaskForm from "./TaskForm";
import Task from "./Task"
import { useEffect, useState } from "react";
import { toast } from "react-toastify"
import axios from "axios"
// Axios is used to communicate with the backend, so each requst to the backend is going through the axios

import { URL } from "../App";
import loadingImage from "../assets/loading-14.gif"







// COMPLETE GUIDE FOR THE REACT USESTATE
// The state is a built-in React object that is used to contain data or information about the component. A component's state can change over time; whenever it changes, the component re-renders, simply State generally refers to data or properties that need to be tracking in an application.
// The useState allows us to track state in a function component.
// to use this , we need to define it in a function, in our case it is TaskList. inside the useState whatever we write is known as initial state, mostly it is empty, but we define the name as empty string and the completed as false. The useState provide the two argument wich are the current state and the function that change the state, we can name these arguments any thing, in our case these are formData, setFormData.
// in the following function we have created two usestates,  the first one is there to show the tasks in the UI nd the second is 
const TaskList = () => {
    // The following state is there to show the completed task
    const [tasks, setTasks] = useState([])
    // The following state is there to show the completed task
    const [Completedtasks, setCompletedTasks] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    const [isEditing, setIsEditing] = useState(false)

    const [taskID, setTaskID] = useState("")

    // The follwing state is there for creating the task in the database
    const [formData, setFormData] = useState({
        name: "",
        completed: false
    })

    const { name } = formData
    // here we distructure the name from the formData,, so that we can use the name directly

    // here the e is just a event coming from the function handleInputChange, it contains all the data of the form as it is fired when the value of an HTML element is changed, means when we write something in the input field, since it is a on change method 
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        // this simply means we are getting the formData from the spread operator, and then in that we changed the name to the value input by the user
    }



    const getTasks = async () => {
        setIsLoading(true)
        try {
            const {data} = await axios.get(`${URL}/api/tasks`)
            setTasks(data)
            setIsLoading(false)
        } catch (error) {
            toast.error(error.message)
            setIsLoading(false)
        }

    };


    useEffect(() => {
        getTasks()
    }, [])







    const createTask = async (e) => {
        e.preventDefault()
        // The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur
        // to understand it better, just run the code without this, and explain it here
        if (name === "") {
            return toast.error("input field cant be empty")
            // React toasts are lightweight notifications designed to mimic the push notifications that have been popularized by mobile and desktop operating systems. for using this we import and install this package
        }
        try {
            await axios.post(`${URL}/api/tasks`, formData)
            toast.success("Great!, you just added a task")
            setFormData({ ...formData, name: "" })
            getTasks();
        } catch (error) {
            toast.error(error.message)

        }
    }


    const deleteTask = async (id) =>{
        try{
            await axios.delete(`${URL}/api/tasks/${id}`)
            getTasks()
        } catch(error) {
            toast.error(error.message)
        }

    }

    useEffect(()=>{
        const cTask = tasks.filter((task)=>{
            return task.completed===true
        })
        setCompletedTasks(cTask)
    }, [tasks])


    const getSingleTask = async (task) => {
        setFormData({name:task.name, completed: false})
        setTaskID(task._id)
        setIsEditing(true)
    }

    const updateTask = async (e) =>{
        e.preventDefault()
        if (name === "") {
            return toast.error("input fields can not be empty")
        }
        try {
            await axios.put(`${URL}/api/tasks/${taskID}`, formData)
            setFormData({...formData, name: ""})
            setIsEditing(false)
            getTasks()
        } catch (error) {
            toast.error(error.message)
        }

    }

    const setTocomplete = async (task) => {
        const newFormData = {
            name: task.name,
            completed: true,
        }
        try {
            await axios.put(`${URL}/api/tasks/${task._id}`, newFormData)
            getTasks()
        } catch (error) {
            toast.error(error.message)
        }
    };






    return (
        <div>
            <h2>
                as_Task-Manager
            </h2>
            {/* here we use the component Task form, this form sends these arguments so we define them */}
            <TaskForm name={name} handleInputChange={handleInputChange} createTask={createTask} isEditing={isEditing} updateTask={updateTask}/>
            {tasks.length > 0 && (
            <div className="--flex-between --pb">
                <p>
                    <b>Total Tasks:</b> {tasks.length}
                </p>
                <p>
                    <b>Completed Tasks:</b> {Completedtasks.length}
                </p>
            </div>
            )}
            <hr />
            {isLoading && (
                    <div className="--flex-center">
                        <img src={loadingImage} alt="loding" />
                    </div>
                )
            }
            {!isLoading && tasks.length == 0 ? (
                    <p className=" --py">No task added. Please add a task</p>
                ) : (
                    <>
                    {tasks.map((task, index)=>{
                        return(
                            <Task key={task._id} task={task} index={index} deleteTask={deleteTask} getSingleTask={getSingleTask} setTocomplete={setTocomplete}/>
                        )
                    })}
                    
                    </>
                )

            }
            
        </div>
    )
}

export default TaskList;