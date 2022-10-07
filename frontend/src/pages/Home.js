import React from 'react'
import Navbar from './subsets/Navbar'
import classes from './Home.module.css'
export default function Home() {
  return (
      <div  className={classes.background}>
        <Navbar/>
        <div className={classes.container}>Hello and welcome to my page!</div>
    </div>
  )
}
