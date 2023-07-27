import "./class-timetable.scss";
import React, { useEffect, useState } from "react";

const ClassCalendarTable = () => {
  const [classSchedule, setClassSchedule] = useState([]);

  useEffect(() => {
    const classData = {
      classes: [
        {
          "Class ID": 1,
          Name: "Cardio",
          Instructor: "Jessica Smith",
          Description:
            "High-intensity cardio workout to burn calories and improve cardiovascular endurance.",
          Day: "Mon",
          Time: "7 AM",
        },
        {
          "Class ID": 1,
          Name: "Spinning",
          Instructor: "Billy Smith",
          Description:
            "High-intensity cardio workout to burn calories and improve cardiovascular endurance.",
          Day: "Wed",
          Time: "6 PM",
        },
        {
          "Class ID": 1,
          Name: "Yoga",
          Instructor: "Mary Jane",
          Description:
            "High-intensity cardio workout to burn calories and improve cardiovascular endurance.",
          Day: "Fri",
          Time: "5 PM",
        },
        {
          "Class ID": 1,
          Name: "Test",
          Instructor: "Mary Jane",
          Description:
            "High-intensity cardio workout to burn calories and improve cardiovascular endurance.",
          Day: "Fri",
          Time: "12 PM",
        },
      ],
    };

    setClassSchedule(classData.classes);
  }, []);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const times = ["7 AM", "8 AM", "12 PM", "5 PM", "6 PM"];

  return (
    <div className="timetable-section">
      <h2 className="timetable-section__heading">CLASS TIMETABLE</h2>
      <table className="class-timetable">
      <thead className="column-headings">
        <tr>
          <th className="class-timetable__time-heading">Time</th>
          {daysOfWeek.map((day) => (
            <th key={day}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {times.map((time) => (
          <tr key={time}>
            <td className="time-cells">{time}</td>
            {daysOfWeek.map((day) => {
              const classData = classSchedule.find(
                (classItem) => classItem.Day === day && classItem.Time === time
              );
              return (
                <td className="class-name" key={day}>
                  {classData ? (
                    <>
                      <p>{classData.Name}</p>
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

export default ClassCalendarTable;
