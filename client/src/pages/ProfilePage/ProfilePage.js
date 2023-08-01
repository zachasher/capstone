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
    window.location.reload();
  };

  if (failedAuth) {
    return (
      <main className="not-logged-in">
        <div className="not-logged-in__box">
          <p className="not-logged-in__text">You must be logged in to see this page.</p>
        <p>
          <Link to="/login">Log in</Link>
        </p>
        </div>
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
        <h2 className="profile__name">Welcome back, {user.first_name}</h2>
        <p className="profile__email">User Type: {user.type}</p>
        <p className="profile__email">Email: {user.email}</p>
        <button className="profile__logout" onClick={handleLogout}>
        Log out
      </button>
      </div>
      <MemberTimeTable />
    </div>
  );
}

export default ProfilePage;
