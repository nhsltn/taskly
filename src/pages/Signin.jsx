import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaSuitcase } from "react-icons/fa";
import { toast } from "react-toastify";
import Vector from "/assets/images/vector-signin.png";

function Signin() {
  const navigate = useNavigate();
  // Get Data from LocalStorage
  const getSaved = () => {
    const saved = localStorage.getItem("rememberedUser");
    return saved ? JSON.parse(saved) : null;
  };

  // State Management
  const [name, setName] = useState(() => getSaved()?.name || "");
  const [position, setPosition] = useState(() => getSaved()?.position || "");
  const [rememberMe, setRememberMe] = useState(() => !!getSaved());

  //Sign In Handler
  const handleSignIn = () => {
    // Validasi — error toast
    if (!name) {
      toast.error("Nama wajib diisi!");
      return;
    }
    if (!position) {
      toast.error("Posisi wajib diisi!");
      return;
    }

    if (rememberMe) {
      localStorage.setItem(
        "rememberedUser",
        JSON.stringify({ name, position }),
      );
    } else {
      localStorage.removeItem("rememberedUser");
    }

    // Save Data ke LocalStorage dari Button Sign In
    sessionStorage.setItem("currentUser", JSON.stringify({ name, position }));

    // Success toast lalu navigate
    toast.success(`Selamat datang, ${name}!`, {
      onClose: () => navigate("/"),
      autoClose: 1500,
    });
  };

  return (
    <div className="signin-page bg-login bg-cover bg-center h-screen flex items-center justify-center">
      <div className="card w-[90%] lg:w-7xl flex lg:flex-row flex-col p-5 h-[80%]">
        <div className="signin-vector flex-1 flex items-end justify-center relative lg:pb-0 pb-10">
          <img
            src={Vector}
            alt="vector"
            className="lg:absolute lg:bottom-0 lg:left-0 lg:w-110 lg:h-165 w-55 h-82.5"
          />
        </div>
        <div className="signin-form flex-1">
          <div className="signin-content flex flex-col gap-5 lg:items-start justify-center h-full pr-0 lg:pr-10">
            <h1 className="text-4xl font-bold text-center">Sign In</h1>

            {/* Input Name */}
            <div className="name-form w-full flex flex-col gap-2">
              <label>Enter Your Name</label>
              <div className="input-box border border-gray-400 flex items-center p-2 gap-4 rounded-md focus-within:border-[#FF9090] focus-within:ring-2 focus-within:ring-[#FF9090]/30">
                <FaUser className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter Ur Name"
                  className="outline-none w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                />
              </div>
            </div>

            {/* Input Position */}
            <div className="position-form w-full flex flex-col gap-2">
              <label>Enter Your Position</label>
              <div className="input-box border border-gray-400 flex items-center p-2 gap-4 rounded-md focus-within:border-[#FF9090] focus-within:ring-2 focus-within:ring-[#FF9090]/30">
                <FaSuitcase className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter Your Position"
                  className="outline-none w-full"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="remember-me flex items-center gap-2">
              <input
                id="remember-checkbox"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-[#FF9090] cursor-pointer"
              />
              <label
                htmlFor="remember-checkbox"
                className="select-none text-sm font-medium cursor-pointer"
              >
                Remember Me
              </label>
            </div>

            {/* Button */}
            <button
              onClick={handleSignIn}
              className="bg-[#FF9090] hover:bg-[#FF6767] transition-colors text-white p-4 rounded-md font-bold w-full"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
