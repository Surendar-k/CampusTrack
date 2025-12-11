import react, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerNewUser } from '../../Services/LoginService';
import '../../DisplayView.css';

const RegisterPage=()=> {
  
  const [lostFoundUser,setLostFoundUser] = useState({
        username:"",
        password: "",
        personalName:"",
        email:"",
        role:"",
    });
const [confirmPassword,setConfirmPassword]=useState("");
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
  const createNewUser = (event) => {
    event.preventDefault();
       if(lostFoundUser.password===confirmPassword){
         registerNewUser(lostFoundUser).then((response)=>{
           alert("User is registered successfully...Go For Login");
           navigate('/');    
         });
    }
 };
 
 const  onChangeHandler = (event) =>{
    event.persist();
    const name = event.target.name;
        const value = event.target.value;
       setLostFoundUser(values =>({...values, [name]: value }));
     };
     const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;
 
    if (!lostFoundUser.username.trim()) {
      tempErrors.username = "User Name is required";
      isValid = false;
    }
 
    if (!lostFoundUser.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    }
    else if (lostFoundUser.password.length < 5 || lostFoundUser.passwordlength > 10) {
       tempErrors.password="Password must be 5-10 characters long";
      isValid = false;
    }
    else if (lostFoundUser.password!==confirmPassword) {
      tempErrors.password="Both the passwords are not matched";
     isValid = false;
   }
 
  if (!lostFoundUser.personalName.trim()) {
        tempErrors.personalName = "Personal Name is required";
        isValid = false;
    }
if (!lostFoundUser.email.trim()) {
        tempErrors.email = "Email is required";
        isValid = false;
      }
      else if(!emailPattern.test(lostFoundUser.email)){
        tempErrors.email = "Invalid Email Format";
        isValid = false;
      }
    if (!lostFoundUser.role.trim()) {
        tempErrors.role = "Role is required";
        isValid = false;
      }
      if (!confirmPassword.trim()) {
        tempErrors.confirmPassword = "Confirm Password is required";
        isValid = false;
      }
 
   setErrors(tempErrors);
    if (isValid) {
        createNewUser(event);
    }
  };


  return (
  <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-violet-600 via-violet-500 to-violet-300 p-6 font-sans">

    {/* Main App Header */}
    <div className="text-center text-white mb-8">
      <h1 className="text-4xl font-extrabold tracking-wider drop-shadow-lg">
        Lost & Found App
      </h1>
      <p className="italic opacity-90 text-lg mt-1 drop-shadow-sm">
        Helping you reunite with what matters most.
      </p>
    </div>

    {/* Registration Card */}
    <div className="w-[450px] bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-violet-300 p-8">

      {/* Inner Registration Heading */}
      <h2 className="text-center text-2xl font-bold mb-6 text-violet-700 underline">
        New User Registration
      </h2>

      <form method="post" className="space-y-4">

        {/* Username */}
        <div>
          <label className="font-semibold text-violet-700 mb-1 block">User Name:</label>
          <input
            placeholder="Choose a username"
            name="username"
            value={lostFoundUser.username}
            onChange={onChangeHandler}
            className="w-full p-3 bg-violet-50 border border-violet-300 rounded-lg 
                       text-violet-800 placeholder-violet-400 focus:ring-2 
                       focus:ring-violet-500 outline-none"
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="font-semibold text-violet-700 mb-1 block">Password:</label>
          <input
            type="password"
            placeholder="Enter a strong password"
            name="password"
            value={lostFoundUser.password}
            onChange={onChangeHandler}
            className="w-full p-3 bg-violet-50 border border-violet-300 rounded-lg 
                       text-violet-800 placeholder-violet-400 focus:ring-2 
                       focus:ring-violet-500 outline-none"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="font-semibold text-violet-700 mb-1 block">Retype Password:</label>
          <input
            type="password"
            placeholder="Re-enter password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 bg-violet-50 border border-violet-300 rounded-lg 
                       text-violet-800 placeholder-violet-400 focus:ring-2 
                       focus:ring-violet-500 outline-none"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Personal Name */}
        <div>
          <label className="font-semibold text-violet-700 mb-1 block">Personal Name:</label>
          <input
            placeholder="Enter your full name"
            name="personalName"
            value={lostFoundUser.personalName}
            onChange={onChangeHandler}
            className="w-full p-3 bg-violet-50 border border-violet-300 rounded-lg 
                       text-violet-800 placeholder-violet-400 focus:ring-2 
                       focus:ring-violet-500 outline-none"
          />
          {errors.personalName && (
            <p className="text-red-500 text-sm mt-1">{errors.personalName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="font-semibold text-violet-700 mb-1 block">Email:</label>
          <input
            placeholder="Enter your email address"
            name="email"
            value={lostFoundUser.email}
            onChange={onChangeHandler}
            className="w-full p-3 bg-violet-50 border border-violet-300 rounded-lg 
                       text-violet-800 placeholder-violet-400 focus:ring-2 
                       focus:ring-violet-500 outline-none"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Role */}
        <div>
          <label className="font-semibold text-violet-700 mb-1 block">Select Role:</label>
          <input
            list="types"
            placeholder="Choose role"
            name="role"
            value={lostFoundUser.role}
            onChange={onChangeHandler}
            className="w-full p-3 bg-violet-50 border border-violet-300 rounded-lg 
                       text-violet-800 placeholder-violet-400 focus:ring-2 
                       focus:ring-violet-500 outline-none"
          />
          <datalist id="types">
            <option value="Student" />
            <option value="Admin" />
          </datalist>
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
        </div>

        {/* Submit Button */}
        <button
          className="w-full py-3 font-bold text-white bg-gradient-to-r 
                     from-violet-600 to-violet-400 rounded-xl shadow-lg 
                     hover:shadow-violet-500/40 transition-all tracking-wide"
          onClick={handleValidation}
        >
          Submit
        </button>
      </form>

      {/* Back to Login */}
      <div className="text-center mt-4">
        <button
          onClick={() => navigate("/")}
          className="text-violet-700 font-semibold hover:underline hover:text-violet-900 transition"
        >
          ← Back to Login
        </button>
      </div>

    </div>
  </div>
);


}
export default RegisterPage;