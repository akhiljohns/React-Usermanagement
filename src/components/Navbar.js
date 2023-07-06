import React from "react"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import apiInstance from "../utils/apiInstance"
import { logout } from "../utils/store/userSlice"


const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { success } = useSelector((state) => state.user)

  const handleLogout = async () => {
    try {
      const response = await apiInstance.post('/logout')
      dispatch(logout())
      navigate('/')
      // if (response.success) {
      //   dispatch(logout())
      //   navigate('/')
      // }
    } catch (error) {
      console.error('API error:', error);
    }
  }





  return (
    <div className="fixed w-full bg-transparent h-20 flex items-center justify-end space-x-5  ">
      <div className=" flex space-x-5 mr-5">
        {!success && (
          <>
            <Link to="/signup"><button
              type="button"
              className="rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase text-neutral-50 hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-50 bg-opacity-10">
              Register
            </button></Link>
            <Link to="/login"> <button
              type="button"
              className=" rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase text-neutral-50 hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-50 bg-opacity-10">
              Login
            </button></Link>
          </>
        )}
        {success && (
          <>
            <Link to="/logout"><button
              onClick={handleLogout}
              type="button"
              className="rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase text-neutral-50 hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-50 bg-opacity-10">
              Logout
            </button></Link>
            <Link to="/profile"> <button
              type="button"
              className=" rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase text-neutral-50 hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-50 bg-opacity-10">
              profile
            </button></Link>
          </>
        )}
        <Link to="/"> <button
          type="button"
          className=" rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase text-neutral-50 hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-50 bg-opacity-10">
          Home
        </button></Link>
      </div>
    </div>
  )
}

export default Navbar
