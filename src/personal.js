import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import {Divider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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

export default function Personaldetails() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Example: Pushing data to Firebase database
    db.ref('personalDetails').push({
      firstName: document.getElementById('pg1').value,
      lastName: document.getElementById('pg2').value,
      Summary: document.getElementById('pg3').value,
      phoneNo: document.getElementById('pg4').value,
      emailAddress: document.getElementById('pg5').value,
      address: document.getElementById('pg6').value,
    }).then(() => {
      console.log('Personal details submitted successfully');
      navigate('/education');
    }).catch((error) => {
      console.error('Error submitting personal details:', error);
    });
  };

  return (
    <>
<Card sx={{ maxWidth: 900, marginTop:5,marginLeft:30}}>
<CardContent>
  <Typography variant="H1" component="div">
    Personal Details
  </Typography>
  <Typography variant="body2" color="text.secondary">
    Get started with the basics: your name and contact information
  </Typography>
  <Divider/>
  <br/>
  <TextField
    id="pg1"
    label="First Name"
    variant="outlined"
    size='small'
    sx={{ marginLeft: 0 ,width: 300}}
  />
 
    <TextField
    id="pg2"
    label="Last Name"
    variant="outlined"
    size='small'
    sx={{ marginLeft: 5,width: 300 }}
  />

  <br/>
  <br/>
  <TextField
    id="pg3"
    label="Summary"
    variant="outlined"
    size='small'
    sx={{ marginLeft: 0 ,width: 650  }}
  />
 <br></br><br></br>
    <TextField
    id="pg4"
    label="Phone no."
    variant="outlined"
    size='small'
    sx={{ marginLeft: 0,width: 300  }}
  />

  <TextField
    id="pg5"
    label="Email Address"
    variant="outlined"
    size='small'
    sx={{ marginLeft: 5 ,width: 300  }}
  />
  <br></br><br></br>
    <TextField
    id="pg6"
    label="Address"
    variant="outlined"
    size='small'
    sx={{ marginLeft: 0,width: 650  }}
  />
  
  <br/><br/>
<IconButton aria-label="next" onClick={handleSubmit}>
Next
<ArrowForwardIosIcon/>
</IconButton>
</CardContent>
</Card>
</>
);
}
