import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const [form, setForm] = useState({
        name: "",
        todo: "",
    });

    const [todoArray, setTodoArray] = useState([]);

    const [editing, setEditing] = useState(false);

    useEffect(() => {
        let todos = localStorage.getItem("todos");
        if (todos) {
            setTodoArray(JSON.parse(todos));
        }
    }, []);

    const saveData = (e) => {
        e.preventDefault()
        setTodoArray([...todoArray, { ...form, id: uuidv4() }])
        localStorage.setItem("todos", JSON.stringify([...todoArray, { ...form, id: uuidv4() }]))
        setForm({ name: "", todo: "" })
        setEditing(false)
    };

    const editData = (id) => {
        setEditing(true)
        setForm(todoArray.filter(item => item.id === id)[0])
        setTodoArray(todoArray.filter(item => item.id !== id))
    }
    const deleteData = (id) => {
        setTodoArray(todoArray.filter(item => item.id !== id))
        localStorage.setItem("todos", JSON.stringify(todoArray.filter(item => item.id !== id)))
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };

    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

            <div className="my-container">

                <p className='text-white text-2xl md:text-3xl text-center mt-10 font-semibold underline underline-offset-4'>Create Your Todos Here</p>

                {/* Form */}
                <form onSubmit={saveData} className='md:mt-7'>
                    <div className='text-black flex flex-col p-2 gap-8 items-center mt-5 w-[340px] sm:w-[600px] md:w-[700px] lg:w-[900px] mx-auto'>

                        <input name="name" onChange={handleChange} value={form.name} className='rounded-xl md:text-xl border border-indigo-500 w-full px-4 py-1 lg:h-[40px]' type="text" id='' placeholder='Enter your name' required />

                        <input name="todo" onChange={handleChange} value={form.todo} className='rounded-xl md:text-xl border border-indigo-500 w-full px-4 py-1 lg:h-[40px]' type="text" id='' placeholder='Enter task here' required />

                        <button type='submit' className='w-fit font-semibold text-white flex justify-center md:text-xl items-center gap-2 bg-emerald-500 hover:bg-emerald-600 rounded-full px-8 py-2 border border-green-900'>
                            Add Todo <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" color="#ffffff" fill="none">
                                <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </form>

                {/* Todo List */}
                <div className="todos mt-7 md:mt-10">
                    <h2 className='font-semibold text-2xl md:text-3xl py-4 text-white text-center underline underline-offset-4'>Your Todo List</h2>
                    {
                        todoArray.length === 0 &&
                        <>
                            {editing === false && <div>
                                <img src="/nothing-here-unscreen.gif" className='block mx-auto pl-4 sm:w-44' width={120} alt="Nothing here" />
                            </div>}
                            <div className='w-40 md:text-lg py-1 border border-white rounded-md mx-auto text-white text-center font-semibold'>{editing ? "Edit in the form" : "The list is empty!"}</div>
                        </>
                    }

                    {
                        todoArray.length != 0 &&
                        <table className="table-auto sm:mt-4 w-[350px] mx-auto rounded-md overflow-hidden sm:w-[600px] lg:w-[1000px]">
                            <thead className='bg-sky-800 text-white'>
                                <tr>
                                    <th className='py-2 border border-black text-center'>Name</th>
                                    <th className='py-2 border border-black text-center'>Tasks</th>
                                    <th className='py-2 border border-black text-center'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-sky-100'>
                                {
                                    todoArray.map((item, index) => {
                                        return <tr key={index}>
                                            <td className='py-2 border border-black text-center'>
                                                <div className='flex items-center justify-center'>
                                                    <span className='md:text-xl'>{item.name}</span>
                                                </div>
                                            </td>
                                            <td className='py-2 border border-black text-center'>
                                                <div className='flex items-center justify-center'>
                                                    <span className='md:text-xl'>{item.todo}</span>
                                                </div>
                                            </td>
                                            <td className='py-2 text-center border border-black space-x-3 flex justify-center'>
                                                {/* Edit */}
                                                <button onClick={() => editData(item.id)} className="bg-sky-500 hover:bg-sky-700 text-white md:text-xl font-semibold py-1 px-2 md:px-3 rounded">
                                                    Edit
                                                </button>
                                                {/* Delete */}
                                                <button onClick={() => deleteData(item.id)} className="bg-rose-500 hover:bg-rose-700 text-white md:text-xl font-semibold py-1 px-2 md:px-3 rounded">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}
export default Manager