import Navbar from './components/Navbar'
import Todos from './components/Todos'

function App() {
  return (
    <>
      <div className='flex flex-col justify-between'>
        <Navbar />
        <Todos />
      </div>
    </>

  )
}

export default App
