import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosInformationCircleOutline } from "react-icons/io";
import axios from 'axios';
import context from './Context';

function Login() {
  const {getdata,setLoggedin}=useContext(context)
  const navigation = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validate: (values) => {
      let error = {};
      if (values.email == "" || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        error.email = "Please enter valid Email "
      }
      if (values.password == "" || values.password.length <= 3) {
        error.password = "Please enter password"
      }
      return error
    },
    onSubmit: async(values) => {
      try {
        const response = await axios.post("https://todo-backend-k762.onrender.com/user-login", values)
        if (response.status == 200)
             {
           window.localStorage.setItem("mytoken",response.data.message)
            navigation('/')
            setLoggedin(true)
            getdata()
        }
    }
      catch{
        alert("Invalid Credentials")
      }
    }
  }
)
  return (
    <div className='grid  w-screen h-screen place-content-center bg-gradient-to-r from-violet-500 to-fuchsia-500 '>
      <div className=' h-96 w-96  bg-black bg-opacity-20 shadow-2xl rounded-md'>
        <p className='text-3xl bold px-16 mt-10 font-bold'>Login</p>
        <div className='grid justify-items-center mt-5 '>
          <form onSubmit={formik.handleSubmit}>
            <label className='font-semibold my-1'>Email</label>
            <input type='email' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder='xyz@gmail.com' name="email" value={formik.values.email} onChange={formik.handleChange} />
            {formik.errors.email && <span className={'text-xs text-red-900 flex space-x-1 font-bold'}> <IoIosInformationCircleOutline size={15} /> <p>{formik.errors.email} </p> </span>}
            <label className='block font-semibold my-1'>Password</label>
            <input type='password' className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"' name="password" value={formik.values.password} placeholder='***********' onChange={formik.handleChange} />
            {formik.errors.password && <span className={'text-xs text-red-900 flex space-x-1 font-bold'}> <IoIosInformationCircleOutline size={15} /> <p>{formik.errors.password} </p> </span>}
            <button type='submit' className='grid place-self-center bg-blue-600 rounded-lg mt-3 w-24 text-center hover:shadow-inner'>Login</button>
          </form>
          <p>or</p>
          <Link className='text-cyan-800 underline' to='/signin' >SignIn</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
