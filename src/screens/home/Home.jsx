import React, { useState } from "react";
import "./Home.css";
import { useRef, useEffect } from "react";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { groups } from "../../slices/groupsSlice";
import { goals } from "../../slices/goalsSlice";
import GroupItem from "../../components/groupitem/GroupItem";
import GoalItem from "../../components/goalItem/GoalItem";
import Footer from "../../components/footer/Footer";
import GroupBox from "../../components/groupbox/GroupBox.jsx";
import axios from "axios";
import TeamSlider from "../../components/ourteam/TeamSlider.jsx";
import { useNavigate } from "react-router-dom";
import { addPrivateGroup } from "../../slices/groupsSlice";
import { useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import UploadImage from "../../components/UploadImage.jsx";
const API_URL = import.meta.env.VITE_API_URL;

const ExploreButton = () => {
  const handleExploreClick = () => {
    // Scroll to the target section groups
    const targetSection = document.getElementByid("publicprivategroupnav");
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <IconButton
      aria-label="explore"
      color="primary"
      onClick={handleExploreClick}
      sx={{
        color: "#f542c5",
        border: "2px solid white",
        padding: "8px 20px",
        borderRadius: "20px",
        transition: "box-shadow 0.1s",
        "&:hover": {
          boxShadow: "0px 3px 6px rgba(255, 255, 255, 0.5)",
        },
      }}
    >
      Explore
      <KeyboardArrowDownIcon />
    </IconButton>
  );
};

const Home = () => {
  const groupsList = useSelector(groups);
  const goalsList = useSelector(goals);
  const user = useSelector((state) => state.auth);
  const [privateGroups, setPrivateGroups] = useState([]);
  const [loadingGroup, setLoadingGroup] = useState(false);
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getPrivateGroups();
  }, []);

  useEffect(() => {
    getPrivateGroups();
  }, [user.isLoggedIn]);

  const getPrivateGroups = async () => {
    setLoadingGroup(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    };
    try {
      const { data } = await axios.get(`${API_URL}/groups/private`, config);
      console.log("data: ", data);
      setPrivateGroups(data.data);
      dispatch(addPrivateGroup(data.data));
      setLoadingGroup(false);
    } catch (err) {
      console.log("error: ", err);
      setLoadingGroup(false);
    }
  };
  // console.log(groupsList);

  const handleNavigatePrivateGroup = (id) => {
    console.log(id);
    if (!id) {
      console.log(" group id required!!");
      return;
    }

    history(`/joinprivategroup/${id}`);
  };

  return (
    <div
      id="homepage-container"
      className="homepage-container"
      style={{ color: "white", paddingTop: "10vh" }}
    >
      {/* <UploadImage /> */}
      {/* <section
        id="landingpage-banner"
        style={{
          padding: "4vh",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
          justifyContent: "space-around",
          minHeight: "90vh",
        }}
      >
        {/* <video autoplay muted loop id="video-bg">
          <source
            src="https://videos.pexels.com/video-files/5593047/5593047-sd_640_360_24fps.mp4"
            type="video/mp4"
          />
        </video> */}
      {/* <img
          src="/Assets/Images/websiteLogoHome.jpg"
          alt="websitelogo"
          style={{ width: "300px" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            fontSize: "62px",
            lineHeight: "72.66px",
            justifyContent: "flex-start",
            paddingTop: "5vh",
            alignItems: "center",
            fontFamily: "Roboto",
            fontWeight: "bold",
            flexGrow: 1,
          }}
        >
          <p>Achieve your fitness</p>
          <p>goals and boost your</p>
          <p>well-being</p>
        </div>
      </section> */}

      {!user.isLoggedIn && (
        <section
          id="aboutus-container"
          style={{
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
            padding: "20px",
            minHeight: "40vh",
          }}
        >
          <div
            style={{
              backgroundClip: "text",
              color: "transparent",
              WebkitBackgroundClip: "text",
              marginBottom: "20px",
              textAlign: "center",
              backgroundImage:
                "linear-gradient(to bottom, #927E13,#70E916,#FFDB17)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "justify",
                gap: "2px",
              }}
            >
              <h1
                style={{
                  fontSize: "50px",
                  lineHeight: "42px",
                  margin: "0px",
                  padding: "0px",
                }}
              >
                We at
              </h1>
              <h1
                style={{
                  fontSize: "130px",
                  lineHeight: "104px",
                  margin: "0px",
                  padding: "0px",
                }}
              >
                FIT
              </h1>
            </div>
            <h1 style={{ fontSize: "200px" }}>BUDDY</h1>
          </div>
          <h1 style={{ fontSize: "62px", textAlign: "center" }}>
            {/* <strong>
              Accountability is the key to progress, and we help you stay
              connected with your buddies in your fitness journey
            </strong> */}
            <p>Monitor fitness journey through groups, set</p>{" "}
            <p>challenges, and invite friends for </p>{" "}
            <p>personalized motivation</p>
          </h1>
        </section>
      )}
      {user.isLoggedIn && (
        <>
          <h1 style={{ textAlign: "center" }}>
            Welcome to fitbuddy, <em>{user?.name}</em>{" "}
          </h1>
          {/* <p>{Add some api to fetch fitness quotes to display after user login }</p> */}
          <h2 style={{ textAlign: "center" }}>
            Groups : {privateGroups.length}
          </h2>
          <Box
            width="100vw"
            my={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={4}
            p={2}
            sx={{ flexWrap: "wrap" }}
          >
            {loadingGroup && <p>Loading... Group Data...</p>}
            {privateGroups.map((group, index) => (
              <Box
                key={index}
                className="groupitem-container"
                width="20vw"
                minWidth="250px"
                minHeight="250px"
                maxHeight="30vh"
                display="flex"
                alignItems="center"
                gap={4}
                // bgcolor={"white"}
                color={"black"}
                sx={{
                  flexDirection: "column",
                  borderRadius: "20px",
                  justifyContent: "space-between",
                  position: "relative", // Ensure the overlay is positioned relative to the box
                  overflow: "hidden", // Hide overflow to ensure the video is contained within the box
                }}
              >
                {/* Video */}
                <img
                  // src={group.icon}
                  src={group.icon}
                  autoPlay
                  loop
                  muted
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "brightness(80%)", // Adjust brightness to 50%
                    zIndex: 1, // Ensure the video is behind the content
                  }}
                ></img>

                {/* Content */}
                <div
                  style={{
                    position: "relative", // Ensure content is positioned relative to the box
                    width: "20vw",
                    minWidth: "250px",
                    minHeight: "250px",
                    maxHeight: "30vh",
                    zIndex: 2, // Ensure content is above the video
                    textAlign: "center",
                    color: "black", // Set text color
                    // color: 'white', // Set text color
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",

                    padding: "8px 4px",
                    height: "100%",
                  }}
                >
                  <h2>{group.name}</h2>
                  <button
                    onClick={() => handleNavigatePrivateGroup(group._id)}
                    style={{
                      padding: "3px 20px",
                      alignSelf: "center",
                      border: "2px solid white",
                      backgroundColor: "black",
                      color: "white",
                      borderRadius: "20px",
                      transition: "box-shadow 0.1s",
                      "&:hover": {
                        boxShadow: "0px 3px 6px rgba(255, 255, 255, 0.5)",
                      },
                    }}
                  >
                    <strong>Explore</strong>
                  </button>
                </div>
              </Box>
            ))}
          </Box>
        </>
      )}
      <section
        id="publicprivategroupnav"
        style={{
          minHeight: "100vh",
          marginTop: "5vh",
          fontFamily: "Roboto",
        }}
      >
        <header
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Roboto",
            fontWeight: "bold",
          }}
        >
          <p
            style={{
              fontSize: "62px",
              lineHeight: "72.66px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            JOIN OUR
          </p>
          <p
            style={{
              backgroundClip: "text",
              color: "transparent",
              WebkitBackgroundClip: "text",
              marginBottom: "20px",
              textAlign: "center",
              fontSize: "100px",
              lineHeight: "118px",
              backgroundImage: "linear-gradient(to bottom, #ffffff,#ffdb17)",
            }}
          >
            FITBUDDY
          </p>
        </header>
        <GroupBox />
      </section>
      {!user.isLoggedIn && (
        <section
          id="groups-container"
          style={{ minHeight: "100vh", paddingTop: "100px" }}
        >
          <h2 style={{ textAlign: "center", fontSize: "30px" }}>
            Join our active community of fitness enthusiasts and explore public
            groups!
          </h2>
          <Box
            width="100vw"
            my={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={4}
            p={2}
            sx={{ flexWrap: "wrap" }}
          >
            {groupsList.map((group, index) => (
              <GroupItem key={index} group={group} id={index} />
            ))}
          </Box>
        </section>
      )}
      <Footer />
    </div>
  );
};

export default Home;
