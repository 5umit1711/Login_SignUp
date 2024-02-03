import { useCallback, useRef } from "react";
import { FaUser } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { TbPassword } from "react-icons/tb"
import axios from "axios";


const SignUp = () => {

  const name = useRef();
  const password = useRef();
  const email = useRef();

  const user = {
    name: "",
    password: "",
    email: "",
  }

  const handleSignup = async (e)=>{
    e.preventDefault();
    user.name = name.current.value;
    user.password = password.current.value;
    user.email = email.current.value;
    name.current.value = ""
    email.current.value = ""
    password.current.value = ""

    try{
      const response = await axios.post("http://localhost:3000/signup", user)
    }catch(error){
      console.log(error);
    }
  }
  
  return (
    <div className="form-box">
      <h1>SignUp</h1>

      <form>

        <div className="input-field">
        <FaUser className="icon"/>
        <input type="text" placeholder="Name" ref={name} />
        </div>

        <div className="input-field">
        <MdEmail className="icon"/>
        <input type="email" placeholder="Email" ref={email} />
        </div>

        <div className="input-field">
        <TbPassword className="icon"/>
        <input type="password" placeholder="Password" ref={password}/>
        </div>

        <div className="lower-class">
          <p>Already a User</p>
          <a href="/">Login</a>       
          </div>

        <div>
        <button type="submit" className="btn btn-info button" onClick={handleSignup}>SignUp</button>
        </div>

      </form>
    </div>
  );
};

export default SignUp;
