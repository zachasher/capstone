import React from "react";
import "./profile-page.scss";
import MemberTimeTable from "../../components/MemberTimetable/MemberTimetable";

function ProfilePage() {
  return (
    <div>
      <div className="profile">
        <h2>Welcome to your profile</h2>
        <p>User Name</p>
      </div>
        <MemberTimeTable/>
    </div>
  );
}

export default ProfilePage;
