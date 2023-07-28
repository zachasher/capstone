import "./class-timetable.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ClassModal from "../ClassModal/ClassModal";

const ClassCalendarTable = () => {
  const [classSchedule, setClassSchedule] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/classes");
        setClassSchedule(response.data);
        console.log(response.data);
        console.log(classSchedule);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const times = ["7AM", "8AM", "12PM", "5PM", "6PM"];

  //CLASS MODAL FUNCTIONS
  const [classModalOpen, setClassModalOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);

  const openClassModal = (classId) => {
    setSelectedClassId(classId);
    setClassModalOpen(true);
  };

  const closeClassModal = () => {
    setSelectedClassId(null);
    setClassModalOpen(false);
  };

  return (
    <div className="timetable-section">
      <h2 className="timetable-section__heading">CLASS TIMETABLE</h2>
      <table className="class-timetable">
        <thead className="column-headings">
          <tr>
            <th className="class-timetable__time-heading"></th>
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
                  (classItem) =>
                    classItem.day === day && classItem.time === time
                );
                return (
                  <td className="class-name" key={day}>
                    {classData ? (
                      <>
                        <p onClick={() => openClassModal(classData.id)}>
                          {classData.class_name}
                        </p>
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
      <div>
        <ClassModal
          isOpen={classModalOpen}
          onClose={closeClassModal}
          classId={selectedClassId}
        />
      </div>{" "}
    </div>
  );
};

export default ClassCalendarTable;
