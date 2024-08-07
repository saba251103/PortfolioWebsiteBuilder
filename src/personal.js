import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import { ref as dbRef, set } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebaseconfig';
import mainImage from './main.png';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';

export default function Personaldetails() {
  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    email: '',
    mobile_number: '',
    summary: '',
    github: '',
    image1: null,
    image2: null
  });
  const [image1URL, setImage1URL] = useState(null);
  const [image2URL, setImage2URL] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('resumeData'));
    if (storedData) {
      setPersonalDetails(storedData);
    }
  }, []);

  const handleChange = (e) => {
    setPersonalDetails({
      ...personalDetails,
      [e.target.id]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    const file = files[0];

    if (file) {
      const fileURL = URL.createObjectURL(file);
      if (id === 'image1') {
        setImage1URL(fileURL);
      } else if (id === 'image2') {
        setImage2URL(fileURL);
      }

      setPersonalDetails({
        ...personalDetails,
        [id]: file
      });
    }
  };

  const handleSubmit = async () => {
    try {
      console.log('Saving to Firebase:', personalDetails);
      localStorage.setItem('userMobileNumber', personalDetails.mobile_number);
      localStorage.setItem('usergithub', personalDetails.github);
      // Save personal details to Firebase Realtime Database
      const personalDetailsRef = dbRef(db, `users/${personalDetails.mobile_number}/personalDetails`);
      await set(personalDetailsRef, {
        name: personalDetails.name,
        email: personalDetails.email,
        mobile_number: personalDetails.mobile_number,
        summary: personalDetails.summary,
        github: personalDetails.github
      });

      // Upload images to Firebase Storage and save their URLs
      if (personalDetails.image1) {
        const image1Ref = storageRef(storage, `images/${personalDetails.mobile_number}_image1`);
        await uploadBytes(image1Ref, personalDetails.image1);
        const image1URL = await getDownloadURL(image1Ref);
        await set(dbRef(db, `users/${personalDetails.mobile_number}/personalDetails/image1`), image1URL);
      }

      if (personalDetails.image2) {
        const image2Ref = storageRef(storage, `images/${personalDetails.mobile_number}_image2`);
        await uploadBytes(image2Ref, personalDetails.image2);
        const image2URL = await getDownloadURL(image2Ref);
        await set(dbRef(db, `users/${personalDetails.mobile_number}/personalDetails/image2`), image2URL);
      }

      // Save details to local storage
      localStorage.setItem('resumeData', JSON.stringify(personalDetails));

      // Navigate to the next page
      navigate('/education');
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
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
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Typography variant="h4" component="div" align="center">
                Personal Details
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Update your personal information
              </Typography>
              <br />
              <Box display="flex" flexDirection="row" gap={2} mb={2}>
                <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                  size="small"
                  sx={{ width: 300 }}
                  value={personalDetails.name || ''}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
                <TextField
                  id="email"
                  label="Email Address"
                  variant="outlined"
                  size="small"
                  sx={{ width: 300 }}
                  value={personalDetails.email || ''}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </Box>
              <Box display="flex" flexDirection="row" gap={2} mb={2}>
                <TextField
                  id="mobile_number"
                  label="Phone Number"
                  variant="outlined"
                  size="small"
                  sx={{ width: 300 }}
                  value={personalDetails.mobile_number || ''}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
                <TextField
                  id="github"
                  label="GitHub Username"
                  variant="outlined"
                  size="small"
                  sx={{ width: 300 }}
                  value={personalDetails.github || ''}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </Box>
              <Box display="flex" flexDirection="row" gap={2} mb={2}>
                <TextField
                  id="image1"
                  type="file"
                  variant="outlined"
                  size="small"
                  sx={{ width: 300 }}
                  onChange={handleFileChange}
                />
                <TextField
                  id="image2"
                  type="file"
                  variant="outlined"
                  size="small"
                  sx={{ width: 300 }}
                  onChange={handleFileChange}
                />
              </Box>
              {image1URL && <img src={image1URL} alt="Preview of uploaded image 1" style={{ width: '150px', margin: '10px' }} />}
              {image2URL && <img src={image2URL} alt="Preview of uploaded image 2" style={{ width: '150px', margin: '10px' }} />}
              <TextField
                id="summary"
                label="Summary"
                variant="outlined"
                size="small"
                multiline
                rows={4}
                sx={{ width: 600, mb: 2 }}
                value={personalDetails.summary || ''}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              <br />
              <Box display="flex" justifyContent="center" width="100%">
                <IconButton aria-label="next" onClick={handleSubmit}>
                  Next
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
