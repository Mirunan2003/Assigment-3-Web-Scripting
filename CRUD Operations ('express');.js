const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

// CREATE a new workout
router.post('/workouts', async (req, res) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    res.redirect('/workouts');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating workout');
  }
});

// READ all workouts
router.get('/workouts', async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.render('workouts', { workouts });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching workouts');
  }
});

// UPDATE a workout
router.post('/workouts/edit/:id', async (req, res) => {
  try {
    await Workout.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/workouts');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating workout');
  }
});

// DELETE a workout
router.post('/workouts/delete/:id', async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.redirect('/workouts');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting workout');
  }
});

module.exports = router;
