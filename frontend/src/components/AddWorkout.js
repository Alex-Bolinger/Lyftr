import React from "react";
import { WorkoutContext } from "./Home";
import { AuthContext } from "../App";

const AddWorkout = (props) => {
  const { workoutState, workoutDispatch } = React.useContext(WorkoutContext);
  const { state: authState } = React.useContext(AuthContext);

  const [name, setName] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [activities, setActivities] = React.useState([]);

  const onClose = e => {
    props.onClose && props.onClose(e);
  };

  const isButtonDisabled = name === "" || startTime === "" || endTime === "" || activities === "" || workoutState.isWorkoutSubmitting;

  const onSubmit = () => {
      workoutDispatch({
          type: "ADD_WORKOUT_REQUEST"
      })
      const workout = {
        "name": name,
        "startTime": startTime,
        "endTime": endTime,
        "activities": activities
      };
    fetch("http://127.0.0.1/api/workouts", {
        method: "POST",
        headers: {
          Authorization: `${authState.token}`,
          "Content-Type": `application/json`
        },
        body: JSON.stringify(workout),
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            throw res;
          }
        })
        .then(data => {
            console.log(data);
            setName("");
            setStartTime("");
            setEndTime("");
            setActivities([]);
            workoutDispatch({
                type: "ADD_WORKOUT_SUCCESS",
                payload: data
            })
            onClose();
        }).catch(error => {
        workoutDispatch({
                type: "ADD_WORKOUT_FAILURE"
            })
        })
  }
    if (!props.show) {
      return null;
    }
    return (
      <div className="modal" id="modal">
       <div className="modal-table-container">
        <div className="modal-table-cell">
         <div className="modal-overlay small">
              <div className="modal-header">
                <h1 className="modal-title">
                  ADD NEW WORKOUT
                </h1>
              </div>
              <form className="modal-form">
                <div className="modal-form-inputs">

                <label htmlFor="name">Name</label>
                    <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="text-input"
                    />

                <label htmlFor="startTime">Start Time</label>
                    <input
                    id="startTime"
                    name="startTime"
                    type="text"
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                    className="text-input"
                    />

                <label htmlFor="endTime">End Time</label>
                    <input
                    id="endTime"
                    name="endTime"
                    type="text"
                    value={endTime}
                    onChange={e => setEndTime(e.target.value)}
                    className="text-input"
                    />
                </div>
                  // TODO something to enter reps and sets

                <div className="form-error">
                      <p>
                        {workoutState.workoutHasError && "Error adding workout!"}
                      </p>
                </div>
                <div className="form-action clearfix">
                    <button
                      type="button"
                      id="overlay-confirm-button"
                      className="button button-primary"
                      onClick={onSubmit}
                      disabled={isButtonDisabled}
                    >
                      {workoutState.isWorkoutSubmitting ? "Submitting..." : "Submit"}
                    </button>
                    <button
                      type="button"
                      id="overlay-cancel-button"
                      className="button button-default small close-overlay pull-right"
                      onClick={onClose}
                    >
                          Cancel
                    </button>
                </div>
              </form>
        </div>
        </div>
       </div>
      </div>
    );
};

export default AddWorkout;
