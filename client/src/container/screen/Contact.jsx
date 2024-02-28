import React, { useState } from "react";
import images from "../../constants/image";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import axios from "axios";

const Contact = () => {
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fullName == "" || emailAddress == "" || phoneNumber == "") {
      alert("All fields are required");
      return false;
    }
    try {
      const res = await axios.post(
        "http://localhost:6158/express/contactInfo",
        {
          message,
          fullName,
          phoneNumber,
          emailAddress,
        }
      );
      setMessage("");
      setFullName("");
      setPhoneNumber("");
      setFullName("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id="contact" style={{ paddingBottom: "4rem" }}>
      {/* <h2>Contact Us:</h2> */}
      <div
        style={{ marginBottom: "3rem", marginTop: "-5rem" }}
        className="header-container"
      >
        <div className="banner">
          <img src={images.ContactBanner} alt="" />
          <div className="backdrop"></div>
        </div>
        <div className="onCard">
          <h1 className="headingIntro">Contact Us</h1>
          <p style={{ textAlign: "center" }}>
            <span style={{ color: "var(--link-color)" }}>Reach to us </span> on
            our working days. Our team of expert will attend to you
          </p>
        </div>
      </div>

      <div id="contactInfoMain" className="info-contain">
        <div className="contact-left">
          <h2>
            Get In <span style={{ color: "var(--link-color)" }}>Touch</span>
          </h2>

          <p className="info-p-contact">
            Fill out the forms to get in touch with Express Credit Card Shop.
          </p>

          <div className="icons-list">
            <p>
              <span>
                <MdOutlinePhoneInTalk />
              </span>
              <span>0500933711</span>
            </p>
            <p>
              <span>
                <FaLocationArrow />
              </span>
              <span>Accra, Ghana</span>
            </p>
          </div>
        </div>

        <div className="contact-right">
          <form onSubmit={handleSubmit}>
            <div className="flex-input">
              <div className="input-field">
                <label htmlFor="name">
                  Full Name<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <input
                  type="text"
                  placeholder="eg: John Doe"
                  id="name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="input-field">
                <label htmlFor="emailAddress">
                  Email Address<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <input
                  type="email"
                  placeholder="eg: John Doe"
                  id="emailAddress"
                  required
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="input-field">
              <label htmlFor="contactInput">
                Contact<span style={{ color: "red" }}>*</span>{" "}
              </label>
              <input
                type="tel"
                placeholder="eg: 0230314673"
                id="contactInput"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <textarea
              placeholder="Write message"
              id="textarea"
              className="textarea-contact"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button
              type="button"
              className="contact-btn"
              onClick={handleSubmit}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
