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
import { ref, set, get } from 'firebase/database';
import { db } from './firebaseconfig';
import mainImage from './main.png';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box'; // Import Box

export default function Education() {
  const [educationForms, setEducationForms] = useState([{ college_name: '', degree: '' }]);
  const [personalDetails, setPersonalDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('resumeData'));
    if (storedData) {
      setPersonalDetails(storedData);

      const fetchEducationData = async () => {
        try {
          const mobile_number = storedData.mobile_number;
          const userEducationRef = ref(db, `users/${mobile_number}/education`);
          const snapshot = await get(userEducationRef);
          if (snapshot.exists()) {
            console.log("Fetched data:", snapshot.val()); // Debugging line
            setEducationForms(snapshot.val() || [{ college_name: '', degree: '' }]);
          }
        } catch (error) {
          console.error("Error fetching education data: ", error);
        }
      };

      fetchEducationData();
    }
  }, []);

  const handleAddEducation = () => {
    setEducationForms([...educationForms, { college_name: '', degree: '' }]);
  };

  const handleDeleteEducation = (index) => {
    const updatedEducationForms = [...educationForms];
    updatedEducationForms.splice(index, 1);
    setEducationForms(updatedEducationForms);
  };

  const handleEducationChange = (index, field, value) => {
    const updatedForms = [...educationForms];
    updatedForms[index] = { ...updatedForms[index], [field]: value };
    setEducationForms(updatedForms);
  };

  const handleSubmit = async () => {
    try {
      const mobile_number = personalDetails.mobile_number;
      const userEducationRef = ref(db, `users/${mobile_number}/education`);
      
      // Structure the data correctly before saving to Firebase
      const educationData = educationForms.map(item => ({
        college_name: item.college_name.trim(),
        degree: item.degree.trim()
      }));

      await set(userEducationRef, educationData);

      personalDetails.education = educationData;
      localStorage.setItem('resumeData', JSON.stringify(personalDetails));

      navigate('/experience');
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
              <IconButton onClick={() => navigate('/')}>
                <ArrowBackIosNewIcon />
              </IconButton>
              <Typography variant="h4" component="div" align="center" sx={{ flexGrow: 1 }}>
                Education
              </Typography>
              <IconButton onClick={handleSubmit}>
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary" align="center" mb={2}>
              Add your most relevant education, including the program you're currently enrolled in.
            </Typography>
            {educationForms.map((form, index) => (
              <Box key={index} display="flex" flexDirection="column" alignItems="center" mb={2}>
                <Box display="flex" flexDirection="row" gap={2} mb={1}>
                  <TextField
                    label="College Name"
                    variant="outlined"
                    size="small"
                    sx={{ width: 300 }}
                    value={form.college_name} // Correctly binding value
                    onChange={(e) => handleEducationChange(index, 'college_name', e.target.value)}
                  />
                  <TextField
                    label="Degree"
                    variant="outlined"
                    size="small"
                    sx={{ width: 300 }}
                    value={form.degree} // Correctly binding value
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                  />
                </Box>
                <IconButton aria-label="delete" onClick={() => handleDeleteEducation(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Box display="flex" justifyContent="center" mb={2}>
              <IconButton aria-label="add" onClick={handleAddEducation}>
                Add more education
                <AddIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
