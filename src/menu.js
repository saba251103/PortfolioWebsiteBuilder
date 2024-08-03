import * as React from 'react';
import mainImage from './main.png';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Personaldetails from './personal';
import Experience from './experience';
import Education from './education';
import MediaCard from './msg';
import Skill from './key';
import Achievement from './achievement';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResumePage from './resume';

export default function DenseAppBar() {
  return (
    <Router>
      <>
        <div>
          <Card sx={{ maxWidth: 1500 }}>
            <CardMedia component="img" image={mainImage} height="450" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                ONLINE RESUME BUILDER
              </Typography>
              <Typography variant="body2" color="text.secondary">
                LET'S CREATE RESUMES....
              </Typography>
            </CardContent>
          </Card>
        </div>
        <Routes>
          <Route path="/msg" element={<MediaCard />} />
          <Route path="/education" element={<Education />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/" element={<Personaldetails />} />
          <Route path="/key" element={<Skill />} />
          <Route path="/achievement" element={<Achievement />} />
          <Route path="/resume" element={<ResumePage/>} />
        </Routes>
      </>
    </Router>
  );
}
