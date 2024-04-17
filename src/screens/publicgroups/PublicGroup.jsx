import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { groups } from "../../slices/groupsSlice";
import { useNavigate } from "react-router-dom";
const PublicGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const groupsList = useSelector(groups);
  const groupDetailsByid = groupsList[id];
  // console.log(id);
  const showMembersList = () => {
    navigate("/showmembers");
  };
  const showGroup = () => {};
  return (
    <div
      className="publicgroup-container"
      style={{
        display: "flex",
        gap: "20px",
        padding: "10px",
        flexDirection: "column",
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ textAlign: "center" }}>
        Join {groupDetailsByid.groupName} Public group
      </h2>
      <div
        style={{
          width: "60%",
          minWidth: "500px",
          alignSelf: "center",
          padding: "10px",
        }}
      >
        <img
          src={groupDetailsByid.imageUrl}
          alt="Join public group image"
          style={{
            width: "100%",
            height: "300px",
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
        <h4>{groupDetailsByid.groupTitle}</h4>
        <p>{groupDetailsByid.groupDescription}</p>
        <small>Active members: 100</small>

        <h4 style={{ marginTop: "20px" }}>Select Duration</h4>
        <form
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "6px",
          }}
        >
          <div>
            <label htmlFor="startDate">Start Date</label>
            <input type="date" id="startDate" name="startDate" />
          </div>
          <div>
            <label htmlFor="endDate">End Date</label>
            <input type="date" id="endDate" name="endDate" />
          </div>
        </form>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "6px",
          }}
        >
          <button
            style={{
              color: "black",
              backgroundColor: "white",
              padding: "6px 20px",
            }}
            onClick={showMembersList}
          >
            Member List
          </button>
          <button
            style={{
              color: "black",
              backgroundColor: "white",
              padding: "6px 20px",
            }}
            onClick={showGroup}
          >
            Join Group
          </button>
        </div>
        <p textAlign="center">
          Create a group{" "}
          <Link
            to="/creategroup"
            className={`nav-item ${
              location.pathname === "/creategroup" ? "active" : ""
            }`}
            style={{
              pointer: "cursor",
              color: "white",
            }}
          >
            <strong>here</strong>
          </Link>{" "}
          with your squad and stay fit together.
        </p>
      </div>
    </div>
  );
};

export default PublicGroup;
