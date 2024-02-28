import React, { memo, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import images from "../../constants/image";
import Footer from "../../components/footer/Footer";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Store from "./Store";
import Contact from "./Contact";

const Home = memo(() => {
  return (
    <main>
      {/* INTRO */}
      <section className="hero is-primary" id="">
        <Navbar />
        <div className="header-container">
          <div className="banner">
            <img src={images.IntroBanner} alt="" />
            <div className="backdrop"></div>
          </div>
          <div className="onCard">
            <h1 className="headingIntro">Making Payment An Ease</h1>
            <p>
              Experience seamless access to Visa and Mastercard with just a
              click! Our premium service caters to clients seeking top-tier
              credit cards. Unlock a world of convenience and financial freedom
              effortlessly.
            </p>
            <button>Request For Premium</button>
          </div>
        </div>
      </section>
      {/* INTRO */}

      <Store />

      {/* CONTACT US */}
      <Contact />
      {/* CONTACT US */}

      <section id="support">
        <div
          style={{ marginBottom: "3rem", marginTop: "-5.5rem" }}
          className="header-container"
        >
          <div className="banner">
            <img src={images.ContactBanner} alt="" />
            <div className="backdrop"></div>
          </div>
          <div className="onCard">
            <h1 className="headingIntro">Support Center</h1>
            <p style={{ textAlign: "center" }}>
              Our Expertize team will{" "}
              <span style={{ color: "var(--link-color)" }}>Reach to you </span>{" "}
              for all your card services. You can send us an email if you need
              any assistance.
            </p>
          </div>
        </div>
        <div id="contactInfoMain" className="info-contain">
          <div className="icons-list" style={{ marginInline: "auto" }}>
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
            <p>
              <span>
                <MdEmail />
              </span>
              <span>info@expresscc.shop</span>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
});

export default Home;
