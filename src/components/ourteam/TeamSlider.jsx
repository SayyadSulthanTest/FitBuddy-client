import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import teamMembers from "./teamMembers";
import "./TeamSlider.css";

const TeamSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="team-heading">
      <h2 style={{ color: "#EC8686", fontSize: "40px", padding: "50px 0" }}>
        Our Team
      </h2>
      <Slider {...settings}>
        {teamMembers.map((member) => (
          <div key={member.id} className="member-box">
            <img src={member.image} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <p>{member.content}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TeamSlider;
