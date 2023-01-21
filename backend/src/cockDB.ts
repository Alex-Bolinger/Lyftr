const { Sequelize } = require("sequelize-cockroachdb");

const sequelize = new Sequelize(process.env.CRDB_URL, {
    dialect: "postgres"
});

// Tables
const Profile = sequelize.define("profile", {
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

const User = sequelize.define("user", {
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
    },
    created: {
        type: Sequelize.DATE // TIMESTAMP WITH TIME ZONE
    }
});

const Exercise = sequelize.define("exercise", {
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

const Workout = sequelize.define("workout", {
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

const Workout_Picture = sequelize.define("workout_picture", {
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

const Workout_Comment = sequelize.define("workout_comment", {
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
            sequelize.query(queryString).then((results, metadata) => resolve(results));
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
