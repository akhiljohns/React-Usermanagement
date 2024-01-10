import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { login } from "../utils/store/userSlice";
import loginValidation from "../validationSchemas/loginValidation";
import apiInstance from "../utils/apiInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";



const Login = () => {

    const navigate= useNavigate()
    const dispatch= useDispatch()
    const [loginError,setLoginError] = useState('')

    const user = useSelector((state) => state.user)
    const isLoggedIn = user.success

    const onSubmit = async(values) => {
        try {
        const response= await apiInstance.post('/login',values)
        console.log(response.data)
        const { user,success,message } = response.data;
        setLoginError(message)
        if(success){
            dispatch(login({user,success}))
            navigate('/')
        }
        } catch (error) {
            console.error('API error:', error)
        }
    }
    
    const { values, errors, touched, handleBlur, handleSubmit, handleChange } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginValidation,
        onSubmit
    })
    
        useEffect(() => {
        if (isLoggedIn) {
            navigate("/")
        }
    }, [isLoggedIn])

    return (
        <div>
            <div className="flex  items-center justify-center h-screen bg-[#2F3137] ">
                <div className="bg-[#101010]  rounded-3xl shadow-2xl shadow-gray-950 p-6">
                    <form  onSubmit={handleSubmit} className="text-center ">
                        <h1 className="text-xl font-bold mb-4 text-white">
                            LOGIN
                        </h1>
                        <br />
                        <br />
                        <label htmlFor="username" className="text-neutral-50 ">
                            Email:
                        </label>
                        <br />
                        <input type="text" id="email" name="email" value={values.email} onBlur={handleBlur} onChange={handleChange} className="border-2 border-violet-600 rounded-xl px-2 w-auto py-1 mb-4 bg-[#171717]  focus:ring-2 focus:outline-none focus:ring-pink-400 text-white " />
                        {errors.email && touched.email && <p className="text-red-500">{errors.email}</p>}
                        <br />
                        <label htmlFor="password" className="text-neutral-50">
                            Password:
                        </label>
                        <br />
                        <input type="password" id="password" name="password" value={values.password} onBlur={handleBlur} onChange={handleChange} className="border-2 border-violet-600 rounded-xl px-2 py-1 mb-4 bg-[#171717] focus:ring-2 focus:outline-none focus:ring-pink-400 text-white" />
                        <br />
                       
                        <button type="submit"
                            
                            className="transition ease-in-out  hover:-translate-y-1 hover:scale-100 hover:bg-indigo-500 duration-300 rounded-lg  my-2 px-8  py-2  text- text-xs font-medium uppercase text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 "
                        >submit</button>
                        <br />
                        <p className="text-red-500">{loginError}</p>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Login