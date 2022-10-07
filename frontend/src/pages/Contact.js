import React from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getContact,
  reset,
  updateContact,
} from "../features/contacts/contactSlice";
import Modal from "./subsets/Modal";
import classes from "./Contact.module.css";
export default function Contact() {
  const dispatch = useDispatch();

  const { contactId } = useParams();
  const [contract, setContact] = useState({});
  const [fake, setFake] = useState(true);
  const { contact } = useSelector((state) => state.contact);
const [open,setOpen]=useState(false)
  useEffect(() => {
    dispatch(getContact(contactId));
  }, [dispatch, contact, contactId]);
  const onChange = (e) => {
    setContact((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  if (contact.message) {
    return (
      <div>
        <div>Page not found</div>
        <Link
          to="/contacts"
          onClick={() => {
            dispatch(reset());
          }}
        >
          back
        </Link>
      </div>
    );
  }
  const Deletus = (e) => {
   setOpen(true)
  };
  return (
    <div className={classes.container}>
      {contact.name && fake && <div className={classes.name}>{contact.name}</div>}
      {contact.email && fake && <div className={`${classes.box} ${classes.contact}`}><div>{`${contact.email}`}</div><div> email</div></div>}
      {contact.phone && fake && <div className={`${classes.box} ${classes.contact}`}><div>{`${contact.phone}`} </div><div>phone</div></div>}
      {!fake && (
        <input
          value={contract.name}
          onChange={onChange}
          name="name"
          placeholder="Enter your name"
          className={classes.box}
          required
        />
      )}
      {!fake && (
        <input
          value={contract.email}
          onChange={onChange}
          name="email"
          placeholder="Enter your email"
          className={classes.box}
        />
      )}
      {!fake && (
        <input
          value={contract.phone}
          onChange={onChange}
          name="phone"
          placeholder="Enter your phone"
          className={classes.box}
        />
      )}
      <div className={`${classes.box} ${classes.options}`}>
      <button
        onClick={() => {
          setContact(contact);
          setFake(!fake);
        }}
      >
        {fake ? `Edit` : `Cancel`}
      </button>
      {!fake && (
        <button
          onClick={() => {
            dispatch(updateContact(contract));
            setFake(!fake);
          }}
        >
          Confirm
        </button>
      )}
      {fake && <button onClick={Deletus}>Delete</button>}
      {open && <Modal setOpen={setOpen}/>}
      </div>
      <Link className={classes.go}
        to="/contacts"
        onClick={() => {
          dispatch(reset());
        }}
      >
        back
      </Link>
    </div>
  );
}
