import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCuHxNgxFtseUoTnq0sx0CZxZ-xa_hw4AM",
  authDomain: "resume-82b69.firebaseapp.com",
  databaseURL: "https://resume-82b69-default-rtdb.firebaseio.com",
  projectId: "resume-82b69",
  storageBucket: "resume-82b69.appspot.com",
  messagingSenderId: "480709385047",
  appId: "1:480709385047:web:ebe6eaf48e790e1110fc12",
  measurementId: "G-4LE17G5WKH"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();

export default function DisplayDetails() {
  const navigate = useNavigate();
  const [personalDetails, setPersonalDetails] = useState(null);
  const [educationDetails, setEducationDetails] = useState([]);

  useEffect(() => {
    // Fetch personal details
    db.ref('personalDetails').once('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPersonalDetails(data);
      }
    }, (error) => {
      console.error('Error fetching personal details:', error);
    });

    // Fetch education details
    db.ref('education').once('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setEducationDetails(Object.values(data));
      }
    }, (error) => {
      console.error('Error fetching education details:', error);
    });
  }, []);

  return (
    <div>
      <Card sx={{ maxWidth: 900, marginTop: 5, marginLeft: 30 }}>
        <CardContent>
          <Typography variant="h1" component="div">
            Personal Details
          </Typography>
          {personalDetails && (
            <div>
              <Typography>Name: {personalDetails.firstName} {personalDetails.lastName}</Typography>
              <Typography>Job Title: {personalDetails.jobTitle}</Typography>
              <Typography>Phone Number: {personalDetails.phoneNo}</Typography>
              <Typography>Email Address: {personalDetails.emailAddress}</Typography>
              <Typography>Address: {personalDetails.address}</Typography>
              <Typography>City: {personalDetails.city}</Typography>
              <Typography>Zip Code: {personalDetails.zipCode}</Typography>
              <Typography>State: {personalDetails.state}</Typography>
              <Typography>Country: {personalDetails.country}</Typography>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 900, marginTop: 5, marginLeft: 30 }}>
        <CardContent>
          <Typography variant="h1" component="div">
            Education Details
          </Typography>
          {educationDetails.map((education, index) => (
            <div key={index}>
              <Typography>School Name: {education.schoolName}</Typography>
              <Typography>Location: {education.schoolLocation}</Typography>
              <Typography>Start Date: {education.startDate}</Typography>
              <Typography>End Date: {education.endDate}</Typography>
              <Typography>Description: {education.description}</Typography>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
