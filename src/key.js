import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import { ref, set } from 'firebase/database';
import { db } from './firebaseconfig';
import mainImage from './main.png';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box'; // Import Box

export default function Skills() {
  const [skill, setSkill] = useState('');
  const [personalDetails, setPersonalDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('resumeData'));
    if (storedData) {
      setPersonalDetails(storedData);
      if (storedData.skills) {
        setSkill(storedData.skills);
      }
    }
  }, []);

  const handleChangeSkill = (e) => {
    setSkill(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Save skill details to local storage
      const storedData = JSON.parse(localStorage.getItem('resumeData')) || {};
      storedData.skills = skill;
      localStorage.setItem('resumeData', JSON.stringify(storedData));

      // Save skill details to Firebase under the current user's unique ID
      const mobile_number = personalDetails.mobile_number;
      const userSkillsRef = ref(db, `users/${mobile_number}/skills`);
      await set(userSkillsRef, skill);

      // Navigate to the next page
      navigate('/design1');
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Card sx={{ maxWidth: 1500, mb: 4 }}>
          <CardMedia component="img" image={mainImage} height="450" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" align="center">
              ONLINE RESUME BUILDER
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              LET'S CREATE RESUMES....
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: '66.67%', maxWidth: 1200, mb: 4 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <IconButton onClick={() => navigate('/education')}>
                <ArrowBackIosNewIcon />
              </IconButton>
              <Typography variant="h4" component="div" align="center" sx={{ flexGrow: 1 }}>
                Skills
              </Typography>
              <IconButton onClick={handleSubmit}>
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary" align="center" mb={2}>
              Add your skills here
            </Typography>
            <TextField
              label="Skill"
              variant="outlined"
              size='small'
              sx={{ width: 300, display: 'block', margin: 'auto' }}
              value={skill}
              onChange={handleChangeSkill}
            />
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
