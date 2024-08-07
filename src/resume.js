import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';

export default function DisplayDetails() {
  const navigate = useNavigate();
  const [personalDetails, setPersonalDetails] = useState(null);
  const [educationDetails, setEducationDetails] = useState([]);

  useEffect(() => {
    // Mock fetching personal details
    // Replace this with actual data fetching logic
    const fetchedPersonalDetails = {
      firstName: "John",
      lastName: "Doe",
      jobTitle: "Software Engineer",
      phoneNo: "123-456-7890",
      emailAddress: "john.doe@example.com",
      address: "123 Main St",
      city: "Anytown",
      zipCode: "12345",
      state: "CA",
      country: "USA"
    };
    
    // Mock fetching education details
    // Replace this with actual data fetching logic
    const fetchedEducationDetails = [
      {
        schoolName: "University of Example",
        schoolLocation: "Anytown, CA",
        startDate: "2010-09-01",
        endDate: "2014-06-30",
        description: "Bachelor of Science in Computer Science"
      }
    ];

    setPersonalDetails(fetchedPersonalDetails);
    setEducationDetails(fetchedEducationDetails);
  }, []);

  return (
    <div>
      <Card sx={{ maxWidth: 900, marginTop: 5, marginLeft: 30 }}>
        <CardContent>
          <Typography variant="h1" component="div">
            Personal Details
          </Typography>
          {personalDetails && (
            <div>
              <Typography>Name: {personalDetails.firstName} {personalDetails.lastName}</Typography>
              <Typography>Job Title: {personalDetails.jobTitle}</Typography>
              <Typography>Phone Number: {personalDetails.phoneNo}</Typography>
              <Typography>Email Address: {personalDetails.emailAddress}</Typography>
              <Typography>Address: {personalDetails.address}</Typography>
              <Typography>City: {personalDetails.city}</Typography>
              <Typography>Zip Code: {personalDetails.zipCode}</Typography>
              <Typography>State: {personalDetails.state}</Typography>
              <Typography>Country: {personalDetails.country}</Typography>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 900, marginTop: 5, marginLeft: 30 }}>
        <CardContent>
          <Typography variant="h1" component="div">
            Education Details
          </Typography>
          {educationDetails.map((education, index) => (
            <div key={index}>
              <Typography>School Name: {education.schoolName}</Typography>
              <Typography>Location: {education.schoolLocation}</Typography>
              <Typography>Start Date: {education.startDate}</Typography>
              <Typography>End Date: {education.endDate}</Typography>
              <Typography>Description: {education.description}</Typography>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
