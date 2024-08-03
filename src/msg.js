import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function MediaCard() {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 900, height: 200, marginTop: 5, marginLeft: 30 }}>
      <div>
        <IconButton className='buttonplacement' onClick={()=>{navigate('/experience')}}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton className='buttonplacement' onClick={()=>{navigate('/key')}}>
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <CelebrationIcon />
          Excellent progress! Now, let's highlight your key skills.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Incorporate keywords from job descriptions so employers and applicant tracking systems can scan your resume.
          <br />
          Highlight a mix of hard skills like programming and soft skills like team management.
        </Typography>
      </CardContent>

          </Card>
  );
}
