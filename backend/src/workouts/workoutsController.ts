import {generateCommentID, generatePictureID, generateUserID, generateWorkoutID} from "../helpers";

/*
    GET /workouts
    ReqBody: None
    Query Params: end_time, id, start_time, user_id TODO

    Response: Workout []
    [
        {
            workout
        },
        {
            workout
        }
        ...
    ]
 */

function getWorkouts (req, res, next) {
    // TODO
    res.status(200).json([
        {
            id: generateWorkoutID(),
            user_id: generateUserID(),
            start_time: Date.now(),
            end_time: Date.now(),
            name: "Afternoon Workout",
            activities: [
                {
                    exercise: {
                        name: "Bench Press",
                        muscle_group: "Chest",
                        muscles: [
                            "pectorals",
                            "deltoids",
                            "triceps",
                            "biceps"
                        ]
                    },
                    sets: 3,
                    reps: 10
                },
                {
                    exercise: {
                        name: "Bicep Curl",
                        muscle_group: "Arms",
                        muscles: [
                            "biceps"
                        ]
                    },
                    sets: 3.5,
                    reps: 12
                }
            ]
        },
        {
            id: generateWorkoutID(),
            user_id: generateUserID(),
            start_time: Date.now(),
            end_time: Date.now(),
            name: "Afternoon Workout",
            activities: [
                {
                    exercise: {
                        name: "Bench Press",
                        muscle_group: "Chest",
                        muscles: [
                            "pectorals",
                            "deltoids",
                            "triceps",
                            "biceps"
                        ]
                    },
                    sets: 3,
                    reps: 10
                },
                {
                    exercise: {
                        name: "Bicep Curl",
                        muscle_group: "Arms",
                        muscles: [
                            "biceps"
                        ]
                    },
                    sets: 3.5,
                    reps: 12
                }
            ]
        }
    ]);
}

/*
    PUT /workouts
    ReqBody: Workout {
        workout
    }
    Query Params: id TODO

    Response: 200 OK
 */
function updateWorkout (req, res, next) {
    // TODO
    res.status(200);
}

/*
    POST /workouts
    ReqBody: Workout {
        workout
    }

    Response: 200 OK
 */
function addWorkout (req, res, next) {
    // TODO
    res.status(200);
}

/*
    GET /workouts/comments
    ReqBody: None
    Query Params: id, page_offset, page_size TODO

    Response: WorkoutComment []
    [
        {
            WorkoutComment
        },
        {
            WorkoutComment
        }
        ...
    ]
 */
function getComments (req, res, next) {
    // TODO
    res.status(200).json([
        {
            id: generateCommentID(),
            user_id: generateUserID(),
            workout_id: generateWorkoutID(),
            contents: "This is a comment"
        },
        {
            id: generateCommentID(),
            user_id: generateUserID(),
            workout_id: generateWorkoutID(),
            contents: "This is a different comment"
        }
    ]);
}

/*
    PUT /workouts/comments
    ReqBody: WorkoutComment
    Query Params: id TODO

    Response: 200 OK
 */
function updateComment (req, res, next) {
    // TODO
    res.status(200);
}

/*
    POST /workouts/comments
    ReqBody: WorkoutComment
    Query Params: workout_id TODO

    Response: 200 OK
 */
function addComment (req, res, next) {
    // TODO
    res.status(200);
}

/*
    GET /workouts/pictures
    ReqBody: None
    Query Params: workout_id, offset TODO

    Response: Picture []
    [
        {
            Picture
        },
        {
            Picture
        }
        ...
    ]
 */
function getPictures (req, res, next) {
    // TODO
    res.status(200).json([
        {
            id: generatePictureID(),
            picture_link: "this is a link",
            workout_id: generateWorkoutID()
        },
        {
            id: generatePictureID(),
            picture_link: "this is a different link",
            workout_id: generateWorkoutID()
        }
    ]);
}

/*
    POST /workouts/pictures
    ReqBody: picture link
    Query Params: workout_id TODO

    Response: 201 CREATED
 */
function addPicture (req, res, next) {
    // TODO
    res.status(201);
}

/*
    DELETE /workouts/pictures
    ReqBody: None
    Query Params: id TODO

    Response: 200 OK
 */
function deletePicture (req, res, next) {
    // TODO
    res.status(200);
}

module.exports = {
    getWorkouts,
    updateWorkout,
    addWorkout,
    getComments,
    updateComment,
    addComment,
    getPictures,
    addPicture,
    deletePicture
};
