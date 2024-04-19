import React, { useEffect, useState } from "react";
import "./privategropmember.css";

import { useParams, useNavigate } from "react-router-dom";
import axois from "axios";
import Loading from "../../components/loading/Loading.jsx";
const API_URL = import.meta.env.VITE_API_URL;
const GroupPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const goBack = () => {
    navigate(-1);
  };
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    setLoading(true);
    console.log("Inside usueEffect of Member List");
    if (!id) {
      history("/");
      return;
    }

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    axois
      .get(`${API_URL}/groups/${id}/members`, config)
      .then((res) => {
        // console.log('from members page: ', res.data);
        setMembers(res.data.data);
        setLoading(false);
      })
      .catch((err) => {});
  }, []);

  const getRandomColor = () => {
    let r = Math.floor(Math.random() * 151) + 50;
    let g = Math.floor(Math.random() * 151) + 50;
    let b = Math.floor(Math.random() * 151) + 50;
    const color = `rgb(${r}, ${g}, ${b})`;
    return color;
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div
      style={{
        paddingTop: "13vh",
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <h2>Private Member List</h2>
      <div
        className="member-list"
        id="memberList"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {members.map((member, index) => (
          <div
            className="member-profile"
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "auto",
              minWidth: "27%",
              alignItems: "center",
              padding: "6px 26px 6px 12px",
              marginTop: "2vh",
              backgroundColor: getRandomColor(),
              borderRadius: "100px 0 0 100px",
            }}
          >
            <img
              src="/Assets/Images/userProfilePic.png"
              alt={`${member.name}`}
              style={{ height: "80px" }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <p>{member.name}</p>
              <p>{member.bio ? member.bio : " Foo"}</p>
            </div>
          </div>
        ))}
      </div>

      <p style={{ textAlign: "center" }}>
        <button
          onClick={goBack}
          style={{
            padding: "6px 16px",
            margin: "auto",
            backgroundColor: "lightgray",
            fontWeight: "bold",
          }}
        >
          Go Back
        </button>
      </p>
    </div>
  );
};

export default GroupPage;
