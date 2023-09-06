const express = require("express");
const app = express();
const mongoose = require('mongoose');
const WorkoutModel = require('./model/Workouts')

const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://<username>:<password>@cluster0.bdwqyjk.mongodb.net/?retryWrites=true&w=majority"
    );


app.get('/getWorkouts', async (req, res) => {
    const workout = await WorkoutModel.find({})
    res.json(workout)
});

app.post("/createWorkout", async (req, res) => {
    const workout = req.body;
    const newWorkout = new WorkoutModel(workout);
    await newWorkout.save();

    res.json(workout);
})

app.listen(3001, () => {
    console.log("SERVER RUNNING PROPERLY")
}) // react runs on 3000 so we use the next space