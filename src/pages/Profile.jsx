import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { auth } from "../utils/firebase-config";
import { signOut } from "firebase/auth";
import Navbar from "../components/Navbar";

function Profile() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.user);

  const onClickLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log("Sign Out Error", error);
    }
  };

  return (
    <>
      <Navbar showProfileIcon={false} showQuickFilter={false} />
      <div className="flex items-center gap-6 flex-col p-6 min-h-[650px] w-[400px] sm:w-[600px] mx-auto mt-[100px]">
        <h1 className="text-3xl font-medium self-start sm:ml-9">Profile</h1>
        <div className="flex sm:flex-row flex-col gap-6">
          <div className="bg-[#E50914] text-black w-16 h-16 flex justify-center items-center rounded-full cursor-pointer">
            <FaUser className="h-14 w-14" />
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="bg-gray-600 w-[350px] py-2 px-4">
              {userInfo?.email}
            </h2>
            <button
              onClick={onClickLogout}
              className="bg-red-600 hover:bg-red-800 px-4 py-2 rounded-md"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
