import React from 'react'

const Navbar = () => {
  return (
    <header className='text-white text-lg font-semibold bg-slate-800'>
        <nav className='flex justify-between max-w-screen-xl mx-auto px-2 py-3'>
            <div>
                <p>Todo App</p>
            </div>
            <div>
                <p>ReactJs</p>
            </div>
        </nav>
    </header>
  )
}

export default Navbar