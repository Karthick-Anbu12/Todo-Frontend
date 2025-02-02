import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useNavigate } from 'react-router-dom'
import context from './Context';
function Addtolist() {
  const { getdata,isLoggedIn} = useContext(context)
  const navigation = useNavigate()
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validate: (values) => {
      let error = {};
      if (values.title == "" || values.title.length < 3) {
        error.title = "Please enter a proper tittle "
      }
      if (values.description == "" || values.description.length <= 10) {
        error.description = "Please enter proper description"
      }
      return error
    },
    onSubmit: async (values) => {
      if(!isLoggedIn){
        alert("Login or Signin to Add Todos")
      }
      await axios.post("https://todo-backend-k762.onrender.com/addtolist", values, {
        headers: {
          Authorization: window.localStorage.getItem("mytoken")
        }
      })
      navigation('/')
      getdata()
    }
  })
  return (
    <div className='h-screen w-screen bg-white relative grid place-content-center '>
      <div className='text-cyan-500 text-2xl  text-center font-bold py-4'>Add to Todo List</div>
      <div className=' bg-white w-96 h-80 shadow-2xl shadow-orange-500 p-14'>
        <form onSubmit={formik.handleSubmit}>
          <label className='font-semibold my-1'>Title</label>
          <input type='' className="appearance-none block w-full bg-gray-200 text-gray-700 border
                  border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder='Title' name="title" value={formik.values.title} onChange={formik.handleChange} />
          {formik.errors.title && <span className={'text-xs text-red-900 flex space-x-1 font-bold'}> <IoIosInformationCircleOutline size={15} /> <p>{formik.errors.title} </p> </span>}

          <label className='block font-semibold my-1'>Description</label>
          <textarea type='textbox' className='appearance-none block w-full bg-gray-200 text-gray-700 border
                  border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none' placeholder='Enter the description' name="description" value={formik.values.description} onChange={formik.handleChange} />
          {formik.errors.description && <span className={'text-xs text-red-900 flex space-x-1 font-bold'}> <IoIosInformationCircleOutline size={15} /> <p>{formik.errors.description} </p> </span>}

          <button type='submit' className='grid place-self-center bg-blue-600 rounded-lg mt-3 w-24 text-center hover:shadow-inner' >Add</button>
        </form>
      </div>

    </div>
  )
}

export default Addtolist
