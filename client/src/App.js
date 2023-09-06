
import './App.css';
import { useState, useEffect } from 'react';
import Axios from "axios";

function App() {

  const [listOfWorkouts, setListOfWorkouts] = useState([]);
  const [date, setDate] = useState("");
  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);

  const [workoutDates, setWorkoutDates] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/getWorkouts").then((response) => {
      setListOfWorkouts(response.data);

      console.log("HELLO?")
      listOfWorkouts.map((exercise) => {
        console.log(exercise);
        if (!(workoutDates.some((d) => (d === exercise.date)))){
          setWorkoutDates([...workoutDates, exercise.date]);
        }
      })
      
    });
  }, [])

  const createWorkout = () => {
    Axios.post("http://localhost:3001/createWorkout", {
      date: date, 
      exercise: exercise,
      weight: weight,
      reps: reps}).then((response) => {

      console.log(date)
      if (!(workoutDates.some(d => (d === date)))){
        console.log("adding date")
        setWorkoutDates([...workoutDates, date]);
      }

      setListOfWorkouts([...listOfWorkouts, {
        date:date,
        exercise: exercise,
        weight: weight,
        reps: reps
      }])
    });
  };

  return (
    <div className="App">
      <div className='userDisplay'>
        {
          workoutDates.map((date) => {
            return(
              <div>
                <h1>Date: {date}</h1>
                {listOfWorkouts.map((exercise) => {
                  if (exercise.date === date) {
                    return(
                      <div>
                      <body>Exercise: {exercise.exercise}</body>
                      <body>Weight: {exercise.weight}</body>
                      <body>Reps: {exercise.reps}</body>
                      </div>
                    )
                  }
                })}
              </div>
            )
          })

        }
      </div>

      <div>
        <input 
          type = "text" 
          placeholder='Date...' 
          onChange={(event) => {setDate(event.target.value)}}
        />

        <input 
          type = "text" 
          placeholder='Exercise...'
          onChange={(event) => {setExercise(event.target.value)}}
        />

        <input 
          type = "text" 
          placeholder='Weight...'
          onChange={(event) => {setWeight(event.target.value)}}
        />

        <input 
          type = "text" 
          placeholder='Reps...'
          onChange={(event) => {setReps(event.target.value)}}
        />
        <button onClick={createWorkout}>Add Workout</button>
      </div>
    </div>
  );
}

export default App;
