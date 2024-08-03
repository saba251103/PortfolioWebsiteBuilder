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

export default function Achievement() {
  const navigate = useNavigate();
  const [achieve, setAchieve] = useState([""]);

  const handleAddAchievement = () => {
    db.ref('achievements').push("").then(() => {
      setAchieve([...achieve, ""]);
    }).catch((error) => {
      console.error('Error adding achievement:', error);
    });
  };

  const handleAchieveChange = (value, index) => {
    const achievementRef = db.ref('achievements').child(index);
    achievementRef.set(value).then(() => {
      const updatedAchieve = [...achieve];
      updatedAchieve[index] = value;
      setAchieve(updatedAchieve);
    }).catch((error) => {
      console.error('Error updating achievement:', error);
    });
  };

  const handleDeleteAchievement = (index) => {
    db.ref('achievements').child(index).remove().then(() => {
      const updatedAchieve = [...achieve];
      updatedAchieve.splice(index, 1);
      setAchieve(updatedAchieve);
    }).catch((error) => {
      console.error('Error deleting achievement:', error);
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
            <IconButton className='buttonplacement' onClick={() => navigate('/resume')}>
              <ArrowForwardIosIcon />
            </IconButton>
          </div>
          <Typography variant="b1" component="div">
            Achievements
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tell us all about your achievements!
          </Typography>
          <br />
          <IconButton aria-label="add" onClick={handleAddAchievement}>
            Add achievements
            <AddIcon />
          </IconButton>
          {achieve.map((achievement, index) => (
            <div key={index}>
              <br />
              <TextField
                id={`achievement-${index + 1}`}
                label={`Achievement ${index + 1}`}
                variant="outlined"
                size='small'
                value={achievement}
                onChange={(e) => handleAchieveChange(e.target.value, index)}
                sx={{ marginLeft: 0, width: 800 }}
              />
              <Button onClick={() => handleDeleteAchievement(index)} sx={{ height: 42, width: 15 }}>x</Button>
              <br />
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
