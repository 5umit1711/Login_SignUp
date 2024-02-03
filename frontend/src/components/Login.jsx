import { useRef } from "react";
import { FaUser } from "react-icons/fa"
import { TbPassword } from "react-icons/tb"
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const name = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const user = {
    name: "",
    password: "",
  }

  const handleLogin = async (e)=>{
    e.preventDefault();
    user.name = name.current.value;
    user.password = password.current.value;
    name.current.value = ""
    password.current.value = ""
    console.log(user) 

    try{
      const response = await axios.post("http://localhost:3000/login", user)
      if(response.data==="User found"){
        navigate("/response")
      }
      else{
        navigate("/error")
      }
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="form-box">
      <h1>Login</h1>
      
      <form>
        <div className="input-field">
          <FaUser className="icon" />
          <input type="text" placeholder="Name" ref={name} />
        </div>

        <div className="input-field">
          <TbPassword className="icon" />
          <input type="password" placeholder="Password" ref={password}/>
        </div>

        <div className="lower-class">
          <p>Not Registered</p>
          <a href="/signup">SignUp</a>
        </div>

        <div>
          <button type="button" className="btn btn-info button" onClick={handleLogin}>
            Login
          </button>
        </div>
        <div className="lower-class">
          <p>Forget Password</p>
          <a href="/forgotPassword">Reset Password</a>
        </div>
      </form>
    </div>
  );
};

export default Login