import React from "react";
import Navbar from "./subsets/Navbar";
import classes from "./ContactList.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  createContact,
  reset,
  getContacts,
} from "../features/contacts/contactSlice";
import Contact from "./subsets/Contact";
import Spinner from "../component/Spinner";
export default function ContactList() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const { user } = useSelector((state) => state.auth);
  const { contacts, isError, message, isLoading } = useSelector(
    (state) => state.contact
  );
  const { name, email, phone } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit =async () => {
   if (name) {
   await  dispatch(createContact({ name, email, phone, user }));

      
       await dispatch(reset());
        await window.location.reload();
      
    } else {
      toast.error("You need a name");
    }
  };
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getContacts());
  }, [dispatch]);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className={classes.background}>
      <Navbar />
      <div className={classes.container}>
        <div className={classes.title}>Add new Contact</div>
        <input
          type="text"
          id="name"
          value={name}
          onChange={onChange}
          name="name"
          placeholder="Enter your contact's name"
          className={classes.box}
          required
        />
        <input
          type="text"
          id="email"
          name="email"
          onChange={onChange}
          value={email}
          placeholder="Email(optional)"
          className={classes.box}
          required
        />
        <input
          type="text"
          id="phone"
          name="phone"
          value={phone}
          onChange={onChange}
          placeholder="Phone(optional)"
          className={classes.box}
          required
        />
        <button className={classes.add} onClick={onSubmit}>
          Add
        </button>
      </div>
      <div className={classes.list}>
        {contacts.map((contact, anc) => (
          <Contact key={anc} contact={contact} />
        ))}
      </div>
    </div>
  );
}
