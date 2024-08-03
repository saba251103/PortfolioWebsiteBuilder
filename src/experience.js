// Import the useState hook for managing state
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import DeleteIcon from '@mui/icons-material/Delete';
import 'react-datepicker/dist/react-datepicker.css';

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

export default function Experience() {
  const [experienceForms, setExperienceForms] = useState([{ startDate: '', endDate: '', position: '', companyname: '', worksummary: '' }]);
  const navigate = useNavigate();

  const handleAddExperience = () => {
    setExperienceForms([...experienceForms, { startDate: '', endDate: '', position: '', companyname: '', worksummary: '' }]);
  };

  const handleDeleteExperience = (index) => {
    const updatedExperienceForms = [...experienceForms];
    updatedExperienceForms.splice(index, 1);
    setExperienceForms(updatedExperienceForms);
  };

  const handleSubmit = () => {
    experienceForms.forEach((experienceForm) => {

      // Assuming you have a 'educations' node in your Firebase database
      db.ref('experience').push(experienceForm)
        .then(() => {
          console.log('Experience form submitted successfully');
        })
        .catch((error) => {
          console.error('Error submitting education form:', error);
        });
    });
    navigate('/msg');
  };

  return (
    <Card sx={{ maxWidth: 900, marginTop: 5, marginLeft: 30 }}>
      <CardContent>
        <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
          <IconButton className='buttonplacement' onClick={() => { navigate('/education') }}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton className='buttonplacement' onClick={handleSubmit}>
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
        <Typography variant='b1' component="div">
        Professional Experience
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Tell us about your most recent job
        </Typography>
        <br />
        {experienceForms.map((form, index) => (
          <div key={index}>
            <TextField
              label="Position Title"
              variant="outlined"
              size='small'
              sx={{ marginLeft: 0, width: 300 }}
              value={form.schoolName}
              onChange={(e) => {
                const updatedForms = [...experienceForms];
                updatedForms[index].position = e.target.value;
                setExperienceForms(updatedForms);
              }}
            />
            <TextField
              label="Company Name"
              variant="outlined"
              size='small'
              sx={{ marginLeft: 5, width: 300 }}
              value={form.schoolLocation}
              onChange={(e) => {
                const updatedForms = [...experienceForms];
                updatedForms[index].companyname = e.target.value;
                setExperienceForms(updatedForms);
              }}
            />
            <br /><br />
            <TextField
              label="Start Date (dd-mm-yyyy)"
              variant="outlined"
              size='small'
              sx={{ marginLeft: 0, width: 650 }}
              value={form.startDate}
              onChange={(e) => {
                const updatedForms = [...experienceForms];
                updatedForms[index].startDate = e.target.value;
                setExperienceForms(updatedForms);
              }}
            />
            <br /><br />
            <TextField
              label="End Date (dd-mm-yyyy)"
              variant="outlined"
              size='small'
              sx={{ marginLeft: 0, width: 650 }}
              value={form.endDate}
              onChange={(e) => {
                const updatedForms = [...experienceForms];
                updatedForms[index].endDate = e.target.value;
                setExperienceForms(updatedForms);
              }}
            />
            <br /><br />
            <TextField
              label="Work Summary"
              variant="outlined"
              multiline
              size='small'
              sx={{ marginLeft: 0, width: 650 }}
              value={form.description}
              onChange={(e) => {
                const updatedForms = [...experienceForms];
                updatedForms[index].worksummary = e.target.value;
                setExperienceForms(updatedForms);
              }}
            />
            <br /><br />
            <IconButton aria-label="delete" onClick={() => handleDeleteExperience(index)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
        <IconButton aria-label="add" onClick={handleAddExperience}>
          Add more experience
          <AddIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}
