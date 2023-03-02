import React from "react";
import { Button } from "@react-email/button";
import { useState } from "react";
import { useAuthContext } from "../../../../hooks/useAuthContext";
// import emailjs from "emailjs-com";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import classes from "./EmailSupport.module.css";

const EmailSupport = () => {
  const { user } = useAuthContext();
  const form = useRef();

  //   const [fullName, setFullName] = useState("");
  //   const [email, setEmail] = useState(user?.data?.email);
  //   const [subject, setSubject] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [message, setMessage] = useState("");

  const sendEmail = (e) => {
    // const body = {
    //     email: Value,
    //     lib_version: "3.2.0",
    //     service_id: "service_3daamtk",
    //     template_id: "template_bq1syrl",
    //     user_id: "i2kGvYenYjBFjYkX5",
    // }
    // let res = axios.post("https://api.emailjs.com/api/v1.0/email/send-form", body)
    // console.log(res)
    // setValue("")

    // const templateParams = {
    //   email,
    //   message,
    // };

    e.preventDefault();

    emailjs
      .sendForm(
        "service_r4smoii",
        "template_f8qpgwd",
        form.current,
        "Hb_orvhFgEF9ZF1h1"
      )
      .then(
        (result) => {
          if (result.text === "OK") {
            alert("Thank You", "Subscribed Successfully!", "success");
          }
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail} className={classes.emailWrap}>
      {/* <label>Name</label> */}
      <input type="text" name="user_name" />
      {/* <label>Email</label> */}
      <input type="email" name="user_email" />
      {/* <label>Message</label> */}
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};

export default EmailSupport;
