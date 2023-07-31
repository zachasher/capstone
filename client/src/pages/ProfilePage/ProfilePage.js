import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./profile-page.scss";
import MemberTimeTable from "../../components/MemberTimetable/MemberTimetable";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        return setFailedAuth(true);
      }

      try {
        // Get the data from the API
        const { data } = await axios.get(
          "http://localhost:8080/users/current",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        setUser(data);
      } catch (error) {
        console.log(error);
        setFailedAuth(true);
      }
    };
    loadData();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setFailedAuth(true);
  };

  if (failedAuth) {
    return (
      <main className="Profile">
        <p>You must be logged in to see this page.</p>
        <p>
          <Link to="/login">Log in</Link>
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="Profile">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <div>
      <div className="profile">
        <h2>Welcome to your profile</h2>
        <p>User email: {user.email}</p>
        <button className="Profile__logout" onClick={handleLogout}>
        Log out
      </button>
      </div>
      <MemberTimeTable />
    </div>
  );
}

export default ProfilePage;
