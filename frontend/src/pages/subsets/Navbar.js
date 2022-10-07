import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout} from '../../features/auth/authSlice'
import { reset } from '../../features/contacts/contactSlice'
import classes from './Navbar.module.css'
export default function Navbar() {
    const logout2=()=>{
        dispatch(reset())
        dispatch(logout())
    }
    const dispatch=useDispatch()
    const navigate=useNavigate()
    return (
    <div className={classes.navbar}>
        <button onClick={()=>{navigate('/home')}}>home</button>
        <button onClick={()=>{navigate('/contacts')}}>Contact list</button>
        <button onClick={logout2}>Logout</button>
    </div>
  )
}
