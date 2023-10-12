import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiInstance from "../utils/apiInstance";
import { login } from "../utils/store/userSlice";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMediaSelectionVisible, setIsMediaSelectionVisible] = useState(false); // Declare isMediaSelectionVisible state
  const user = useSelector((state) => state.user);
  const { name, email, image } = user;
  const isLoggedIn = user.success;

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);
    const response = await apiInstance.post('/update-profilePic', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    dispatch(login(response.data));
    setIsMediaSelectionVisible(false); // Hide the media selection box
  };

  const handleClick = () => {
    setIsMediaSelectionVisible(true); // Show the media selection box
    window.my_modal_3.showModal();
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-400 w-80">
          <img className="h-44 w4 px-1" src={image} alt="profile picture" />
          <div className="px-6 py-4">
            <br />
            <div className="font-bold text-xl mb-2">{name}</div>
            <p className="text-gray-700 text-base font-bold">{email}</p>
            <br />
            <br />
            <br />
            <button
              onClick={() => {
                handleClick();
              }}
              className="rounded-full border-2 bg-slate-800 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase text-neutral-50 hover:border-neutral-100 hover-bg-black hover-opacity-50"
            >
              Update Profile Picture
            </button>
          </div>
        </div>
      </div>
      <dialog id="my_modal_3" className="custom-modal bg-transparent rounded h-auto">
        <div className="bg-gray-200 rounded-lg border-2 border-blue-500 h-auto p-3">
          <button
            onClick={() => {
              setIsMediaSelectionVisible(false); // Hide the media selection box
              window.my_modal_3.close(); // Close the modal
            }}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 font-bold"
          >
            ✕
          </button>
          {isMediaSelectionVisible && ( // Show the media selection box conditionally
            <div className="h-80 w-72 rounded-xl">
              <form onSubmit={handleUploadImage} encType="multipart/form-data">
                <input
                  type="file"
                  className="admin__input"
                  id="file"
                  name="file"
                  onChange={handleFileSelect}
                />
                <button className="rounded bg-blue-200 font-bold border border-black hover-bg-blue-400 px-2">
                  Edit
                </button>
              </form>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default UserProfile;
