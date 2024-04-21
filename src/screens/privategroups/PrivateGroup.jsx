import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { login, logout, updateUser } from "../../slices/authSlice";
import axios from "axios";
import SearchUser from "../../components/SearchUser/SearchUser";
import ChallengeBoxPrivateGroup from "../../components/challengeBoxPrivGroup/ChallengeBoxPrivateGroup";
const API_URL = import.meta.env.VITE_API_URL;
import Loading from "../../components/loading/Loading.jsx";
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
  const [alreadyMember, setAlreadyMember] = useState(false);
  //   const [isGroupUpdated, setIsGroupUpdated] = useState(false);

  const handleGetAllData = async () => {
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
  };

  // useEffect(() => {
  //     if (!id) {
  //         history('/');
  //     }
  //     handleGetAllData();
  // }, []);

  useEffect(() => {
    if (!id) {
      history("/");
    }
    handleGetAllData();
    const checkMemberExists = async (userId, groupMembers) => {
      let resultArray = groupMembers.map((member) => member._id === userId);
      if (resultArray) {
        setAlreadyMember(true);
      } else {
        setAlreadyMember(false);
      }
    };

    checkMemberExists(user.id, groupMembers);
  }, [isLoading]);

  const handleShowMembers = () => {
    history(`/privategroup/${id}/members`);
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

  const addUserToGroupAPI = async () => {
    try {
      const token = localStorage.getItem("token");
      // api request and then set the other values to initial values
      const API_URL = import.meta.env.VITE_API_URL;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const body = { users: [user.id] };

      const { data } = await axios.post(
        `${API_URL}/groups/${id}/members`,
        body,
        config
      );
      console.log("data: dshjebjervhrhr  ", data);
      if (data) {
        // console.log("1", selectedUsers, groupMembers);
        setGroupMembers(data.data.users);

        // console.log('2', selectedUsers, groupMembers);
        // // setSelectedUsers([]);

        // console.log('3', selectedUsers, groupMembers);

        toast.success("Added to the group successfully!");
        setAlreadyMember(true);
      } else {
        toast.error("Something went wrong, please try again later");
      }
      // handleReset();
      // navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          padding: "15vh",
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
        }}
      >
        <Loading />
      </div>
    );
  }

  if (!alreadyMember) {
    return (
      <div
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
        <button
          onClick={addUserToGroupAPI}
          style={{
            backgroundColor: "green",
            padding: "4px 10px",
            borderRadius: "10px",
          }}
        >
          Join
        </button>
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
            flexWrap: "wrap",
            padding: "0 2vw",
            height: "90vh",
            // border: "2px solid white",
          }}
        >
          <div
            className="right-side"
            style={{
              height: "90vh",
              minWidth: "350px",
              width: "54%",
              padding: "24px",
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
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  padding: "6px 30px",
                  gap: "10px",
                }}
              >
                <button
                  className="view-members-btn"
                  onClick={handleShowMembers}
                  style={{
                    padding: "6px 12px",
                    minWidth: "200px",
                    width: "40%",
                    borderRadius: "10px",
                    backgroundColor: "lightgrey",
                  }}
                >
                  <strong>See Members</strong>
                </button>
                <button
                  className="add-member-btn"
                  onClick={handleAddMember}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "10px",
                    width: "40%",
                    minWidth: "200px",

                    backgroundColor: "lightgrey",
                  }}
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
                      border: "2px solid gold",
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
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
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
                  style={{
                    padding: "2px 10px",
                    backgroundColor: "green",
                    borderRadius: "10px",
                  }}
                >
                  {" "}
                  <strong> Create Challenge + </strong>
                </button>
              </h1>
            ) : (
              <p></p>
            )}

            <div className="box invite-friends">
              <h2>Invite Friends</h2>
              <input
                type="email"
                placeholder="Enter friend's email: friend@example.com"
                style={{
                  fontWeight: "bold",
                  width: "70%",
                  minWidth: "300px",
                  margin: "auto",
                  borderRadius: "0.6rem",
                  padding: "4px 8px",
                }}
              />
              <button
                className="send-invite-btn"
                style={{
                  borderRadius: "10px",
                  padding: "4px 8px",
                  margin: "auto",
                }}
              >
                <strong>Send Invite</strong>
              </button>
            </div>
          </div>
          {/* {!showCalender && <SampleCalendar />} */}
          {showCalender && (
            <ChallengeBoxPrivateGroup
              showCalender={showCalender}
              challenges={challenges}
              setChallenges={setChallenges}
              id={id}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default PrivateGroup;
