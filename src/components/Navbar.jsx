import React from 'react'

const Navbar = () => {
  return (
    <header className='text-white font-semibold bg-slate-800'>
        <nav className='flex justify-between max-w-screen-xl mx-auto px-1 py-2'>
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