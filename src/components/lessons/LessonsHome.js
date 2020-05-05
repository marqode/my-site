import React, { useState, useEffect } from "react";
import LessonForm from "./LessonForm";
import { toast } from "react-toastify";
// import * as emailApi from "../../api/emailApi";

const LessonsHome = (props) => {
  const [email, setEmail] = useState({
    name: "",
    address: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  // useEffect(() => {
  //   setEmail(...props.email);
  // }, []);

  function handleChange(event) {
    // destructure on first line to avoid errors
    const { name, value } = event.target;
    setEmail((prevEmail) => ({
      ...prevEmail,
      [name]: value,
    }));
  }

  function formIsValid() {
    const { name, address, subject, message } = email;
    const errors = {};

    // map to props for each component in courseForm
    if (!name) errors.name = "Name is required.";
    if (!address) errors.address = "Email address is required";
    if (!subject) errors.subject = "Subject is required";
    if (!message) errors.message = "Message is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  function handleSend(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSending(true);
    sendEmail()
      .then(() => {
        debugger;
        toast.success("Course Saved");
        setSending(false);
      })
      .catch((error) => {
        setSending(false);
        setErrors({ onSave: error.message });
      });
  }

  // move to api file?
  function sendEmail() {
    return window.emailjs.send("gmail", "template_4UDckfCl", {
      message_html: email.message,
      from_name: email.name,
      reply_to: email.address,
      subject: email.subject,
    });
    // emailApi
    //   .sendEmail(email)
    //   //     .then(() => {
    //   //       toast.success("Email setn!");
    //   //       history.push("/courses");
    //   //     })
    //   .catch((error) => {
    //     throw error;
    //   })
  }

  return (
    <>
      <div className="jumbotron">
        <h2>Music Lessons</h2>
        <p>
          During the Covid pandemic and social distancing I am beginning to
          offer remote music lessons for aspriing pianists and guitar players.
          More content coming soon! Feel free to contact me if you have any
          questions.
        </p>
      </div>
      <LessonForm
        email={email}
        errors={errors}
        onChange={handleChange}
        onSave={handleSend}
        sending={sending}
      />
    </>
  );
};

export default LessonsHome;
