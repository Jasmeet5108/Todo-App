import React, { useEffect, useRef, useState } from 'react';

const Manager = () => {
    // Refs to access DOM elements
    const ref = useRef(); // For the eye icon
    const passwordRef = useRef(); // For the password input field

    // State to manage form data and todos array
    const [form, setForm] = useState({
        name: "",
        todo: "",
    });
    const [todoArray, setTodoArray] = useState([]);

    // Effect to load todos from local storage when component mounts
    useEffect(() => {
        let todos = localStorage.getItem("todos");

        if (todos) {
            setTodoArray(JSON.parse(todos));
        }
    }, []);

    // Function to toggle password visibility
    const showPassword = () => {
        passwordRef.current.type = "text";
        // console.log(ref.current.src);
        if (ref.current.src.includes("/hide.png")) {
            passwordRef.current.type = "password";
            ref.current.src = "/show.png"
        }
        else {
            ref.current.src = "/hide.png"
            passwordRef.current.type = "text";
        }
    };

    // Function to save password to local storage and state
    const saveData = () => {
        setTodoArray([...todoArray, form])
        localStorage.setItem("todos", JSON.stringify([...todoArray, form]))
        console.log([...todoArray, form]);
        setForm({ name: "", todo: "" })
    };

    const editData = (id) => {
        console.log("Editing data with ID", id);
        setForm(todoArray.filter(item => item.id === id)[0])

        setTodoArray(todoArray.filter(item => item.id !== id))
        // localStorage.setItem("todos", JSON.stringify([...todoArray, form]))
    }
    const deleteData = (id) => {
        console.log("Deleting data with ID", id);
        setTodoArray(todoArray.filter(item => item.id !== id)) // Only return those objects from the array which do not have the same ID as mentioned
        localStorage.setItem("todos", JSON.stringify(todoArray.filter(item => item.id !== id)))
    }


    // Function to handle form input changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };

    // Function to copy text to clipboard
    const copyText = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <>

            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

            {/* Main container */}
            <div className="my-container">

                {/* Header */}
                <p className='text-white text-xl text-center mt-10 font-semibold'>Your Own Todo List</p>

                {/* Form */}
                <div className='text-black flex flex-col p-4 gap-8 items-center mt-5'>
                    <input name="name" onChange={handleChange} value={form.name} className='rounded-full border border-green-500 w-full px-4 py-1' type="text" id='' placeholder='Enter your name' />
                    <div className="flex w-full justify-between gap-8">
                        <input name="todo" onChange={handleChange} value={form.todo} className='rounded-full border border-green-500 w-full px-4 py-1' type="text" id='' placeholder='Enter task' />
                    </div>
                    <button onClick={saveData} className='w-fit text-white flex justify-center items-center gap-2 bg-teal-400 hover:bg-green-300 rounded-full px-8 py-2 border border-green-900'>
                        Add Task
                    </button>
                </div>

                {/* Display saved todos */}
                <div className="todos">
                    <h2 className='font-bold text-2xl py-4'>Your Todo List</h2>
                    {todoArray.length === 0 && <div> No Items yet</div>}
                    {todoArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
                        <thead className='bg-sky-800 text-white'>
                            <tr>
                                <th className='py-2'>Name</th>
                                <th className='py-2'>Todo</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-sky-100'>
                            {todoArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-black text-center'>
                                        <div className='flex items-center justify-center'>
                                            <span>{item.name}</span>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-black text-center'>
                                        <div className='flex items-center justify-center'>
                                            <span>{item.todo}</span>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-black text-center space-x-3'>
                                        {/* Edit */}
                                        <button onClick={() => editData(item.id)} className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded">
                                            Edit
                                        </button>
                                        {/* Delete */}
                                        <button onClick={() => deleteData(item.id)} className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-3 rounded">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}
export default Manager