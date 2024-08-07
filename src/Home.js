import React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InstagramIcon from '@mui/icons-material/Instagram';
import SearchIcon from '@mui/icons-material/Search';
import FacebookIcon from '@mui/icons-material/Facebook';
import Button from '@mui/material/Button';
import logo from './logo.png';
import './App.css';
import front from './front.png';
import divider from './divider1.png';
import image2 from './image2.png';
import image3 from './image3.png';
import image4 from './image4.png';
import image5 from './image5.png';
import image8 from './about.png';

import { useNavigate } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'center',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  backgroundColor: 'Menu',
  '@media all': {
    minHeight: 50,
  },
}));

const MenuButton = styled(Button)(({ theme }) => ({
  color: 'black',
  marginRight: theme.spacing(3),
}));

const ContactContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(4),
  textAlign: 'center',
  marginTop: theme.spacing(4),
}));

const ContactInfo = styled(Box)(({ theme }) => ({
  margin: '0 auto',
  maxWidth: '600px',
  textAlign: 'left',
}));

const ContactTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Atteron',
  marginBottom: theme.spacing(2),
}));

const ContactText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Anahaw',
  marginBottom: theme.spacing(1),
}));

export default function Home() {
  const navigate = useNavigate(); 

  const openInstagram = () => {
    window.open('https://www.instagram.com', '_blank');
  };

  const openFacebook = () => {
    window.open('https://www.facebook.com', '_blank');
  };

  const handleLogin = () => {
   navigate('/Login');
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <StyledToolbar>
            <IconButton size="large" aria-label="search">
              <SearchIcon />
            </IconButton>

            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}
            >
              <img src={logo} alt="displaying logo That Trifecta Muse" width={200} />
            </Typography>

            <IconButton size="large" aria-label="instagram" onClick={openInstagram}>
              <InstagramIcon />
            </IconButton>
            <IconButton size="large" aria-label="Facebook" onClick={openFacebook}>
              <FacebookIcon />
            </IconButton>
          </StyledToolbar>
        </AppBar>

        <AppBar position="static" sx={{ marginTop: 2 }}>
          <StyledToolbar sx={{ justifyContent: 'center' }}>
            <MenuButton href="#home" title="Home">Home</MenuButton>
            <MenuButton href="#about" title="About Us">About Us</MenuButton>
            <MenuButton href="#contact" title="Contact Us">Contact Us</MenuButton>
           </StyledToolbar>
        </AppBar>

        <Box id="home" sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'Menu', padding: '2%' }}>
          <img
            src={front}
            alt="Front display"
            style={{ maxWidth: '45%', marginRight: '5%' }}
          />
          <Box sx={{ textAlign: 'left', justifyContent: 'center', justifyItems: 'left', maxWidth: '50%' }}>
            <Typography className='start' variant="h3" sx={{ marginBottom: '1%', textAlign: 'center', fontFamily: 'Atteron' }}>
              Make Your Vision a Reality <br />
              _________
            </Typography>
            <br />
            <Typography variant="body1">
              Welcome to That Trifecta Muse! Embark on a creative journey with us to build a portfolio website that truly represents you. We believe in the power of unique expression and are here to help you craft a digital space that stands out.
            </Typography>
            <br />
            <Button
              variant="outlined"
              id='1'
              sx={{ color: 'black', borderColor: 'black', display: 'block', mx: 'auto' }}
              onClick={handleLogin}
            >
              Get Started
            </Button>
          </Box>
        </Box>

      </Box>
      <img
        src={divider}
        alt="Dividing components"
        style={{ maxWidth: '100%', marginLeft: 0 }}
      />
      <Box sx={{ textAlign: 'left', justifyContent: 'center', justifyItems: 'left', backgroundColor: 'Menu' }}>
        <br />
        <Typography className='new-arrival' variant="h3" sx={{ marginBottom: '1%', textAlign: 'center', fontFamily: 'Atteron' }}>
         See Stunning Portfolios Built with Us
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          {[image2, image5, image4].map((image, index) => (
            <Box key={index} sx={{ maxWidth: '30%', textAlign: 'center' }}>
              <img
                id={`${index + 1}`}
                src={image}
                alt={`Design ${index + 1}`}
                style={{ width: '100%', cursor: 'pointer' }}
              />
             </Box>
          ))}
        </Box>
        <br />
      </Box>
      <img
        src={divider}
        alt="Divider"
        style={{ maxWidth: '100%', marginLeft: 0 }}
      />
      <Box id="about" sx={{ textAlign: 'left', justifyContent: 'center', justifyItems: 'left', backgroundColor: 'Menu' }}>
        <br />
      </Box>
      <br />
      <img
        src={divider}
        alt="Divider"
        style={{ maxWidth: '100%', marginLeft: 0 }}
      />
      <br />
      <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'Menu', padding: '2%' }}>
        <img
          src={image8}
          alt="About Us"
          style={{ maxWidth: '50%', marginLeft: '5%' }}
        />
        <Box sx={{ textAlign: 'justify', justifyContent: 'center', justifyItems: 'left', maxWidth: '60%', marginLeft: '5%', marginRight: '3%' }}>
          <Typography className='new-arrival' variant="h3" sx={{ marginBottom: '1%', textAlign: 'center', fontFamily: 'Atteron' }}>
            About <br />
            Us
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', fontFamily: 'Anahaw' }}>
            Trifecta: Where Code Meets Innovation
          </Typography>
          <br />
          <Typography variant="body2">
            We are Trifecta, a team of 4 passionate students fueled by a love for coding . The Webathon Hackathon is more than just a competition; it's an opportunity to learn, collaborate, and contribute to the future . We are excited to share our ideas with the Tech community and see how technology can shape the way we express ourselves through our portfolio website.
          </Typography>
          <br />
        </Box>
      </Box>
      <br />
      <ContactContainer id="contact">
        <footer className="footer">
          <ContactInfo>
            <ContactTitle variant="h4">Contact Us</ContactTitle>
            <ContactText variant="body1">Email: support@thattrifectamuse.com</ContactText>
            <ContactText variant="body1">Phone: +123-456-7890</ContactText>
            <ContactText variant="body1">Address: Sardar Patel Institute Of Technology, Andheri</ContactText>
          </ContactInfo>
        </footer>
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="body2">&copy; 2024 Trifecta. All rights reserved.</Typography>
        </Box>
      </ContactContainer>
    </div>
  );
}

