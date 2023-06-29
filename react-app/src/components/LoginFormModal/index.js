import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      history.push("/boards/current")
      closeModal()
    }
  };

  const handleDemoButtonClick = async () => {
    await dispatch(login('marnie@aa.io', 'password'))
    closeModal()
    history.push('/boards/current')
  }

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <h4 className="login-title" >Log in to NotTrello</h4>
        <ul className="errors">
          {errors.map((error, idx) => (
            <li key={idx}>❗{error.split(': ')[1]}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="login-button">Log In</button>
        <button onClick={() => handleDemoButtonClick()} className="demo-button">Log in as Demo User</button>
      </form>
    </>
  );
}

export default LoginFormModal;
