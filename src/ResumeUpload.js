// ResumeUpload.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import mainImage from './main.png';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError('Please upload a file.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await axios.post('http://localhost:5000/api/data', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const resumeData = response.data;
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
        setError('');
        navigate('/personal'); // Navigate to the personal details page after successful upload
      } else {
        setError('Error uploading file. Please try again.');
      }
    } catch (err) {
      setError('Error uploading file. Please try again.');
      console.error(err);
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
        <Box 
          sx={{ 
            maxWidth: '1000px', 
            width: '100%', 
            backgroundColor: '#fff', 
            padding: '2rem', 
            border: '1px solid #ccc', 
            borderRadius: '30px',
            boxShadow: 3,
            textAlign: 'center'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Upload Your Resume
          </Typography>
          <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
            <input 
              type="file" 
              onChange={handleFileChange} 
            />
            <button
              type="submit"
              style={{ padding: '0.5rem 1rem', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Upload
            </button>
          </form>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </Box>
    </>
  );
};

export default ResumeUpload;
