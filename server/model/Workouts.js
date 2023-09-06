const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    exercise: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    reps: {
        type: Number,
        required: true,
    },
});

const WorkoutModel = mongoose.model("workouts", WorkoutSchema);
module.exports = WorkoutModel;