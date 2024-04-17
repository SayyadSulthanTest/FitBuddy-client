import React, { useEffect, useState } from "react";
import "./privategropmember.css"; // Import your CSS file

import { useParams, useNavigate } from "react-router-dom";
import axois from "axios";
import { display, fontWeight } from "@mui/system";
import { Bluetooth } from "@mui/icons-material";

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
    // alert(window.location.href);
    if (!id) {
      history("/");
      return;
    }
    // console.log('history: ', myHistory);
    // console.log(previousLocationPathname);

    const token = localStorage.getItem("token");
    // const deceded = jwtDecode(token);
    // dispatch(updateUser(deceded));
    // dispatch(login());
    // api request and then set the other values to initial values
    // console.log(token);
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
    return <h1>Loading...</h1>;
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
          // <div>
          <div
            className="member-profile"
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "auto",
              minWidth: "27%",
              alignItems: "center",
              // gap: "50px",
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
            {/* <div
                            className={`status-line ${
                                member.status === 'Online' ? 'status-online' : 'status-offline'
                            }`}
                        >
                            ${member.status}
                        </div> */}
          </div>
          // </div>
        ))}
      </div>
      {/* Header */}
      {/* <header>
                <div className="profile-info">
                    
                    <span>User Name</span>
                    
                    <button>Logout</button>
                </div>
            </header> */}

      {/* Member List */}
      {/* <div className="member-list" id="memberList">
                <h2>Private Member List</h2>
            </div> */}
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
