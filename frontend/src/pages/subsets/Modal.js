import { Fragment, useState } from "react";
import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteContact, reset } from "../../features/contacts/contactSlice";
import { useParams } from "react-router-dom";
export default function Modal(props) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <NextModal setOpen={props.setOpen} />,
        document.getElementById("backdrop-root")
      )}

      {ReactDOM.createPortal(
        <Background />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
}
const NextModal = (props) => {
  const { contactId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Deletus = () => {
    dispatch(deleteContact(contactId));
    dispatch(reset());
    navigate("/home");
  };

  return (
    <div className={classes.container}>
      <div className={classes.text}>You sure mate?</div>
      <div className={classes.box}>
        
        <button
          className={classes.options}
          onClick={() => {
            props.setOpen(false);
          }}
        >
          No
        </button>
        <button className={classes.options} onClick={Deletus}>
          Yes
        </button>
      </div>
    </div>
  );
};
const Background = () => {
  return <div className={classes.background}></div>;
};
