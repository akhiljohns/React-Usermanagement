import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../utils/store/adminSlice";
import apiInstance from "../../utils/apiInstance";
import { setUsers } from "../../utils/store/allUsersSlice";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
    const dispatch = useDispatch();
    const navigate= useNavigate()
    const [selectedUser, setSelectedUser] = useState({})
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [searachText, setSearchText] = useState("")
    const users = useSelector((state) => state.allUsers);
    const admin = useSelector((state) => state.admin);
    console.log("admin status:",admin);
    const [usersList, setUsersList] = useState(users)
    
    

    const handleLogout = () => {
        console.log('logout function')
        const response = apiInstance.post("/admin/logout")
        navigate('/admin')
        dispatch(logout());
    };

    const handleDelete = async (userId) => {
        const response = await apiInstance.post(`/admin/delete/${userId}`);
        console.log(response.data.users);
        const updatedUsers = response.data.users;
        dispatch(setUsers(updatedUsers));
    };

    function handleEditClick(user) {
        setSelectedUser(user);
        setName(user.name)
        setEmail(user.email)
        window.my_modal_3.showModal()
    }

    const handleEdit = async (userId) => {
        const data = {
            name: name,
            email: email
        }
        const response = await apiInstance.post(`/admin/edit/${userId}`, data)
        console.log("updated users:", response.data.users)
        const updatedUsers = response.data.users
        dispatch(setUsers(updatedUsers))
    }

    function searchUser(searachText) {
        const searchResult= usersList.filter((users) => users.name.includes(searachText))
        console.log("search result :",searchResult);
        return searchResult
    }

    useEffect(() => {
        if (!admin) {
            navigate("/admin")
        }
    }, [admin])

    useEffect(() => {
        setUsersList(users);
    }, [users])

    useEffect(() => {
        // Fetch the updated user list and dispatch setUsers action
        const fetchUpdatedUserList = async () => {
            try {
                const response = await apiInstance.get("/admin/getUsers");
                const updatedUsers = response.data.users;
                // setUsersList(updatedUsers)
                dispatch(setUsers(updatedUsers));
            } catch (error) {
                console.log("Error fetching updated user list:", error);
            }
        };

        fetchUpdatedUserList();
    }, [dispatch]);


    return (
        <div>



            <div className=" w-full bg-slate-200 h-20 flex items-center justify-end space-x-5  ">
                <div className=" flex space-x-5 mr-5">
                    <button
                        onClick={handleLogout}
                        type="button"
                        className="rounded border-2 border-neutral-700 px-6 pb-[6px] pt-2 text-xs font-medium uppercase text-neutral-700 hover:border-neutral-900 hover:bg-neutral-800 hover:bg-opacity-50 bg-opacity-10 shadow-black">
                        Logout
                    </button>

                </div>
            </div>
            <div className=" flex items-center">
                <input type="text" placeholder="Search user" value={searachText} onChange={(e) => setSearchText(e.target.value)} className="input border-2 border-blue-500 rounded-2xl p-1 my-2 input-info w-full max-w-xs" />
                <svg onClick={() => {
                    const searchResult = searchUser(searachText)
                    setUsersList(searchResult, users)
                }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-7 ml-1 text-blue-500 rounded-md cursor-pointer ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">No</th>
                                        <th scope="col" className="px-6 py-4 ">Name</th>
                                        <th scope="col" className="px-6 py-4">Email</th>
                                        <th scope="col" className="px-6 py-4">Delete</th>
                                        <th scope="col" className="px-6 py-4">Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersList.map((user, index) => (
                                        <tr
                                            key={index}
                                            className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-300"
                                        >
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">{user.name}</td>
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">{user.email}</td>
                                            <td className="whitespace-nowrap px-6 py-4 font-medium"><svg onClick={() => handleDelete(user._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer   ease-in-out hover:text-red-600 transform hover:-translate-y-1 hover:scale-110 rounded">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 font-medium"><svg onClick={() => handleEditClick(user)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer   ease-in-out hover:text-blue-400 transform hover:-translate-y-1 hover:scale-110 rounded-lg">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                            </svg>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
            <dialog id="my_modal_3" className=" custom-modal bg-transparent rounded h-auto">
                <div className="bg-gray-200 rounded-lg border-2 border-blue-500 h-auto p-3">
                    <form method="dialog" className="modal-box ">
                        <button htmlFor="my-modal-3" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 font-bold">✕</button>
                        <div className="h-80 w-72 rounded-xl">
                            <input className="  mt-5 rounded-lg border border-black" value={name} onChange={(e) => setName(e.target.value)} />
                            <input className="  my-4 rounded-lg border border-black" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <br />
                            <br />
                            <button onClick={() => handleEdit(selectedUser._id)} className="rounded bg-blue-200 font-bold border border-black hover:bg-blue-400 px-2">Edit</button>
                        </div>
                    </form>
                </div>
            </dialog>


        </div>



    )
}







export default AdminHome



