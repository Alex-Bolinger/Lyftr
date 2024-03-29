import {
    generateCommentID,
    generatePictureID,
    generateUserID,
    generateWorkoutID,
    unwrapJSONToArray,
    wrapArrayToJSON
} from "../helpers";
const roachDB = require("../roachDB");

/*
    GET /workouts
    ReqBody: None
    Query Params: id (optional) TODO add more as planned

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

function getWorkouts (req, res) {
    // Check for optional query parameter
    let workout_id = req.query.id;

    if (workout_id != null) {
        // Fetch this specific workout
        roachDB.Workout.sync({
            force: false
        }).then(function() {
            return roachDB.Workout.findOne({
                where: {
                    id: workout_id, // want the workout with this ID
                    user_id: req.user.id // workout has to belong to this user
                }
            });
        }).then(function(workout) {
            res.status(200).json(workout);
        }).catch(function(error) {
            res.status(404).json({ message: error });
        })
    } else {
        // Fetch all workouts
        // TODO add paging in future
        roachDB.Workout.sync({
            force: false
        }).then(function() {
            return roachDB.Workout.findAll({
                where: {
                    user_id: req.user.id // workouts have to belong to this user
                }
            });
        }).then(function(workouts) {
            // Unwrap activities
            for (let workout in workouts) {
                // @ts-ignore
                workouts[workout].activities = unwrapJSONToArray(workouts[workout].activities);
            }
            res.status(200).json(workouts);
        }).catch(function(error) {
            res.status(500).json({ message: error });
        });
    }
}

/*
    PUT /workouts
    ReqBody: Workout {
        workout
    }
    Query Params: id

    Response: 200 OK
 */
function updateWorkout (req, res) {
    let workout_id = req.query.id;

    // Update row with this ID
    // let user_id = req.body.user_id; TODO remove this from the request in the api spec and frontend
    let start_time = req.body.start_time;
    let end_time = req.body.end_time;
    let name = req.body.name;
    let activities = wrapArrayToJSON(req.body.activities); // TODO validate activities

    roachDB.Workout.update({
            id: workout_id,
            user_id: req.user.id,
            start_time: start_time,
            end_time: end_time,
            name: name,
            activities: activities
        }, {
        where: {
            id: workout_id,
            user_id: req.user.id // workout must be this user's own
        }
    }).then(function(updatedRows) {
        res.status(200).json();
    }).catch(function(error) {
        res.status(500).json( {message: error} );
    });
}

/*
    POST /workouts
    ReqBody: Workout {
        workout
    }

    Response: 200 OK
 */
function addWorkout (req, res) {
    // Add workout to profile
    let workoutID = generateWorkoutID();
    // const user_id = req.body.user_id; TODO remove this from the request in the api spec and frontend
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;
    const name = req.body.name;
    const activities = wrapArrayToJSON(req.body.activities);

    roachDB.Workout.sync({
        force: false
    }).then(function() {
        return roachDB.Workout.create({
            id: workoutID,
            user_id: req.user.id,
            start_time: start_time,
            end_time: end_time,
            name: name,
            activities: activities
        });
    }).then(function(workout) {
        res.status(200).json(workout);
    }).catch(function(error) {
        res.status(500).json({ message: error });
    });
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
function getComments (req, res) {
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
function updateComment (req, res) {
    // TODO
    res.status(200);
}

/*
    POST /workouts/comments
    ReqBody: WorkoutComment
    Query Params: workout_id TODO

    Response: 200 OK
 */
function addComment (req, res) {
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
function getPictures (req, res) {
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
function addPicture (req, res) {
    // TODO
    res.status(201);
}

/*
    DELETE /workouts/pictures
    ReqBody: None
    Query Params: id TODO

    Response: 200 OK
 */
function deletePicture (req, res) {
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
