import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { IoIosInformationCircleOutline } from 'react-icons/io'
import axios from 'axios'

function Signin() {
    const adduser=async(data)=>{
        await axios.post("https://todo-backend-7vfo.onrender.com/adduser",data)
        }
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: ""
        },
        validate: (values) => {
            let error = {};
            if (values.email == "" || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                error.email = "Please enter valid Email "
            }
            if (values.password == "" || values.password.length <= 8 || !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i.test(values.password)) {
                error.password = "Password is not strong"
            }

            return error
        },
        onSubmit: (values) => {
            console.log(values)
           adduser(values)
            navigate('/')
        }
    })
    return (
        <div className=' grid w-screen h-screen  place-content-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
            <div className=' bg-opacity-20 bg-black rounded-md p-8'>
                <div className='grid mb-10 font-extrabold place-content-center text-white '><p>Signin</p></div>
                <form className="w-full max-w-lg text-white " onSubmit={formik.handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-widetext-xs font-semibold mb-2" >
                                First Name
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 border rounded py-3 px-4 mb-3 leading-tight text-black " name="firstname" type="text" placeholder="Jane" value={formik.values.firstname} onChange={formik.handleChange} />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-xs font-semibold mb-2" >
                                Last Name
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none
       focus:bg-white focus:border-gray-500 text-black" name="lastname" type="text" placeholder="Doe" value={formik.values.lastname} onChange={formik.handleChange} />
                        </div>
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide  text-xs font-semibold mb-2" >
                                Email
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight
       focus:outline-none focus:bg-white focus:border-gray-500" name="email" type="email" placeholder="xyz@gmail.com" value={formik.values.email} onChange={formik.handleChange} />
                            {formik.errors.email && <span className={'text-xs text-red-900 flex space-x-1 font-bold'}> <IoIosInformationCircleOutline size={15} /> <p>{formik.errors.email} </p> </span>}
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide  text-xs font-semibold mb-2" >
                                Password
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight 
      focus:outline-none focus:bg-white focus:border-gray-500" name="password" type="password" placeholder="******************" value={formik.values.password} onChange={formik.handleChange} />
                            {formik.errors.password && <span className={'text-xs text-red-900 flex space-x-1 font-bold'}> <IoIosInformationCircleOutline size={15} /> <p>{formik.errors.password} </p> </span>}
                            <p className="text-black text-xs italic">Make it as long and as crazy as you'd like</p>
                        </div>
                    </div>
                    <div className="grid place-content-center">
                        <button type="submit" className="text-black bg-cyan-500 px-1.5 py-1 rounded-md hover:shadow-inner" >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signin
