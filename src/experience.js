import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { ref, set } from 'firebase/database';
import { db } from './firebaseconfig';
import mainImage from './main.png';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box'; // Import Box

export default function Experience() {
  const [experienceForms, setExperienceForms] = useState([{ company_name: '', designation: '' }]);
  const [personalDetails, setPersonalDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('resumeData'));
    if (storedData) {
      setPersonalDetails(storedData);
      if (storedData.experience) {
        setExperienceForms(storedData.experience);
      }
    }
  }, []);

  const handleAddExperience = () => {
    setExperienceForms([...experienceForms, { company_name: '', designation: '' }]);
  };

  const handleDeleteExperience = (index) => {
    const updatedExperienceForms = [...experienceForms];
    updatedExperienceForms.splice(index, 1);
    setExperienceForms(updatedExperienceForms);
  };

  const handleChangeExperience = (index, field, value) => {
    const updatedExperienceForms = [...experienceForms];
    updatedExperienceForms[index] = { ...updatedExperienceForms[index], [field]: value };
    setExperienceForms(updatedExperienceForms);
  };

  const handleSubmit = async () => {
    try {
      // Save experience details to local storage
      const storedData = JSON.parse(localStorage.getItem('resumeData')) || {};
      storedData.experience = experienceForms;
      localStorage.setItem('resumeData', JSON.stringify(storedData));

      // Save experience details to Firebase under the current user's unique ID
      const mobile_number = personalDetails.mobile_number;
      const userExperienceRef = ref(db, `users/${mobile_number}/experience`);
      await set(userExperienceRef, experienceForms);

      // Navigate to the next page
      navigate('/key');
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
                Experience
              </Typography>
              <IconButton onClick={handleSubmit}>
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary" align="center" mb={2}>
              Add your work experience here
            </Typography>
            {experienceForms.map((form, index) => (
              <Box key={index} display="flex" flexDirection="column" alignItems="center" mb={2}>
                <Box display="flex" flexDirection="row" gap={2} mb={1}>
                  <TextField
                    label="Company Name"
                    variant="outlined"
                    size="small"
                    sx={{ width: 300 }}
                    value={form.company_name}
                    onChange={(e) => handleChangeExperience(index, 'company_name', e.target.value)}
                  />
                  <TextField
                    label="Position Title"
                    variant="outlined"
                    size="small"
                    sx={{ width: 300 }}
                    value={form.designation}
                    onChange={(e) => handleChangeExperience(index, 'designation', e.target.value)}
                  />
                </Box>
                <IconButton aria-label="delete" onClick={() => handleDeleteExperience(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Box display="flex" justifyContent="center" mb={2}>
              <IconButton aria-label="add" onClick={handleAddExperience}>
                Add more Experience
                <AddIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
