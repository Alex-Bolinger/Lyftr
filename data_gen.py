from datetime import datetime, timedelta
import random
import os
import json
import psycopg2
from uuid import uuid4

# Generates full body workouts and inserts into cockroachDB
NUM_WORKOUTS = 1000

EXERCISES = [
  {
    "name": "Bench Press",
    "muscle_group": "Chest",
    "muscles": [
      "Pectorals",
      "Deltoids",
      "Triceps"
    ]
  },
  {
    "name": "Squat",
    "muscle_group": "Legs",
    "muscles": [
      "Glutes",
      "Quads",
      "Hamstrings",
      "Groin",
      "Hip Flexors",
      "Calves"
    ]
  },
  {
    "name": "Bicep Curl",
    "muscle+group": "Arms",
    "muscles": [
      "Biceps"
    ]
  },
  {
    "name": "Shoulder Press",
    "muscle_group": "Shoulders",
    "muscles": [
      "Anterior Deltoids",
      "Deltoids",
      "Triceps",
      "Traps",
      "Pectorals"
    ]
  },
  {
    "name": "Tricep Extension",
    "muscle_group": "Arms",
    "muscles": [
      "Triceps"
    ]
  },
  {
    "name": "Lateral Pulldown",
    "muscle_group": "Back",
    "muscles": [
      "Lats",
      "Biceps",
      "Rear Delts",
      "Rhomboids",
      "Traps"
    ]
  },
  {
    "name": "Calf Extension",
    "muscle_group": "Calves",
    "muscles": [
      "Calves"
    ]
  }
]

WORKOUT_TIMES = [
  {
    "name": "Morning",
    "time_start": 5,
    "time_end": 11
  },
  {
    "name": "Midday",
    "time_start": 11,
    "time_end": 13
  },
  {
    "name": "Afternoon",
    "time_start": 13,
    "time_end": 17
  },
  {
    "name": "Evening",
    "time_start": 17,
    "time_end": 23
  }
]

MIN_ACTIVITIES = 3
MAX_ACTIVITIES = 7

MIN_SETS = 2
MAX_SETS = 5

MIN_REPS = 6
MAX_REPS = 16

USER_ID="user_" + str(uuid4())

# Each workout has a name, start datetime, end datetime, and set of activities
# Start from today and work backwards, sometimes skipping 1 or 2 days
workouts = []
current_date = datetime.now()
for i in range(NUM_WORKOUTS):
  # Workout id
  workout_id = "workout_" + str(uuid4())

  # Create workout for today
  workout_time = random.sample(WORKOUT_TIMES, 1)[0]
  
  # Workout name
  workout_name = workout_time["name"]

  # Workout start and end datetime
  workout_start_time = datetime(
    year=current_date.year,
    month=current_date.month,
    day=current_date.day,
    hour=random.randint(workout_time["time_start"], int(((workout_time["time_end"] - workout_time["time_start"]) / 2) + workout_time["time_start"])),
    minute=random.randint(0, 59)
  )

  workout_end_time = datetime(
    year=current_date.year,
    month=current_date.month,
    day=current_date.day,
    hour=random.randint(int(((workout_time["time_end"] - workout_time["time_start"]) / 2) + workout_time["time_start"]), workout_time["time_end"]),
    minute=random.randint(0, 59)
  )

  workout_activities = dict()
  activity_num = 1
  exercises = random.sample(EXERCISES, random.randint(MIN_ACTIVITIES, MAX_ACTIVITIES))
  for ex in exercises:
    workout_activities[activity_num] = {
      "exercise": ex,
      "sets": random.randint(MIN_SETS, MAX_SETS),
      "reps": random.randint(MIN_REPS, MAX_REPS)
    }
    activity_num += 1

  # Workout done
  workouts.append({
    "id": workout_id,
    "user_id": USER_ID,
    "start_time": workout_start_time,
    "end_time": workout_end_time,
    "name": workout_name,
    "activities": workout_activities
  })

conn = psycopg2.connect("postgresql://localhost/lyftr?user=postgres&password=password")

with conn.cursor() as cur:
  for workout in workouts:
    cur.execute(f'INSERT INTO "workouts" ("id","user_id","name","start_time","end_time","activities", "createdAt", "updatedAt") VALUES (\'{workout["id"]}\', \'{workout["user_id"]}\', \'{workout["name"]}\', \'{workout["start_time"]}\', \'{workout["end_time"]}\', \'{json.dumps(workout["activities"])}\', \'{datetime.now()}\', \'{datetime.now()}\')')
  conn.commit()
