import React, { useContext, useState } from 'react'
import { MdDelete } from "react-icons/md";  
import { FaCheck } from "react-icons/fa6";
import context from './Context'



function Todocard({data,index}) {
    const {remove,movetocomplete}=useContext(context)
    return (
        <div className=' relative bg-transparent border border-s-red-400 border-t-green-400
         border-r-blue-400 border-b-yellow-400  h-40 w-96 rounded-md m-2 p-3'>
            <div className='mt-1 break-words '>
                <p className='text-lg ms-2 font-bold text-white'>{data.title}</p>
                <p className=' text-md ms-4 text-white '>{data.description}</p>
            </div>
            <div className='absolute bottom-4 right-4 space-x-2'>
            <button className='bg-green-600 p-2   rounded-md hover:bg-transparent hover:border
         hover:border-green-600 hover:text-green-600 border border-transparent' onClick={()=>movetocomplete(index)}><FaCheck className='inline mb-1'/>Completed</button>
                <button className='bg-red-600 p-2   rounded-md hover:bg-transparent hover:border
         hover:border-red-600 hover:text-red-600 border border-transparent  'onClick={()=>remove(index)} ><MdDelete className='inline mb-1'/>Delete</button>
            </div>
        </div>
    )
}

export default Todocard
