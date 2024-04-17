import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { login, logout, updateUser } from "../../slices/authSlice";
import axios from "axios";
import SearchUser from "../../components/SearchUser/SearchUser";
import ChallengeBoxPrivateGroup from "../../components/challengeBoxPrivGroup/ChallengeBoxPrivateGroup";
const API_URL = import.meta.env.VITE_API_URL;

const PrivateGroup = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showCalender, setShowCalender] = useState(false);
  const [showSearchUser, setShowSearchUser] = useState(false);
  const { id } = useParams();
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [groupMembers, setGroupMembers] = useState([]);
  const [groupData, setGroupData] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [searchableUsers, setSearchableUsers] = useState([]);
  //   const [isGroupUpdated, setIsGroupUpdated] = useState(false);

  useEffect(() => {
    if (!id) {
      history("/");
    }

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      axios
        .get(`${API_URL}/groups/${id}`, config)
        .then(({ data }) => {
          setGroupData(data.data);
          if (data.data && data.data.users) {
            console.log("Fetching group members from the API");
            setGroupMembers(data.data.users);
          }
        })
        .then(() =>
          axios.get(`${API_URL}/challenges/${id}`, config).then((res) => {
            if (res.data.data.length > 0) {
              setShowCalender(true);
              setChallenges(res.data.data);
            }
            setIsLoading(false);
          })
        );

      axios
        .get(`${API_URL}/user`, config)
        .then((res) => {
          setSearchableUsers(
            filterUsersNotInArray(res.data.data, groupMembers)
          );
        })
        .catch((err) => console.log("Error in getting all users :", err));
    } catch (err) {
      console.log("err in private group: ", err);
      alert("something went wrong...");
      setIsLoading(false);
      history("/");
    }
  }, []);
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   try {
  //     axios
  //       .get(`${API_URL}/groups/${id}`, config)
  //       .then(({ data }) => {
  //         setGroupData(data.data);
  //         if (data.data && data.data.users) {
  //           console.log("Fetching group members from the API");
  //           setGroupMembers(data.data.users);
  //         }
  //       })
  //       .then(() =>
  //         axios.get(`${API_URL}/challenges/${id}`, config).then((res) => {
  //           if (res.data.data.length > 0) {
  //             setShowCalender(true);
  //             setChallenges(res.data.data);
  //           }
  //           setIsLoading(false);
  //         })
  //       );

  //     axios
  //       .get(`${API_URL}/user`, config)
  //       .then((res) => {
  //         setSearchableUsers(
  //           filterUsersNotInArray(res.data.data, groupMembers)
  //         );
  //       })
  //       .catch((err) => console.log("Error in getting all users :", err));
  //   } catch (err) {
  //     console.log("err in private group: ", err);
  //     alert("something went wrong...");
  //     setIsLoading(false);
  //     history("/");
  //   }
  // }, [groupMembers]);
  //   useEffect(() => {
  //     setIsGroupUpdated(false);
  //   }, [isGroupUpdated]);

  const handleShowMembers = () => {
    history(`/joinprivategroup/${id}/showmembers`);
  };

  const handleAddMember = () => {
    setShowSearchUser(!showSearchUser);
  };

  const handleCloseAddMember = () => {
    setShowSearchUser(false);
  };

  function filterUsersNotInArray(users1, users2) {
    const userMap = {};
    users2.forEach((user) => {
      userMap[user._id] = true;
    });

    return users1.filter((user) => !userMap[user._id]);
  }

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          padding: "15vh",
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
        }}
      >
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div
      className="privategroup-container"
      style={{
        minHeight: "100vh",
        paddingTop: "7vh",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <main>
        <div
          className="top-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 2vw",
            height: "90vh",
            // border: "2px solid white",
          }}
        >
          {showCalender && (
            <ChallengeBoxPrivateGroup
              showCalender={showCalender}
              challenges={challenges}
              setChallenges={setChallenges}
              id={id}
            />
          )}
          <div
            className="right-side"
            style={{
              height: "90vh",
              width: showCalender ? "54%" : "80%",
              padding: showCalender ? "24px 24px 24px 5px" : "24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "auto",
              gap: "4vh",
              justifyContent: "space-around",
              // border: "2px solid white",
            }}
          >
            <div
              className="box exercise-details"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                alignItems: "center",
                height: "50%",
              }}
            >
              <h2>{groupData && groupData.name}</h2>
              <img
                src={groupData.icon}
                alt="Exercise Image"
                style={{ maxWidth: "100%", maxHeight: "65%" }}
              />
              <p>{groupData.description}</p>
              <p>Members Joined: {groupMembers.length}</p>
              <div
                style={{ display: "flex", padding: "6px 30px", gap: "60px" }}
              >
                <button
                  className="view-members-btn"
                  onClick={handleShowMembers}
                  style={{ padding: "8px 20px" }}
                >
                  <strong>See Members</strong>
                </button>
                <button
                  className="add-member-btn"
                  onClick={handleAddMember}
                  style={{ padding: "8px 20px" }}
                >
                  <strong>Add Members</strong>
                </button>
              </div>
              {showSearchUser && (
                <div className="modal-overlay">
                  <div
                    className="modal"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      position: "absolute",
                      top: "50vh",
                      left: "50vw",
                      right: "0",
                      height: "50vh",
                      minWidth: "70vw",
                      backgroundColor: "black",
                      color: "white",
                      // border: "8px solid white",
                      transform: "translate(-50%, -50%)",
                      zIndex: 10,
                    }}
                  >
                    <button
                      className="close-modal-btn"
                      style={{
                        alignSelf: "flex-end",
                        backgroundColor: "red",
                        fontWeight: "bold",
                        padding: "6px 12px",
                      }}
                      onClick={handleCloseAddMember}
                    >
                      X
                    </button>
                    <SearchUser
                      //   isGroupUpdated={isGroupUpdated}
                      //   setIsGroupUpdated={setIsGroupUpdated}
                      users={searchableUsers}
                      groupMembers={groupMembers}
                      setGroupMembers={setGroupMembers}
                      handleCloseAddMember={handleCloseAddMember}
                      id={id}
                    />
                  </div>
                </div>
              )}
            </div>

            {challenges.length === 0 ? (
              <h1>
                <button
                  onClick={() => history(`/groups/${id}/createchallenge`)}
                  style={{ padding: "2px 10px", backgroundColor: "green" }}
                >
                  {" "}
                  <strong> Create Challenge + </strong>
                </button>
              </h1>
            ) : (
              <p></p>
            )}

            <div className="box invite-friends" style={{ width: "50%" }}>
              <h2>Invite Friends</h2>
              <input
                type="email"
                placeholder="Enter friend's email: friend@example.com"
                style={{ fontWeight: "bold", width: "70%" }}
              />
              <button className="send-invite-btn">
                <strong>Send Invite</strong>
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer>{/* Footer content  */}</footer>
    </div>
  );
};

export default PrivateGroup;
