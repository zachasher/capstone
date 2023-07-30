import React, { useEffect, useState } from "react";
import CloseIcon from "../../Assets/images/icons/close-24px.svg";
import axios from "axios";
import "./class-modal.scss";

function ClassModal({ isOpen, onClose, classId }) {
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    if (isOpen) {
      axios
        .get(`http://localhost:8080/classes/${classId}`)
        .then((response) => {
          setClassData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching class data:", error);
        });
    }
  }, [isOpen, classId]);

  // const handleDelete = () => {
  //   axios
  //     .delete(`http://localhost:8080/classes/${classId}`)
  //     .then(() => {
  //       alert("Class deleted");
  //       onClose();
  //       window.location.reload();
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting class:", error);
  //     });
  // };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/classes/${classId}`);
      alert("Class deleted");
      window.location.reload();
      onClose();
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  if (!classData) {
    return null;
  }

  return (
    <section className={`class-modal ${isOpen ? "class-modal--open" : ""}`}>
      <div className="delete-inventory">
        <div className="delete-inventory__box">
          <img
            src={CloseIcon}
            onClick={onClose}
            className="delete-inventory__close"
            alt="close icon"
          />
          <div className="delete-inventory__content">
            <h2 className="delete-inventory__title">
              {classData.class_name}
            </h2>
            <p className="delete-inventory__text">Day: {classData.day}</p>
            <p className="delete-inventory__text">Time: {classData.time}</p>
            <p className="delete-inventory__text">Instructor: {classData.instructor}</p>
            <p className="delete-inventory__text">Description: {classData.description}</p>
          </div>
        </div>
        <div className="delete-inventory__buttons">
          <button onClick={onClose} className="delete-inventory__cancel">
            Cancel
          </button>
          <button onClick={handleDelete} className="delete-inventory__delete">
            Delete
          </button>
        </div>
      </div>
    </section>
  );
}

export default ClassModal;
