import React, { useState } from "react";
import CloseIcon from "../../Assets/images/icons/close-24px.svg";
import "./add-class.scss";
import axios from "axios";

function AddClass({ onClose, isOpen }) {
  const [className, setClassName] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [instructor, setInstructor] = useState("");
  const [description, setDescription] = useState("");

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const times = ["7AM", "8AM", "12PM", "5PM", "6PM"];

  const handleSubmit = (e) => {
    e.preventDefault();

    const newClassData = {
      class_name: className,
      day: day,
      time: time,
      instructor: instructor,
      description: description,
    };

    axios
      .post("http://localhost:8080/classes", newClassData)
      .then((response) => {
        // Handle successful response
        console.log("Class added successfully:", response.data);
        alert("New class added");
        window.location.reload();
        onClose(); // Close the modal after successful submission
      })
      .catch((error) => {
        // Handle error response - alert if duplicate
        if (error.response && error.response.status === 409) {
          alert('Class already exists at the same day and time.');
        } else {
          console.error('Error adding class:', error);
          alert('Error adding class. Please try again later.');
        }
      });
  };

  return (
    <section
      className={`add-class-modal ${isOpen ? "add-class-modal--open" : ""}`}
    >
      <div className="add-class">
        <form onSubmit={handleSubmit}>
          <img
            src={CloseIcon}
            onClick={onClose}
            className="add-class__close"
            alt="close icon"
          />
          <div className="add-class__content">
            <h2 className="add-class__title">Add New Class</h2>
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
          <div className="add-class__buttons">
            <button
              type="button"
              onClick={onClose}
              className="add-class__cancel"
            >
              Cancel
            </button>
            <button type="submit" className="add-class__submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddClass;
