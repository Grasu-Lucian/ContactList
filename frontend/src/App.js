import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import { Fragment } from "react";
import PrivateRoute from "./component/PrivateRoute";
import Logout from "./pages/Logout";
import Login from "./pages/Login";
import ContactList from "./pages/ContactList";
import Contact from "./pages/Contact";
function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/home" element={<PrivateRoute/>} >
          <Route path="/home" element={<Home />} />
            </Route>
            <Route path="/contacts" element={<PrivateRoute/>} >
          <Route path="/contacts" element={<ContactList />} />
            </Route>
            <Route path="/logout" element={<PrivateRoute/>} >
          <Route path="/logout" element={<Logout />} />
            </Route>
            <Route path="/contact/:contactId" element={<PrivateRoute />} >
              <Route path='/contact/:contactId' element={<Contact/>}/>
              </Route>
            <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Register/>}/>
        </Routes>
      </Router>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
