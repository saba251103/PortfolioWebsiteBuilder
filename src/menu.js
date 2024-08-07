// menu.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import ResumePage from './resume';
import ResumeUpload from './ResumeUpload';
import Home from './Home'
export default function DenseAppBar() {
  return (
    <Router>
      <>
        <div>
         
          < Home />
         
        </div>
       
      </>
    </Router>
  );
}
