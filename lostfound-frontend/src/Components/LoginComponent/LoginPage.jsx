import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { validateUser } from '../../Services/LoginService';
import '../../DisplayView.css';

 const LoginPage=()=> {
    let navigate=useNavigate();
  const [errors, setErrors] = useState({});
  const [loginData, setLoginData] =useState ({
    username: "",
    password: "",
  });
 const validateLogin = (e) => {
    e.preventDefault();
    // Send as an object { userId, password } to match backend
    validateUser({
        userId: loginData.username,
        password: loginData.password
    }).then((response) => {
        let role = String(response.data);
        if (role === "Admin")
            navigate('/AdminMenu');
        else if (role === "Student")
            navigate('/StudentMenu');
        else
            alert("Wrong Userid/Password");
    }).catch(err => {
        console.error(err);
        alert("Login failed. Check console for details.");
    });
};

const  onChangeHandler = (event) =>{
    event.persist();
    const name = event.target.name;
    const value = event.target.value;
    setLoginData(values =>({...values, [name]: value }));
};

const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;
 
    if (!loginData.username.trim()) {
      tempErrors.username = "User Name is required";
      isValid = false;
    }
 
    if (!loginData.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    }
 
    setErrors(tempErrors);
    if (isValid) {
      validateLogin(event);
    }
  };
  const registerNewUser=(e)=>{
    navigate('/Register');
}


return (
  <div className="flex justify-center items-center h-screen 
      bg-gradient-to-br from-[#8c63ff] to-[#c1a3ff] 
      p-5 relative font-[Segoe_UI]">

    {/* App Name & Quote */}
    <div className="absolute top-10 w-full text-center text-white">
      <h1 className="font-bold tracking-[2px] text-[2.5rem]">
        Lost & Found App
      </h1>
      <p className="opacity-85 italic text-[1.1rem]">
        Helping you reunite with what matters most.
      </p>
    </div>

    {/* Login Card */}
    <div className="w-[420px] p-6 rounded-[20px] 
        bg-white/85 backdrop-blur-md 
        border border-violet-400/30 
        shadow-[0_8px_30px_rgba(140,99,255,0.3)] z-10">

      <h3 className="text-center mb-4 font-bold text-xl text-[#6b3cbf]">
        User Login
      </h3>

      <form>
        {/* Username */}
        <div className="mb-3">
          <label className="font-semibold text-[#6b3cbf] block mb-1">
            Username
          </label>

          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={loginData.username}
            onChange={onChangeHandler}
            className="w-full p-2.5 rounded-[10px]
              bg-[#8c63ff0d] text-[#4b2fa3] 
              border border-[#8c63ff4d] 
              outline-none"
          />
          {errors.username && (
            <p className="text-red-500 mt-1">{errors.username}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="font-semibold text-[#6b3cbf] block mb-1">
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={loginData.password}
            onChange={onChangeHandler}
            className="w-full p-2.5 rounded-[10px]
              bg-[#8c63ff0d] text-[#4b2fa3] 
              border border-[#8c63ff4d] 
              outline-none"
          />
          {errors.password && (
            <p className="text-red-500 mt-1">{errors.password}</p>
          )}
        </div>

        {/* Login Button */}
        <button
          onClick={handleValidation}
          className="w-full py-2 font-bold rounded-[12px]
            text-white 
            bg-gradient-to-r from-[#8c63ff] to-[#b388ff]
            shadow-[0_4px_15px_rgba(140,99,255,0.4)]
            tracking-[1px]"
        >
          Login
        </button>
      </form>

      {/* Divider */}
      <div className="my-4 border-t border-violet-400/30"></div>

      {/* Register Button */}
      <button
        onClick={registerNewUser}
        className="w-full py-2 font-bold rounded-[12px]
          border border-[#8c63ff] 
          text-[#6b3cbf]
          bg-transparent"
      >
        Register New User
      </button>
    </div>
  </div>
);



}
export default LoginPage;
