import React from 'react'
import { useState ,useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { register,reset } from "../features/auth/authSlice";
import Spinner from '../component/Spinner';
import { toast } from "react-toastify";
import classes from './Register.module.css'
export default function Register() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
      });
      const {name,email,password,password2}=formData;
      const {user,isLoading,isError,isSuccess,message}=useSelector((state)=>state.auth)
    const onChange = (e) => {
       
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };
      const getRegistered=()=>{
        if(formData.name & formData.email & formData.password==formData.password2 & formData.password){

     dispatch(register(formData))
        }  
        else if(!formData.name){
          toast.error('Please enter a name')
        }
        else if(!formData.email){
          toast.error('Please enter a  email')
        }
        else if(!formData.password){
          toast.error('Please enter a  password')
        }
        else {
          toast.error('Passwords do not match')
        }
    }
      const Login2=()=>{
        navigate('/login')
      }
      useEffect(() => {
        if(isError){
          toast.error(message)
        }
        //Redirect when logged in
        if (isSuccess || user) {
          navigate("/home");
        }
        dispatch(reset())
        
      }, [isError, isSuccess, user, message, navigate, dispatch]);
      if (isLoading) {
        return <Spinner/>;
      }
  return (
    <div className={classes.background}>
        <div className={classes.container}>
            <div  className={`${classes.hey} ${classes.register}` }>Register</div>
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
                type="email"
                className={classes.box}
                id="email"
                value={email}
                onChange={onChange}
                
                name="email"
                placeholder="Enter your email"
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
             <input
              type="password"
              className={classes.box}
              id="password2"
              value={password2}
              onChange={onChange}
              name="password2"
              placeholder="Please enter the password again "
              required
            />
            <button  className={`${classes.box} ${classes.reg}`} onClick={getRegistered}>Submit</button>
           <div className={classes.some1}> <div className={` ${classes.already}`}>You already have an acount?</div>
            <button className={classes.some} onClick={Login2}>Login</button></div>
            </div>
    </div>
  )
}
