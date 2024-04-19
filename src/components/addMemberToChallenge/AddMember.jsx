import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import Loading from "../loading/Loading.jsx";
const AddMember = ({ groupid }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Make API call to fetch users based on groupid
        const response = await axios.get(
          `${API_URL}/groups/${groupid}/members`
        );
        setUsers(response?.data?.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [groupid]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id="add-member-container">
      <h2>User List</h2>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            {/* Render other user details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddMember;
