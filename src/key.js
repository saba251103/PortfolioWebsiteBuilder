import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button } from '@mui/material';
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

export default function Skill() {
  const navigate = useNavigate();
  const [skill, setSkill] = useState([""]);

  const handleAddSkill = () => {
    db.ref('skills').push("").then(() => {
      setSkill([...skill, ""]);
    }).catch((error) => {
      console.error('Error adding achievement:', error);
    });
  };

  const handleSkillChange = (value, index) => {
    const skillRef = db.ref('skills').child(index);
    skillRef.set(value).then(() => {
      const updatedskill= [...skill];
      updatedskill[index] = value;
      setSkill(updatedskill);
    }).catch((error) => {
      console.error('Error updating skills:', error);
    });
  };

  const handleDeleteSkill = (index) => {
    db.ref('skills').child(index).remove().then(() => {
      const updatedskill = [...skill];
      updatedskill.splice(index, 1);
      setSkill(updatedskill);
    }).catch((error) => {
      console.error('Error deleting skills:', error);
    });
  };

  return (
    <>
      <Card sx={{ maxWidth: 900, marginTop: 5, marginLeft: 30 }}>
        <CardContent>
          <div>
            <IconButton className='buttonplacement' onClick={() => navigate('/key')}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton className='buttonplacement' onClick={() => navigate('/achievement')}>
              <ArrowForwardIosIcon />
            </IconButton>
          </div>
          <Typography variant="b1" component="div">
            Skill
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tell us all about your skills!
          </Typography>
          <br />
          <IconButton aria-label="add" onClick={handleAddSkill}>
            Add skills
            <AddIcon />
          </IconButton>
          {skill.map((skill, index) => (
            <div key={index}>
              <br />
              <TextField
                id={`skill-${index + 1}`}
                label={`Skill ${index + 1}`}
                variant="outlined"
                size='small'
                value={skill}
                onChange={(e) => handleSkillChange(e.target.value, index)}
                sx={{ marginLeft: 0, width: 800 }}
              />
              <Button onClick={() => handleDeleteSkill(index)} sx={{ height: 42, width: 15 }}>x</Button>
              <br />
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
