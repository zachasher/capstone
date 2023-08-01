import React, { useState, useEffect } from "react";
import CloseIcon from "../../Assets/images/icons/close-24px.svg";
import "./edit-class.scss";
import axios from "axios";

function EditClass({ onClose, isOpen, classId, initialData }) {
  const [className, setClassName] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [instructor, setInstructor] = useState("");
  const [description, setDescription] = useState("");

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const times = ["7AM", "8AM", "12PM", "5PM", "6PM"];

  useEffect(() => {
    if (initialData) {
      // Pre-fill the inputs with the initial class data received as a prop
      setClassName(initialData.class_name);
      setDay(initialData.day);
      setTime(initialData.time);
      setInstructor(initialData.instructor);
      setDescription(initialData.description);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedClassData = {
      class_name: className,
      day: day,
      time: time,
      instructor: instructor,
      description: description,
    };

    axios
      .put(`http://localhost:8080/classes/${classId}`, updatedClassData)
      .then((response) => {
        // Handle successful response
        console.log("Class updated successfully:", response.data);
        alert("Class updated successfully");
        window.location.reload();
        onClose(); // Close the modal after successful submission
      })
      .catch((error) => {
        console.error("Error updating class:", error);
        alert("Error updating class. Please try again later.");
      });
  };

  return (
    <section
      className={`edit-class-modal ${isOpen ? "edit-class-modal--open" : ""}`}
    >
      <div className="edit-class">
        <form onSubmit={handleSubmit}>
          <div className="edit-class__box">
            <img
            src={CloseIcon}
            onClick={onClose}
            className="edit-class__close"
            alt="close icon"
          />
          </div>
          
          <div className="edit-class__content">
            <h2 className="edit-class__title">EDIT CLASS</h2>
            <div className="input-section">
              <div className="input-container">
                <label htmlFor="className">Class Name:</label>
                <input
                  type="text"
                  id="className"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="day">Day:</label>
                <select
                  id="day"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  required
                >
                  <option value="">Select a Day</option>
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-container">
                <label htmlFor="time">Time:</label>
                <select
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                >
                  <option value="">Select a Time</option>
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-container">
                <label htmlFor="instructor">Instructor:</label>
                <input
                  type="text"
                  id="instructor"
                  value={instructor}
                  onChange={(e) => setInstructor(e.target.value)}
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="edit-class__buttons">
            <button
              type="button"
              onClick={onClose}
              className="edit-class__cancel"
            >
              Cancel
            </button>
            <button type="submit" className="edit-class__submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditClass;
