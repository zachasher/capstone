import "./member-timetable.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";

const MemberTimeTable = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    const fetchClasses = async () => {
      try {
        // Get the user data from the API
        const { data } = await axios.get("http://localhost:8080/users/current", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Fetch the user's classes based on the user's ID
        const { data: userClasses } = await axios.get(
          `http://localhost:8080/users/${data.id}/classes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClasses(userClasses);
      } catch (error) {
        console.log(error);
        // Handle any error that occurs during API calls
      }
    };

    fetchClasses();
  }, []);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const times = ["7AM", "8AM", "12PM", "5PM", "6PM"];

  return (
    <div className="member-timetable-section">
      <h2 className="member-timetable-section__heading">YOUR TIMETABLE</h2>
      <table className="member-class-timetable">
        <thead className="member-column-headings">
          <tr>
            <th className="member-class-timetable__time-heading"></th>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time) => (
            <tr key={time}>
              <td className="member-time-cells">{time}</td>
              {daysOfWeek.map((day) => {
                const classData = classes.find(
                  (classItem) =>
                    classItem.day === day && classItem.time === time
                );
                return (
                  <td className="member-class-name" key={day}>
                    {classData ? (
                      <>
                        <p>{classData.class_name}</p>
                      </>
                    ) : (
                      ""
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberTimeTable;
