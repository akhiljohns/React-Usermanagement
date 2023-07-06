import React, { useEffect } from "react";
import { useFormik } from 'formik'
import signupValidation from "../validationSchemas/signupValidation"
import apiInstance from "../utils/apiInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../utils/store/userSlice";
import { setUsers } from "../utils/store/allUsersSlice";



const Signup = () => {
    
    const navigate= useNavigate()
    const dispatch= useDispatch()

    const user = useSelector((state) => state.user)
    const isLoggedIn = user.success

    const onSubmit = async(values) => {
        try {
            const response = await apiInstance.post('/signup', values)
            const { user,success } = response.data;
            
            if(success){
                console.log('before dispatch @ signup', user);
                dispatch(login({user,success}))
                navigate('/')
            }
          } catch (error) {
            console.error('API error:', error);
          }
    }

    const { values, errors, touched, handleBlur, handleSubmit, handleChange } = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }, 
        validationSchema: signupValidation,
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
                <div className="bg-[#101010]  rounded-3xl shadow-2xl shadow-gray-950 p-6 ">
                    <form onSubmit={handleSubmit} className="text-center ">
                        <h1 className="text-xl font-bold mb-4 text-white">
                            SIGNUP
                        </h1>
                        <br />
                        <br />
                        <label className="text-neutral-50">
                            name:
                        </label>
                        <br />
                        <input type="text" id="name" name="name" value={values.name} onBlur={handleBlur} onChange={handleChange} className="border-2 border-violet-600 rounded-xl px-6 w-auto py-1 mb-4 bg-[#171717]  focus:ring-2 focus:outline-none focus:ring-pink-400 text-white " />
                        <br />
                        {errors.name && touched.name && <p className="text-red-600">{errors.name}</p>}
                        <label className="text-gray-400">
                            email:
                        </label>
                        <br />
                        <input type="email" id="email" name="email" value={values.email} onBlur={handleBlur} onChange={handleChange} className="border-2 border-violet-600 rounded-xl px-6 w-auto py-1 mb-4 bg-[#171717]  focus:ring-2 focus:outline-none focus:ring-pink-400 text-white " />
                        <br />
                        {errors.email && touched.email && <p className="text-red-600">{errors.email}</p>}
                        <label className="text-gray-400">
                            password:
                        </label>
                        <br />
                        <input type="password" id="password" name="password" value={values.password} onBlur={handleBlur} onChange={handleChange} className="border-2 border-violet-600 rounded-xl px-6 w-auto py-1 mb-4 bg-[#171717]  focus:ring-2 focus:outline-none focus:ring-pink-400 text-white " />
                        <br />
                        {errors.password && touched.password && <p className="text-red-600">{errors.password}</p>}
                        <label className="text-gray-400">
                            Confirm password:
                        </label>
                        <br />
                        <input type="password" id="confirmPassword" name="confirmPassword" value={values.confirmPassword} onBlur={handleBlur} onChange={handleChange} className="border-2 border-violet-600 rounded-xl px-6 w-auto py-1 mb-4 bg-[#171717]  focus:ring-2 focus:outline-none focus:ring-pink-400 text-white " />
                        <br />
                        {errors.confirmPassword && touched.confirmPassword && <p className="text-red-600">{errors.confirmPassword}</p>}
                        <button type="submit"
                            className="transition ease-in-out  hover:-translate-y-1 hover:scale-100 hover:bg-indigo-500 duration-300 rounded-lg  my-2 px-8  py-2  text- text-xs font-medium uppercase text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 "
                        >submit</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Signup