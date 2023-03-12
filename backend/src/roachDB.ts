const { Sequelize } = require("sequelize-cockroachdb");

// For cockroach DB
// const sequelize = new Sequelize(process.env.CRDB_URL, {
//     dialect: "postgres"
// });

// For local postgresql
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres'
});

// TODO: any way to create typescript types / models for these kings of things and integrate it with the database spec?
// TODO: what about things like activities - how do we maintain and validate that "data type" consistently in the
// TODO: API spec, backend, database, and frontend?

// TODO: add github issue: optimize database calls?  with sequelize ORM, is there a way to avoid fetching one bit
// TODO: of data, then using that to fetch another, then using that to fetch another?
// TODO: is there a "transaction" sort of thing where you can send it all at once and skip repeat database / API queries?
// TODO: that could really improve performance.

// Tables
const Profile = sequelize.define("profiles", {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true
    },
    full_name: {
        type: Sequelize.TEXT
    },
    picture_link: {
        type: Sequelize.TEXT
    }
});

const User = sequelize.define("users", {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true
    },
    email: {
        type: Sequelize.TEXT
    },
    user_name: {
        type: Sequelize.TEXT
    },
    profile_id: {
        type: Sequelize.TEXT
    },
    hashed_pass: {
        type: Sequelize.JSON
    }
});

const Exercise = sequelize.define("exercises", {
    name: {
        type: Sequelize.TEXT,
        primaryKey: true
    },
    muscle_group: {
        type: Sequelize.TEXT
    },
    muscles: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
    }
});

const Workout = sequelize.define("workouts", {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.TEXT
    },
    name: {
        type: Sequelize.TEXT
    },
    start_time: {
        type: Sequelize.DATE // TIMESTAMP WITH TIME ZONE
    },
    end_time: {
        type: Sequelize.DATE // TIMESTAMP WITH TIME ZONE
    },
    activities: {
        type: Sequelize.JSON
    }
});

const Workout_Picture = sequelize.define("workout_pictures", {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true
    },
    workout_id: {
        type: Sequelize.TEXT // ref > Workout.id
    },
    picture_link: {
        type: Sequelize.TEXT
    }
});

const Workout_Comment = sequelize.define("workout_comments", {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.TEXT
    },
    contents: {
        type: Sequelize.TEXT
    },
    workout_id: {
        type: Sequelize.TEXT
    }
})

function getDB() {
    return sequelize;
}

function closeDB() {
    return new Promise<void>((resolve) => {
        sequelize.close().then(resolve());
    })
}



function query(queryString) {
    return new Promise((resolve, reject) => {
        try {
            sequelize.query(queryString).then((results) => resolve(results));
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    getDB,
    closeDB,
    query,
    Profile,
    User,
    Exercise,
    Workout,
    Workout_Picture,
    Workout_Comment
};
