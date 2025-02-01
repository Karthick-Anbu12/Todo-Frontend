import React, { useContext, useState } from 'react'
import Todocard from './Todocard'
import { Link } from 'react-router-dom'
import context from './Context'
import Logout from './Logout'
import Completed from './Completed'

function Navbar() {
  const [filter, setfilter] = useState(0)
  const { data, list, isLoggedIn, completed } = useContext(context)
  return (
    <>
      <div>
        <div className='flex p-1 justify-end m-3 space-x-2 '>
          {
            isLoggedIn && <div className='flex space-x-3'>
              <p className='text-cyan-400 text-xl'>Hi,{data.firstname}!</p>
              <Logout />
            </div>
          }
          {
            !isLoggedIn && <Link className=' text-white bg-cyan-400 rounded-lg px-2 py-1.5  hover:bg-transparent hover:text-cyan-400
       hover:border-cyan-400 hover:border border border-transparent' to={'/login'}>Login/SignIn</Link>
          }
        </div>
        <div className='text-cyan-500 text-5xl  text-center font-bold'>Todo List</div>
        <div className='mx-32 flex space-x-2'>
          <Link className=' border border-violet-600 rounded-lg px-2 py-1 mt-2 bg-violet-600 text-white
         hover:bg-transparent hover:text-violet-600' to='/addtolist'>+ Add </Link>
          <button className=' border border-blue-600 rounded-lg px-2 py-1 mt-2 bg-blue-600 text-white
         hover:bg-transparent hover:text-blue-600' onClick={() => setfilter(0)}>All </button>
          <button className=' border border-green-600 rounded-lg px-2 py-1 mt-2 bg-green-600 text-white
         hover:bg-transparent hover:text-green-600' onClick={() => setfilter(1)}>Completed </button>
        </div>
        <div className='flex mt-3 flex-wrap max-w-8xl justify-center'>
          {
            !filter && list.map((data, index) => {
              return <Todocard data={data} index={index} />
            })

          }
          {
            filter && completed.map((data, index) => {
              return <Completed data={data} index={index} />
            })

          }
        </div>

      </div>
    </>
  )
}

export default Navbar
