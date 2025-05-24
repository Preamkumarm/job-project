import { assets } from "../assets/assets";
import { useContext, useEffect, useState } from "react";
import { NameContext } from "../context/ArrContext";
import axios from 'axios';
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";

const RecruiterLogin = () => {

  
  const navigate = useNavigate();

    const {setShowLogin, backendUrl, setCompanyToken, setCompanyData} = useContext(NameContext);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [currState,setCurrState] = useState("Login");
    const [images,setImages] = useState();
    const [enterValue,setEnterValue] = useState(false);

    // Company register and
    const onLogin = async(e)=>{
        e.preventDefault();
        if (currState === "Sign Up"  && !enterValue) {
            return setEnterValue(true);   
        }

        try {
          
          if(currState === 'Login'){
            
            const {data} = await axios.post(backendUrl + '/api/company/login',{email,password})

            if(data.success){
              setCompanyData(data.company)
              setCompanyToken(data.token)
              localStorage.setItem('companyToken',data.token)
              setShowLogin(false);
              navigate('/dashboard')
            }  else{
              toast.error(data.message)
            }

          } else{

            const formData = new FormData()
            formData.append('name',name)
            formData.append('password',password)
            formData.append('email',email)
            formData.append('image',images)

            const {data} = await axios.post(backendUrl+'/api/company/register',formData)

            if(data.success){
              setCompanyData(data.company)
              setCompanyToken(data.token)
              localStorage.setItem('companyToken',data.token)
              setShowLogin(false);
              navigate('/dashboard')
            } else{
              toast.error(data.message);
            }
          }

        } catch (error) {
          toast.error(error.message)
        }
    }

    useEffect(()=>{
        document.body.style.overflow = "hidden";

        return ()=>{
            document.body.style.overflow = "unset";
        }
    },[]);
  return (
    <div className="absolute z-10 w-full h-full bg-black/60 grid">
  <form onSubmit={onLogin} className="place-self-center w-[clamp(330px,23vw,100%)] text-gray-500 bg-white flex flex-col gap-[25px] p-[25px_30px] rounded-[8px] text-sm animate-fadeIn">
  <div className="relative flex flex-col gap-1 text-black text-center">
  <h2 className="text-2xl text-neutral-700 font-medium">
    Recruiter {currState}
  </h2>
  <p className="text-sm text-gray-500">
    Welcome back! Please sign in to continue
  </p>
  <img
    onClick={() => setShowLogin(false)}
    src={assets.cross_icon}
    alt=""
    className="w-3 cursor-pointer absolute  left-[270px] bottom-14"
  />
</div>

    {
        currState === "Sign Up" && enterValue ?
        <>
        <div className="flex items-center gap-4 my-10">
           <label htmlFor="image">
            <img src={images?URL.createObjectURL(images):assets.upload_area} alt="" className="w-16 rounded-full"/>
            <input onChange={e=>setImages(e.target.files[0])} type="file" id="image" hidden/>
           </label>
           <p>Upload company <br/> Image</p>
        </div>
        </>
        :
        <div className="flex flex-col gap-[20px]">
        {currState === "Login" ? null : (
          <input
            name="name"
            onChange={e => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="company Name"
            required
            className="outline-none border border-gray-300 p-2 rounded-md"
          />
        )}
        <input
          name="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
          type="text"
          placeholder="email"
          required
          className="outline-none border border-gray-300 p-2 rounded-md"
        />
        <input
          name="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="password"
          required
          className="outline-none border border-gray-300 p-2 rounded-md"
        />
      </div>
    }

    {/* <div className="flex flex-col gap-[20px]">
      {currState === "Login" ? null : (
        <input
          name="name"
          onChange={handleChange}
          value={data.name}
          type="text"
          placeholder="company Name"
          required
          className="outline-none border border-gray-300 p-2 rounded-md"
        />
      )}
      <input
        name="email"
        onChange={handleChange}
        value={data.email}
        type="text"
        placeholder="email"
        required
        className="outline-none border border-gray-300 p-2 rounded-md"
      />
      <input
        name="password"
        onChange={handleChange}
        value={data.password}
        type="password"
        placeholder="password"
        required
        className="outline-none border border-gray-300 p-2 rounded-md"
      />
    </div> */}

   {currState === "Login" && <p className="text-blue-600 text:sm mt-4 cursor-pointer">forgot Password</p>}
    <button
      type="submit"
      className="border-none p-2 rounded-md text-white  bg-blue-500 text-base cursor-pointer"
    >
      {currState === "Sign Up" ? enterValue?"create account":"next" : "Login"}
    </button>

    <div className="flex items-start gap-2 -mt-4">
      <input type="checkbox" required className="mt-1" />
      <p>By continuing, I agree to the terms of use & privacy policy.</p>
    </div>

    {currState === "Login" ? (
      <p>
        Create a new account?{" "}
        <span
          onClick={() => setCurrState("Sign Up")}
          className="text-tomato font-medium cursor-pointer text-blue-500"
        >
          Sign Up
        </span>
      </p>
    ) : (
      <p>
        Already have an account?{" "}
        <span
          onClick={() => setCurrState("Login")}
          className="text-tomato font-medium cursor-pointer text-blue-500"
        >
          Login here
        </span>
      </p>
    )}
  </form>
</div>

  )
}

export default RecruiterLogin