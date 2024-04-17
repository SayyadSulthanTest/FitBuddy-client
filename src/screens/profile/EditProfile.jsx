// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { updateUser } from "../../slices/authSlice";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// const API_URL = import.meta.env.VITE_API_URL;

// const EditProfile = () => {
//   const userData = useSelector((state) => state.auth);
//   console.log("Starting Edit Profile", userData);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [selectedImage, setSelectedImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(userData.pic);
//   const [name, setName] = useState(userData.name);
//   const [age, setAge] = useState(userData.age);
//   const [height, setHeight] = useState(userData.height.value);
//   const [weight, setWeight] = useState(userData.weight);
//   const [fitnessGoals, setFitnessGoals] = useState(userData.fitnessGoals);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedImage(file);

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRemoveImage = () => {
//     setSelectedImage(null);
//     setPreviewImage(null);
//   };

//   const editProfileHandler = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");

//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//         },
//       };

//       const updatedUserData = {
//         name,
//         height: {
//           unit: "ft",
//           value: height,
//         },
//         weight,
//         age,
//         bio: fitnessGoals,
//       };

//       const { data } = await axios.put(
//         `${API_URL}/user`,
//         updatedUserData,
//         config
//       );

//       dispatch(updateUser({ ...data.data, fitnessGoals: data.data.bio }));
//       console.log("Edited Profile ubh iyiiu", data.data);
//       navigate("/profile");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       toast.error(
//         error.message || "Failed to update profile. Please try again."
//       );
//     }
//   };

//   return (
//     <div>
//       <section
//         id="editprofile-container"
//         style={{
//           minHeight: "80vh",
//           marginTop: "30px",
//           padding: "60px 20px",
//           backgroundColor: "black",
//           color: "white",
//         }}
//       >
//         <h2 style={{ textAlign: "center" }}>Edit Profile</h2>
//         <form
//           onSubmit={editProfileHandler}
//           style={{
//             marginTop: "20px",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: "20px",
//           }}
//         >
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             style={{ display: "none" }}
//             id="imageInput"
//           />
//           <label
//             htmlFor="imageInput"
//             style={{
//               height: "150px",
//               width: "200px",
//             }}
//           >
//             <div
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 overflow: "hidden",
//                 display: "flex",
//                 alignItems: "flex-start",
//                 justifyContent: "space-around",
//                 cursor: "pointer",
//                 margin: "auto",
//               }}
//             >
//               {previewImage ? (
//                 <>
//                   <img
//                     src={previewImage}
//                     alt="Preview"
//                     style={{
//                       maxWidth: "100%",
//                       maxHeight: "100%",
//                       borderRadius: "50%",
//                     }}
//                   />
//                   <button
//                     onClick={handleRemoveImage}
//                     style={{
//                       backgroundColor: "red",
//                       border: "1px solid #ccc",
//                       borderRadius: "50%",
//                       cursor: "pointer",
//                       padding: "4px 8px",
//                     }}
//                   >
//                     X
//                   </button>
//                 </>
//               ) : (
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     flexDirection: "column",
//                     height: "150px",
//                     width: "150px",
//                     border: "2px solid black",
//                     borderRadius: "50%",
//                     padding: "30px",
//                   }}
//                 >
//                   <h1>+</h1>
//                   <small>Upload Image</small>
//                 </div>
//               )}
//             </div>
//           </label>
//           <div
//             style={{
//               display: "flex",
//               flexWrap: "wrap",
//               justifyContent: "space-around",
//               minHeight: "50vh",
//               alignItems: "space-evenly",
//             }}
//           >
//             <input
//               type="text"
//               placeholder="Full Name"
//               name="name"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               style={{
//                 padding: "4px 10px",
//                 backgroundColor: "black",
//                 color: "pink",
//                 fontSize: "20px",
//                 borderTop: "none",
//                 borderLeft: "none",
//                 borderRight: "none",
//                 borderBottom: "3px solid pink",
//                 outline: "none",
//                 width: "45%",
//               }}
//             />
//             <input
//               type="number"
//               placeholder="Age"
//               name="age"
//               id="age"
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//               style={{
//                 padding: "4px 10px",
//                 backgroundColor: "black",
//                 color: "pink",
//                 fontSize: "20px",
//                 borderTop: "none",
//                 borderLeft: "none",
//                 borderRight: "none",
//                 borderBottom: "3px solid pink",
//                 outline: "none",
//                 width: "45%",
//               }}
//             />
//             <input
//               type="number"
//               placeholder="Height"
//               name="height"
//               id="height"
//               value={height}
//               onChange={(e) => setHeight(e.target.value)}
//               style={{
//                 padding: "4px 10px",
//                 backgroundColor: "black",
//                 color: "pink",
//                 fontSize: "20px",
//                 borderTop: "none",
//                 borderLeft: "none",
//                 borderRight: "none",
//                 borderBottom: "3px solid pink",
//                 outline: "none",
//                 width: "45%",
//               }}
//             />
//             <input
//               type="number"
//               placeholder="Weight"
//               name="weight"
//               id="weight"
//               value={weight}
//               onChange={(e) => setWeight(e.target.value)}
//               style={{
//                 padding: "4px 10px",
//                 backgroundColor: "black",
//                 color: "pink",
//                 fontSize: "20px",
//                 borderTop: "none",
//                 borderLeft: "none",
//                 borderRight: "none",
//                 borderBottom: "3px solid pink",
//                 outline: "none",
//                 width: "45%",
//               }}
//             />
//             <input
//               type="text"
//               placeholder="Fitness Goals"
//               name="fitnessGoals"
//               id="fitnessGoals"
//               value={fitnessGoals}
//               onChange={(e) => setFitnessGoals(e.target.value)}
//               style={{
//                 padding: "4px 10px",
//                 backgroundColor: "black",
//                 color: "pink",
//                 fontSize: "20px",
//                 borderTop: "none",
//                 borderLeft: "none",
//                 borderRight: "none",
//                 borderBottom: "3px solid pink",
//                 outline: "none",
//                 width: "90%",
//               }}
//             />
//           </div>
//           <button
//             type="submit"
//             style={{
//               backgroundColor: "#00647A",
//               padding: "4px 80px",
//               margin: "auto",
//               color: "white",
//               fontWeight: "bold",
//             }}
//           >
//             Save Details
//           </button>
//         </form>
//       </section>
//     </div>
//   );
// };

// export default EditProfile;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import UploadImage from "../../components/UploadImage.jsx"; // Import the UploadImage component
const API_URL = import.meta.env.VITE_API_URL;

const EditProfile = () => {
  const userData = useSelector((state) => state.auth);
  console.log("Starting Edit Profile", userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(userData.name);
  const [age, setAge] = useState(userData.age);
  const [height, setHeight] = useState(userData.height.value);
  const [weight, setWeight] = useState(userData.weight);
  const [pic, setPic] = useState(userData.pic);
  const [fitnessGoals, setFitnessGoals] = useState(userData.fitnessGoals);

  const editProfileHandler = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };

      const updatedUserData = {
        name,
        height: {
          unit: "ft",
          value: height,
        },
        weight,
        age,
        pic,
        bio: fitnessGoals,
      };

      const { data } = await axios.put(
        `${API_URL}/user`,
        updatedUserData,
        config
      );

      dispatch(updateUser({ ...data.data, fitnessGoals: data.data.bio }));
      console.log("Edited Profile", data.data);
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        error.message || "Failed to update profile. Please try again."
      );
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "black" }}>
      <section
        id="editprofile-container"
        style={{
          minHeight: "80vh",
          padding: "60px 20px",
          backgroundColor: "black",
          color: "white",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Edit Profile</h2>
        <UploadImage picUrl={pic} changePicUrl={setPic} />
        <form
          onSubmit={editProfileHandler}
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* Render the UploadImage component for profile picture */}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              minHeight: "50vh",
              alignItems: "space-evenly",
            }}
          >
            {/* Rest of the form fields */}
            {/* Name */}
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                padding: "4px",
                backgroundColor: "black",
                color: "pink",
                fontSize: "20px",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                borderBottom: "3px solid pink",
                outline: "none",
                width: "45%",
              }}
            />
            {/* Age */}
            <input
              type="number"
              placeholder="Age"
              name="age"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
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
                width: "45%",
              }}
            />
            {/* Height */}
            <input
              type="number"
              placeholder="Height"
              name="height"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
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
                width: "45%",
              }}
            />
            {/* Weight */}
            <input
              type="number"
              placeholder="Weight"
              name="weight"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
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
                width: "45%",
              }}
            />
            {/* Fitness Goals */}
            <input
              type="text"
              placeholder="Fitness Goals"
              name="fitnessGoals"
              id="fitnessGoals"
              value={fitnessGoals}
              onChange={(e) => setFitnessGoals(e.target.value)}
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
                width: "90%",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "#00647A",
              padding: "4px 80px",
              margin: "auto",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Save Details
          </button>
        </form>
      </section>
    </div>
  );
};

export default EditProfile;
