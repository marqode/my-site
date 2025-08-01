import React, { useState } from "react";
import LessonForm from "./LessonForm";
import { toast } from "react-toastify";

const LessonsHome = () => {
  const [email, setEmail] = useState({
    name: "",
    address: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setEmail((prevEmail) => ({
      ...prevEmail,
      [name]: value,
    }));
  }

  function formIsValid() {
    const { name, address, subject, message } = email;
    const errors = {};

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

  function sendEmail() {
    return window.emailjs.send("service_04vsooc", "template_ac05gli", {
      message: email.message,
      name: email.name,
      email: email.address,
      subject: email.subject,
    });
  }

  return (
    <>
      <div className="jumbotron">
        <h2>Online Tutoring</h2>
        <p>
          {"I'm"} excited to offer online tutoring to aspiring computer scientists of all ages! I have a decade of experience teaching coding to learners of all ages, including university-level Web Development and Machine Learning. Check out the <a href={'/research'}>KTBYTE Student Research Projects</a> to see work from some of my former students.
        </p>

        <p>Tutoring available for the following skills:</p>
        <ul>
          <li>Java: processing.org and backend web development</li>
          <li>Python: NumPy, Pandas, scikit-learn</li>
          <li>Machine Learning: Tensorflow, Keras, PyTorch</li>
          <li>Fullstack Web Development: React, Typescript, SQL, PostgresSQL, Webpack, Node.js</li>
        </ul>

        <p>Sliding scale pricing available. Fill out contact form below for more details.</p>
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
