import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [goal, setGoal] = useState(0);

  useEffect(() => {
    // Fetch profile details
    axios.get('/api/profile/12345')
      .then(response => {
        setProfile(response.data);
      });
      
    // Fetch goal progress
    axios.get('/api/goal/12345')
      .then(response => {
        setGoal(response.data.goalReached);
      });
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={profile.picture} alt="Profile" className="profile-pic" />
        <h2>{profile.name}</h2>
        <p>ID: {profile.patientId}</p>
      </div>

      <div className="contact-info">
        <p>Phone: {profile.phone}</p>
        <p>Email: {profile.email}</p>
      </div>

      <div className="medical-details">
        <h3>Medical Details</h3>
        <p>Affected Side: {profile.affectedSide}</p>
        <p>Condition: {profile.condition}</p>
        <p>Specialty: {profile.specialty}</p>
        <div className="medical-history">
          <h4>Medical History</h4>
          <p>{profile.medicalHistory}</p>
        </div>
      </div>

      <div className="goal-progress">
        <h3>Goal Progress</h3>
        <div className="semi-circle">
          <span>{goal}%</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
