import React, { useEffect, useState } from "react";
import CloseIcon from "../../Assets/images/icons/close-24px.svg";
import axios from "axios";
import "./class-modal.scss";

function ClassModal({ isOpen, onClose, classId, openEditModal }) {
  const [classData, setClassData] = useState(null);
  const [user, setUser] = useState(null);

  //user auth
  useEffect(() => {
    const loadData = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        return setUser(null);
      }

      try {
        const { data } = await axios.get(
          "http://localhost:8080/users/current",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(data);
      } catch (error) {
        console.log(error);
        setUser(null);
      }
    };
    loadData();
  }, []);

  //get class data
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

  //handle adding class to member schedule
  const handleAddToSchedule = async () => {
    try {
      const token = sessionStorage.getItem("token");
      //post request to add class to member schedule
      await axios.post(
        `http://localhost:8080/users/${user.id}/classes/${classId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Class added to your schedule!");
      onClose(); //close modal after adding class
    } catch (error) {
      console.log(error);
    }
  };

  //handle deleting a class
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
      <div className="class-details">
        <div className="class-details__box">
          <img
            src={CloseIcon}
            onClick={onClose}
            className="class-details__close"
            alt="close icon"
          />
          <div className="class-details__content">
            <h2 className="class-details__title">{classData.class_name.toUpperCase()}</h2>
            <p className="class-details__text"><b className="class-details__text--bold">Day: </b>{classData.day}</p>
            <p className="class-details__text"><b className="class-details__text--bold">Time: </b>{classData.time}</p>
            <p className="class-details__text">
              <b className="class-details__text--bold">Instructor: </b>{classData.instructor}
            </p>
            <p className="class-details__text">
              <b className="class-details__text--bold">Description: </b>{classData.description}
            </p>
          </div>
        </div>
        {user && user.type === "admin" && (
          <div className="class-details__buttons">
            <button onClick={() => openEditModal(classId)} className="class-details__edit">
              Edit
            </button>
            <button onClick={handleDelete} className="class-details__delete">
              Delete
            </button>
          </div>
        )}
        {user && user.type === "member" && (
          <div className="class-details__buttons">
            <button onClick={handleAddToSchedule} className="class-details__add">
              Add to my schedule
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ClassModal;
