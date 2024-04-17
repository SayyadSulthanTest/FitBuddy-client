import React, { useState } from "react";
import TeamSlider from "../ourteam/TeamSlider";

const Footer = () => {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const contactSubmitHandler = () => {};
  return (
    <footer style={{ backgroundColor: "inherit" }}>
      {/* <TeamSlider /> */}

      {/* <section id="ourteam-container" style={{ padding: '50px' }}>
                <TeamSlider />
            </section> */}
      <section
        id="contactus-container"
        style={{
          width: "100%",
          // margin: "auto",
          padding: "0 10vw",
          backgroundColor: "black",
          // height: "60vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <form
            onSubmit={contactSubmitHandler}
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "55%",
              paddingBottom: "60px",
            }}
          >
            <h2
              style={{
                fontSize: "34px",
                // backgroundClip: "text",
                color: "pink",
                // WebkitBackgroundClip: "text",
                // backgroundImage:
                //   "linear-gradient(to bottom, #927E13,#70E916,#FFDB17)",
              }}
            >
              Contact Us
            </h2>
            <input
              type="text"
              placeholder="Name"
              name="contactName"
              id="contactName"
              value={contactName}
              required
              style={{
                padding: "4px 10px",
                backgroundColor: "black",
                color: "pink",
                fontSize: "20px",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                borderBottom: "3px solid pink",
                outline: "none",
              }}
              onChange={(e) => setContactName(e.target.value)}
            />
            <input
              type="gmail"
              placeholder="Email"
              name="contactEmail"
              id="contactEmail"
              value={contactEmail}
              required
              style={{
                padding: "4px 10px",
                backgroundColor: "black",
                color: "pink",
                fontSize: "20px",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                borderBottom: "3px solid pink",
                outline: "none",
              }}
              onChange={(e) => setContactEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Subject"
              name="contactSubject"
              id="contactSubject"
              value={contactSubject}
              required
              style={{
                padding: "4px 10px",
                backgroundColor: "black",
                color: "pink",
                fontSize: "20px",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                borderBottom: "3px solid pink",
                outline: "none",
              }}
              onChange={(e) => setContactSubject(e.target.value)}
            />
            <textarea
              name="contactMessage"
              id="contactMessage"
              cols="16"
              rows="10"
              placeholder="Message"
              value={contactMessage}
              style={{
                padding: "4px 10px",
                backgroundColor: "black",
                color: "pink",
                fontSize: "20px",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                borderBottom: "3px solid pink",
                // outline: "none",
              }}
              onChange={(e) => setContactMessage(e.target.value)}
            ></textarea>

            <button
              type="submit"
              style={{
                backgroundColor: "pink",
                padding: "4px 30px",
                color: "black",
                fontWeight: "bold",
                justifySelf: "flex-end",
                margin: "auto",
                border: "none",
                borderRadius: "10px",
              }}
            >
              Submit
            </button>
          </form>
          <div style={{ width: "35%" }}>
            <img
              src="/Assets/Images/contactUsImage.png"
              alt="contactUs"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
