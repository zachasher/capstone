import React from "react";
import ClassTimetable from "../../components/ClassTimetable/ClassTimetable";
import "./class-page.scss";
import ClassHeaderImage from "../../Assets/images/Class-Header-small.svg";

function ClassPage() {
  return (
    <div className="class-page">
      <div className="class-header">
        <div className="class-header__image">
          <img src={ClassHeaderImage} className="class-header__image--svg"></img>
        </div>
      </div>
      <ClassTimetable />
    </div>
  );
}

export default ClassPage;
