import React from "react";
import classes from "./Contact.module.css";
import { Link } from "react-router-dom";
export default function Contact(props) {
  return (
    <div className={classes.container}>
      <div className={classes.name}>{props.contact.name}</div>
      {props.contact.email && (
        <div className={classes.box}>
          <div>{`${props.contact.email} `}</div>
          <div>email</div>
        </div>
      )}
      {props.contact.phone && (
        <div className={classes.box}>
          <div>{`${props.contact.phone}`}</div> <div>phone</div>
        </div>
      )}
      <Link className={classes.add} to={`/contact/${props.contact._id}`}>View</Link>
    </div>
  );
}
