import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import BASE_URL from "../../utils/config";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";

const MyAccount = () => {
  const { user, dispatch, token } = useContext(AuthContext);
  const [tab, setTab] = useState("settings");
  const navigate = useNavigate();

  const confirmDelete = async () => {
    const result = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (result) {
      deleteAccount();
    }
  };

  const deleteAccount = async () => {
    try {
      const response = await fetch(`${BASE_URL}/donors/${user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { message } = await response.json();

      if (!response.ok) {
        toast.error(message);
      } else {
        dispatch({ type: "LOGOUT" });
        toast.success("Account deleted successfully.");
        navigate("/register");
      }
    } catch (err) {
      toast.error("Server not responding. Please try again later.");
    }
  };

  return (
    <section>
      <div className="max-w-[1170px] mx-auto py-4 px-5">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="py-[50px] px-[30px] rounded-md">
            <div className="flex items-center justify-center">
              <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-color">
                {/* Placeholder for profile image */}
                {/* <img 
                src={avatar} 
                alt="Profile" 
                className="w-full h-full rounded-full" /> */}
              </figure>
            </div>

            <div className="text-center mt-4">
              <h3 className="text-lg font-bold text-gray-800">
                {user.username}
              </h3>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>

            <div className="mt-8">
              <button
                onClick={() => setTab("settings")}
                className="w-full mb-3 py-2 px-4  text-black rounded-lg transition"
              >
                Update Profile
              </button>
              <button
                onClick={confirmDelete}
                className="w-full py-2 px-4 text-black rounded-lg transition"
              >
                Delete Account
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-2">
            <div className="flex mb-4">
              <button
                onClick={() => setTab("settings")}
                className={`${
                  tab === "settings"
                    ? "bg-blue-500 text-black"
                    : "bg-gray-200 text-gray-800"
                } py-2 px-4 rounded-lg mr-2 transition`}
              >
                Profile Settings
              </button>
            </div>

            {/* Render Profile Component */}
            {tab === "settings" && (
              <Profile user={user} dispatch={dispatch} token={token} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
