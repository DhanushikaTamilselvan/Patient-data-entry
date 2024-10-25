const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/patientDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Patient Schema
const patientSchema = new mongoose.Schema({
  name: String,
  gender: String,
  age: Number,
  picture: String,
  phone: String,
  email: String,
  patientId: String,
  affectedSide: String,
  condition: String,
  specialty: String,
  medicalHistory: String,
  goalReached: Number
});

const Patient = mongoose.model('Patient', patientSchema);

// Get Profile
app.get('/api/profile/:id', async (req, res) => {
  const patient = await Patient.findOne({ patientId: req.params.id });
  res.json(patient);
});

// Get Goal
app.get('/api/goal/:id', async (req, res) => {
  const patient = await Patient.findOne({ patientId: req.params.id });
  res.json({ goalReached: patient.goalReached });
});

// Start Server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
