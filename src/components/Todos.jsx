import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

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

    // Function to save password to local storage and state
    const saveData = () => {
        setTodoArray([...todoArray, { ...form, id: uuidv4() }])
        localStorage.setItem("todos", JSON.stringify([...todoArray, { ...form, id: uuidv4() }]))
        console.log([...todoArray, { ...form, id: uuidv4() }]);
        setForm({ name: "", todo: "" })
    };

    const editData = (id) => {
        console.log("Editing data with ID", id);
        setForm(todoArray.filter(item => item.id === id)[0])
        setTodoArray(todoArray.filter(item => item.id !== id))
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

    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

            {/* Main container */}
            <div className="my-container">

                {/* Header */}
                <p className='text-white text-2xl text-center mt-10 font-semibold'>Your Own Todo Creator</p>

                {/* Form */}
                <div className='text-black flex flex-col p-4 gap-8 items-center mt-5 w-[350px] sm:w-[600px] mx-auto'>
                    <input name="name" onChange={handleChange} value={form.name} className='rounded-xl border border-green-500 w-full px-4 py-1' type="text" id='' placeholder='Enter your name' />
                    <input name="todo" onChange={handleChange} value={form.todo} className='rounded-xl border border-green-500 w-full px-4 py-1' type="text" id='' placeholder='Enter task' />
                    <button onClick={saveData} className='w-fit font-semibold text-white flex justify-center items-center gap-2 bg-cyan-600 rounded-full px-8 py-2 border border-green-900'>
                        Add Todo <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" color="#ffffff" fill="none">
                            <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Display saved todos */}
                <div className="todos mt-5">
                    <h2 className='font-semibold text-2xl py-4 text-white text-center'>Your Todo List</h2>
                    {todoArray.length === 0 && <div className='text-white text-center font-semibold'>Nothing here yet!!</div>}
                    {todoArray.length != 0 && <table className="table-auto w-[370px] mx-auto rounded-md overflow-hidden sm:w-[600px] lg:w-[1000px]">
                        <thead className='bg-sky-800 text-white'>
                            <tr>
                                <th className='py-2'>Name</th>
                                <th className='py-2'>Tasks</th>
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
                                    <td className='py-2 border border-black text-center space-x-3 flex justify-center'>
                                        {/* Edit */}
                                        <button onClick={() => editData(item.id)} className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-1 px-2 rounded">
                                            Edit
                                        </button>
                                        {/* Delete */}
                                        <button onClick={() => deleteData(item.id)} className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-1 px-2 rounded">
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