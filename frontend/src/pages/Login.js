import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../component/Spinner";

import classes from "./Login.module.css";
import { toast } from "react-toastify";
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const { name, password } = formData;
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const getLoged = () => {
    if (!formData.name) {
      toast.error("Please enter a name");
    } else if (!formData.password) {
      toast.error("Please enter a password");
    } else {
      dispatch(login(formData));
    }
  };
  const Register2 = () => {
    navigate("/");
  };
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/home");
    }
    dispatch(reset());
  }, [isError, isSuccess, user, navigate, dispatch]);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className={classes.background}>
      <div className={classes.container}>
        <div className={`${classes.box} ${classes.log}`}>Login</div>
        <input
          type="text"
          id="name"
          value={name}
          onChange={onChange}
          name="name"
          placeholder="Enter your name"
          className={classes.box}
          required
        />

        <input
          type="password"
          className={classes.box}
          id="password"
          value={password}
          onChange={onChange}
          name="password"
          placeholder="Please make a password"
          required
        />

        <button className={`${classes.box} ${classes.hello}`} onClick={getLoged}>
          Login
        </button>
     <div className={`${classes.box}  ${classes.text}`}>   <div className={`${classes.box} ${classes.already}`}>
          Don't have an acount?
        </div>
        <button className={classes.reg} onClick={Register2}>
          Register
        </button>
        </div>
      </div>
    </div>
  );
}
