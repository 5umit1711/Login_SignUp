import { useRef } from "react";
import { FaMobileAlt } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Forget = () => {
    const mobileNo = useRef();
    const Otp = useRef();
    let OtpNo = 0;
    const navigate = useNavigate();

    const handleMobileNo = async (e)=>{
        e.preventDefault();
        const response = await axios.post("http://localhost:3000/sendOTP", 
        {mobileNo: mobileNo.current.value});
        // console.log(response)
    }

    const handleOTP = async (e)=>{
        e.preventDefault();
        // console.log(Otp.current.value)
        const response = await axios.post("http://localhost:3000/verify", 
        {userOTP: Otp.current.value});

        mobileNo.current.value = ""
        Otp.current.value = ""
        // console.log(response.data)
        if(response.data==="Verified"){
          navigate("/reset");
        }
        else{
          alert("Wrong OTP")
        }
    }

  return (
    <div className="form-box">
      <h1>Reset</h1>

      <form>
        <div className="input-field">
          <FaMobileAlt className="icon" />
          <input type="text" placeholder="Mobile no" ref={mobileNo}/>
        </div>

        <button type="button" className="btn btn-info button" onClick={handleMobileNo}>
          Send OTP
        </button>

        <div className="input-field">
          <MdMessage className="icon" />
          <input type="text" placeholder="OTP" ref={Otp}/>
        </div>

        <button type="button" className="btn btn-info button" onClick={handleOTP}>
          Verify
        </button>
      </form>
    </div>
  )
};

export default Forget;
