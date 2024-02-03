import { useRef } from "react";
import { FaUser } from "react-icons/fa";
import { TbPassword } from "react-icons/tb";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reset = () => {
  const name = useRef();
  const newPassword = useRef();
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    const respose = await axios.post("http://localhost:3000/reset", {
      name: name.current.value,
      newPassword: newPassword.current.value,
    });
    name.current.value = "";
    newPassword.current.value = "";

    if (respose.data === "Password Reset") {
      alert("Your password has been reset");
      navigate("/");
    } else {
      alert("User not found. Enter valid user");
    }
  };

  return (
    <div className="form-box">
      <h1>Reset </h1>

      <form>
        <div className="input-field">
          <FaUser className="icon" />
          <input type="text" placeholder="Username" ref={name} />
        </div>

        <div className="input-field">
          <TbPassword className="icon" />
          <input type="password" placeholder="New Password" ref={newPassword} />
        </div>

        <div>
          <button
            type="button"
            className="btn btn-info button"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        <div className="lower-class">
          <p>Not Registered</p>
          <a href="/signup">SignUp</a>
        </div>
      </form>
    </div>
  );
};

export default Reset;
