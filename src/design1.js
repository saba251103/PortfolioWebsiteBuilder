
import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import './App.css';
import front from './front.png';
import { Card, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import background from './background.png';
import JSZip from 'jszip';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import 'firebase/compat/database'; 
import axios from 'axios';

const themes = {
    dark: [
      { background: '#000000', text: '#FFFFFF' },
      { background: '#1a1a1a', text: '#e0e0e0' },
      { background: '#2b2b2b', text: '#f5f5f5' },
      { background: '#333333', text: '#dddddd' },
      { background: '#3d3d3d', text: '#cccccc' },
      { background: '#454545', text: '#bbbbbb' },
      { background: '#4d4d4d', text: '#aaaaaa' },
      { background: '#555555', text: '#999999' },
      { background: '#5d5d5d', text: '#888888' },
      { background: '#666666', text: '#777777' },
      { background: '#707070', text: '#666666' },
      { background: '#787878', text: '#555555' },
      { background: '#808080', text: '#444444' },
      { background: '#888888', text: '#333333' },
      { background: '#909090', text: '#222222' },
      { background: '#989898', text: '#111111' },
      { background: '#a0a0a0', text: '#000000' },
      { background: '#a8a8a8', text: '#0f0f0f' },
      { background: '#b0b0b0', text: '#1f1f1f' },
      { background: '#b8b8b8', text: '#2f2f2f' },
    ],
    light: [
      { background: '#FFFFFF', text: '#000000' },
      { background: '#f8f8f8', text: '#111111' },
      { background: '#f0f0f0', text: '#222222' },
      { background: '#e8e8e8', text: '#333333' },
      { background: '#e0e0e0', text: '#444444' },
      { background: '#d8d8d8', text: '#555555' },
      { background: '#d0d0d0', text: '#666666' },
      { background: '#c8c8c8', text: '#777777' },
      { background: '#c0c0c0', text: '#888888' },
      { background: '#b8b8b8', text: '#999999' },
      { background: '#b0b0b0', text: '#aaaaaa' },
      { background: '#a8a8a8', text: '#bbbbbb' },
      { background: '#a0a0a0', text: '#cccccc' },
      { background: '#989898', text: '#dddddd' },
      { background: '#909090', text: '#eeeeee' },
      { background: '#888888', text: '#ffffff' },
      { background: '#808080', text: '#0f0f0f' },
      { background: '#787878', text: '#1f1f1f' },
      { background: '#707070', text: '#2f2f2f' },
      { background: '#686868', text: '#3f3f3f' },
    ],
    triadic: [
      { background: '#FF5733', text: '#33FF57' },
      { background: '#FF6F47', text: '#33FF57' },
      { background: '#FF875B', text: '#33FF57' },
      { background: '#FF9F6F', text: '#33FF57' },
      { background: '#FFB783', text: '#33FF57' },
      { background: '#FFD097', text: '#33FF57' },
      { background: '#FFE8AB', text: '#33FF57' },
      { background: '#FFF0BF', text: '#33FF57' },
      { background: '#FF5733', text: '#3F4FFF' },
      { background: '#FF6F47', text: '#4FFF3F' },
      { background: '#FF875B', text: '#3F4FFF' },
      { background: '#FF9F6F', text: '#4FFF3F' },
      { background: '#FFB783', text: '#3F4FFF' },
      { background: '#FFD097', text: '#4FFF3F' },
      { background: '#FFE8AB', text: '#3F4FFF' },
      { background: '#FFF0BF', text: '#4FFF3F' },
      { background: '#FF5733', text: '#4FFF3F' },
      { background: '#FF6F47', text: '#3F4FFF' },
      { background: '#FF875B', text: '#4FFF3F' },
      { background: '#FF9F6F', text: '#3F4FFF' },
    ],
    complementary: [
      { background: '#001F3F', text: '#FF4136' },
      { background: '#002B4F', text: '#FF4136' },
      { background: '#00375F', text: '#FF4136' },
      { background: '#00436F', text: '#FF4136' },
      { background: '#00507F', text: '#FF4136' },
      { background: '#005C8F', text: '#FF4136' },
      { background: '#00689F', text: '#FF4136' },
      { background: '#0074AF', text: '#FF4136' },
      { background: '#001F3F', text: '#FF534F' },
      { background: '#002B4F', text: '#FF534F' },
      { background: '#00375F', text: '#FF534F' },
      { background: '#00436F', text: '#FF534F' },
      { background: '#00507F', text: '#FF534F' },
      { background: '#005C8F', text: '#FF534F' },
      { background: '#00689F', text: '#FF534F' },
      { background: '#0074AF', text: '#FF534F' },
      { background: '#001F3F', text: '#FF6657' },
      { background: '#002B4F', text: '#FF6657' },
      { background: '#00375F', text: '#FF6657' },
      { background: '#00436F', text: '#FF6657' },
    ],
    ocean: [
      { background: '#0077B6', text: '#90E0EF' },
      { background: '#00629A', text: '#90E0EF' },
      { background: '#00508E', text: '#90E0EF' },
      { background: '#004582', text: '#90E0EF' },
      { background: '#003B76', text: '#90E0EF' },
      { background: '#00316A', text: '#90E0EF' },
      { background: '#00275E', text: '#90E0EF' },
      { background: '#001D52', text: '#90E0EF' },
      { background: '#0077B6', text: '#A0F0EF' },
      { background: '#00629A', text: '#A0F0EF' },
      { background: '#00508E', text: '#A0F0EF' },
      { background: '#004582', text: '#A0F0EF' },
      { background: '#003B76', text: '#A0F0EF' },
      { background: '#00316A', text: '#A0F0EF' },
      { background: '#00275E', text: '#A0F0EF' },
      { background: '#001D52', text: '#A0F0EF' },
      { background: '#0077B6', text: '#B0FFEF' },
      { background: '#00629A', text: '#B0FFEF' },
      { background: '#00508E', text: '#B0FFEF' },
      { background: '#004582', text: '#B0FFEF' },
    ],
    forest: [
      { background: '#2E8B57', text: '#F0E68C' },
      { background: '#26774B', text: '#F0E68C' },
      { background: '#1E6340', text: '#F0E68C' },
      { background: '#165034', text: '#F0E68C' },
      { background: '#0E3C28', text: '#F0E68C' },
      { background: '#06291C', text: '#F0E68C' },
      { background: '#002610', text: '#F0E68C' },
      { background: '#004B1C', text: '#F0E68C' },
      { background: '#00602B', text: '#F0E68C' },
      { background: '#00753B', text: '#F0E68C' },
      { background: '#008A4A', text: '#F0E68C' },
      { background: '#009F59', text: '#F0E68C' },
      { background: '#00B469', text: '#F0E68C' },
      { background: '#00C978', text: '#F0E68C' },
      { background: '#00DE87', text: '#F0E68C' },
      { background: '#00F396', text: '#F0E68C' },
      { background: '#10F7A5', text: '#F0E68C' },
      { background: '#20FBB4', text: '#F0E68C' },
      { background: '#30FFC3', text: '#F0E68C' },
      { background: '#40FFD2', text: '#F0E68C' },
    ],
    sunset: [
      { background: '#FF4500', text: '#FFD700' },
      { background: '#FF5200', text: '#FFD700' },
      { background: '#FF5F00', text: '#FFD700' },
      { background: '#FF6C00', text: '#FFD700' },
      { background: '#FF7900', text: '#FFD700' },
      { background: '#FF8600', text: '#FFD700' },
      { background: '#FF9300', text: '#FFD700' },
      { background: '#FFA000', text: '#FFD700' },
      { background: '#FFAD00', text: '#FFD700' },
      { background: '#FFBA00', text: '#FFD700' },
      { background: '#FFC700', text: '#FFD700' },
      { background: '#FFD400', text: '#FFD700' },
      { background: '#FFE100', text: '#FFD700' },
      { background: '#FFEE00', text: '#FFD700' },
      { background: '#FFFB00', text: '#FFD700' },
      { background: '#FFFF00', text: '#FFD700' },
      { background: '#F8F800', text: '#FFD700' },
      { background: '#F1F100', text: '#FFD700' },
      { background: '#EAEA00', text: '#FFD700' },
      { background: '#E3E300', text: '#FFD700' },
    ],
    pastel: [
      { background: '#FFB6C1', text: '#4682B4' },
      { background: '#FFC6C9', text: '#4682B4' },
      { background: '#FFD6D1', text: '#4682B4' },
      { background: '#FFE6D9', text: '#4682B4' },
      { background: '#FFF6E1', text: '#4682B4' },
      { background: '#FFF6F1', text: '#4682B4' },
      { background: '#F6E1F1', text: '#4682B4' },
      { background: '#E6D1F1', text: '#4682B4' },
      { background: '#D6C1F1', text: '#4682B4' },
      { background: '#C6B1F1', text: '#4682B4' },
      { background: '#B6A1F1', text: '#4682B4' },
      { background: '#A691F1', text: '#4682B4' },
      { background: '#9681F1', text: '#4682B4' },
      { background: '#8671F1', text: '#4682B4' },
      { background: '#7661F1', text: '#4682B4' },
      { background: '#6651F1', text: '#4682B4' },
      { background: '#5641F1', text: '#4682B4' },
      { background: '#4631F1', text: '#4682B4' },
      { background: '#3621F1', text: '#4682B4' },
      { background: '#2611F1', text: '#4682B4' },
    ],
    vintage: [
      { background: '#6B4E71', text: '#D4B5B0' },
      { background: '#705671', text: '#D4B5B0' },
      { background: '#755E71', text: '#D4B5B0' },
      { background: '#7A6671', text: '#D4B5B0' },
      { background: '#7F6E71', text: '#D4B5B0' },
      { background: '#847671', text: '#D4B5B0' },
      { background: '#897E71', text: '#D4B5B0' },
      { background: '#8E8671', text: '#D4B5B0' },
      { background: '#937071', text: '#D4B5B0' },
      { background: '#987871', text: '#D4B5B0' },
      { background: '#9D8071', text: '#D4B5B0' },
      { background: '#A28871', text: '#D4B5B0' },
      { background: '#A79071', text: '#D4B5B0' },
      { background: '#AC9871', text: '#D4B5B0' },
      { background: '#B1A071', text: '#D4B5B0' },
      { background: '#B6A871', text: '#D4B5B0' },
      { background: '#BBB071', text: '#D4B5B0' },
      { background: '#C0B871', text: '#D4B5B0' },
      { background: '#C5C071', text: '#D4B5B0' },
      { background: '#CAC871', text: '#D4B5B0' },
    ],
    minimal: [
      { background: '#F0F0F0', text: '#333333' },
      { background: '#E0E0E0', text: '#444444' },
      { background: '#D0D0D0', text: '#555555' },
      { background: '#C0C0C0', text: '#666666' },
      { background: '#B0B0B0', text: '#777777' },
      { background: '#A0A0A0', text: '#888888' },
      { background: '#909090', text: '#999999' },
      { background: '#808080', text: '#AAAAAA' },
      { background: '#707070', text: '#BBBBBB' },
      { background: '#606060', text: '#CCCCCC' },
      { background: '#505050', text: '#DDDDDD' },
      { background: '#404040', text: '#EEEEEE' },
      { background: '#303030', text: '#FFFFFF' },
      { background: '#202020', text: '#111111' },
      { background: '#101010', text: '#222222' },
      { background: '#000000', text: '#333333' },
      { background: '#080808', text: '#444444' },
      { background: '#181818', text: '#555555' },
      { background: '#282828', text: '#666666' },
      { background: '#383838', text: '#777777' },
    ],
    beach: [
      { background: '#F7D8BA', text: '#006994' },
      { background: '#F8E0C0', text: '#007FA5' },
      { background: '#F9E8C6', text: '#0096B6' },
      { background: '#FAF0CC', text: '#00ADC7' },
      { background: '#FBF8D2', text: '#00C4D8' },
      { background: '#FCFFD8', text: '#00DBE9' },
      { background: '#FDFFDE', text: '#00F2FA' },
      { background: '#FFFFE4', text: '#00FFF0' },
      { background: '#FFFFEA', text: '#00FFF5' },
      { background: '#FFFFF0', text: '#00FFFA' },
      { background: '#FFFFF6', text: '#00FFFF' },
      { background: '#FFFFFC', text: '#00FFFF' },
      { background: '#FFFFF6', text: '#00E0FF' },
      { background: '#FFFFF0', text: '#00C0FF' },
      { background: '#FFFFEA', text: '#00A0FF' },
      { background: '#FFFFE4', text: '#0080FF' },
      { background: '#FDFFDE', text: '#0060FF' },
      { background: '#FCFFD8', text: '#0040FF' },
      { background: '#FBF8D2', text: '#0020FF' },
      { background: '#FAF0CC', text: '#0000FF' },
    ],
    spring: [
      { background: '#FDE8E9', text: '#6A0572' },
      { background: '#FCE2E3', text: '#76078B' },
      { background: '#FBDCDC', text: '#8209A4' },
      { background: '#FAD6D6', text: '#8E0BBD' },
      { background: '#F9D0D0', text: '#9A0DD6' },
      { background: '#F8CAC9', text: '#A60FEF' },
      { background: '#F7C4C3', text: '#B210FF' },
      { background: '#F6BEBD', text: '#BE12FF' },
      { background: '#F5B8B7', text: '#CA14FF' },
      { background: '#F4B2B1', text: '#D616FF' },
      { background: '#F3ACAB', text: '#E218FF' },
      { background: '#F2A6A5', text: '#EE1AFF' },
      { background: '#F1A0A0', text: '#FA1CFF' },
      { background: '#F09A9A', text: '#FF1EFF' },
      { background: '#EF9494', text: '#FF20FF' },
      { background: '#EE8E8E', text: '#FF22FF' },
      { background: '#ED8888', text: '#FF24FF' },
      { background: '#EC8282', text: '#FF26FF' },
      { background: '#EB7C7C', text: '#FF28FF' },
      { background: '#EA7676', text: '#FF2AFF' },
    ],
    autumn: [
      { background: '#D2691E', text: '#FFD700' },
      { background: '#D87528', text: '#FFD700' },
      { background: '#DE8132', text: '#FFD700' },
      { background: '#E48D3C', text: '#FFD700' },
      { background: '#EA9946', text: '#FFD700' },
      { background: '#F0A550', text: '#FFD700' },
      { background: '#F6B15A', text: '#FFD700' },
      { background: '#FCBD64', text: '#FFD700' },
      { background: '#FFD970', text: '#FFD700' },
      { background: '#FFEB7C', text: '#FFD700' },
      { background: '#FFF888', text: '#FFD700' },
      { background: '#FFFF94', text: '#FFD700' },
      { background: '#FFFFA0', text: '#FFD700' },
      { background: '#FFFFAC', text: '#FFD700' },
      { background: '#FFFFB8', text: '#FFD700' },
      { background: '#FFFFC4', text: '#FFD700' },
      { background: '#FFFFD0', text: '#FFD700' },
      { background: '#FFFFDC', text: '#FFD700' },
      { background: '#FFFFE8', text: '#FFD700' },
      { background: '#FFFFF4', text: '#FFD700' },
    ],
    neon: [
      { background: '#0F0F0F', text: '#39FF14' },
      { background: '#1F1F1F', text: '#3BFF1E' },
      { background: '#2F2F2F', text: '#3DFF28' },
      { background: '#3F3F3F', text: '#3FFF32' },
      { background: '#4F4F4F', text: '#41FF3C' },
      { background: '#5F5F5F', text: '#43FF46' },
      { background: '#6F6F6F', text: '#45FF50' },
      { background: '#7F7F7F', text: '#47FF5A' },
      { background: '#8F8F8F', text: '#49FF64' },
      { background: '#9F9F9F', text: '#4BFF6E' },
      { background: '#AFAFAF', text: '#4DFF78' },
      { background: '#BFBFBF', text: '#4FFF82' },
      { background: '#CFCFCF', text: '#51FF8C' },
      { background: '#DFDFDF', text: '#53FF96' },
      { background: '#EFEFEF', text: '#55FFA0' },
      { background: '#FFFFFF', text: '#57FFAA' },
      { background: '#FFFFFF', text: '#59FFB4' },
      { background: '#FFFFFF', text: '#5BFFBE' },
      { background: '#FFFFFF', text: '#5DFFC8' },
      { background: '#FFFFFF', text: '#5FFFD2' },
    ],
    lavender: [
      { background: '#E6E6FA', text: '#4B0082' },
      { background: '#ECEAF0', text: '#4B0082' },
      { background: '#F2EEF6', text: '#4B0082' },
      { background: '#F8F2FC', text: '#4B0082' },
      { background: '#FEF6FF', text: '#4B0082' },
      { background: '#FFFFFF', text: '#4B0082' },
      { background: '#FFFFFF', text: '#4B0F82' },
      { background: '#FFFFFF', text: '#4B1F82' },
      { background: '#FFFFFF', text: '#4B2F82' },
      { background: '#FFFFFF', text: '#4B3F82' },
      { background: '#FFFFFF', text: '#4B4F82' },
      { background: '#FFFFFF', text: '#4B5F82' },
      { background: '#FFFFFF', text: '#4B6F82' },
      { background: '#FFFFFF', text: '#4B7F82' },
      { background: '#FFFFFF', text: '#4B8F82' },
      { background: '#FFFFFF', text: '#4B9F82' },
      { background: '#FFFFFF', text: '#4BAF82' },
      { background: '#FFFFFF', text: '#4BBF82' },
      { background: '#FFFFFF', text: '#4BCF82' },
      { background: '#FFFFFF', text: '#4BDF82' },
    ],
    twilight: [
      { background: '#2C3E50', text: '#E74C3C' },
      { background: '#2F4053', text: '#E74C3C' },
      { background: '#324256', text: '#E74C3C' },
      { background: '#354459', text: '#E74C3C' },
      { background: '#37465C', text: '#E74C3C' },
      { background: '#3A4860', text: '#E74C3C' },
      { background: '#3D4A63', text: '#E74C3C' },
      { background: '#404C66', text: '#E74C3C' },
      { background: '#424E69', text: '#E74C3C' },
      { background: '#45506C', text: '#E74C3C' },
      { background: '#48526F', text: '#E74C3C' },
      { background: '#4B5472', text: '#E74C3C' },
      { background: '#4E5675', text: '#E74C3C' },
      { background: '#505878', text: '#E74C3C' },
      { background: '#535A7B', text: '#E74C3C' },
      { background: '#565C7E', text: '#E74C3C' },
      { background: '#595E81', text: '#E74C3C' },
      { background: '#5C6084', text: '#E74C3C' },
      { background: '#5E6287', text: '#E74C3C' },
      { background: '#61648A', text: '#E74C3C' },
    ],
    ivory: [
      { background: '#FFFFF0', text: '#2F4F4F' },
      { background: '#FFFFE8', text: '#2F4F4F' },
      { background: '#FFFFE0', text: '#2F4F4F' },
      { background: '#FFFFD8', text: '#2F4F4F' },
      { background: '#FFFFD0', text: '#2F4F4F' },
      { background: '#FFFFC8', text: '#2F4F4F' },
      { background: '#FFFFC0', text: '#2F4F4F' },
      { background: '#FFFFB8', text: '#2F4F4F' },
      { background: '#FFFFB0', text: '#2F4F4F' },
      { background: '#FFFFA8', text: '#2F4F4F' },
      { background: '#FFFFA0', text: '#2F4F4F' },
      { background: '#FFFF98', text: '#2F4F4F' },
      { background: '#FFFF90', text: '#2F4F4F' },
      { background: '#FFFF88', text: '#2F4F4F' },
      { background: '#FFFF80', text: '#2F4F4F' },
      { background: '#FFFF78', text: '#2F4F4F' },
      { background: '#FFFF70', text: '#2F4F4F' },
      { background: '#FFFF68', text: '#2F4F4F' },
      { background: '#FFFF60', text: '#2F4F4F' },
      { background: '#FFFF58', text: '#2F4F4F' },
    ],
    forest: [
      { background: '#2E8B57', text: '#FFFFFF' },
      { background: '#319C60', text: '#FFFFFF' },
      { background: '#34AD69', text: '#FFFFFF' },
      { background: '#37BE72', text: '#FFFFFF' },
      { background: '#3ACF7B', text: '#FFFFFF' },
      { background: '#3DD084', text: '#FFFFFF' },
      { background: '#40D18D', text: '#FFFFFF' },
      { background: '#43D296', text: '#FFFFFF' },
      { background: '#46D39F', text: '#FFFFFF' },
      { background: '#49D4A8', text: '#FFFFFF' },
      { background: '#4CD5B1', text: '#FFFFFF' },
      { background: '#4FD6BA', text: '#FFFFFF' },
      { background: '#52D7C3', text: '#FFFFFF' },
      { background: '#55D8CC', text: '#FFFFFF' },
      { background: '#58D9D5', text: '#FFFFFF' },
      { background: '#5BDADE', text: '#FFFFFF' },
      { background: '#5EDBE7', text: '#FFFFFF' },
      { background: '#61DDF0', text: '#FFFFFF' },
      { background: '#64DEF9', text: '#FFFFFF' },
      { background: '#67E0FF', text: '#FFFFFF' },
    ],
  };

export default function Home() {
  const navigate = useNavigate(); 
  const [userDetails, setUserDetails] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [colorIndex, setColorIndex] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [username, setUserName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [image, setImage] = useState(null);
  const [homeImage, setHomeImage] = useState(null);
  const [about, setAbout] = useState(null);
  const [reposData, setReposData] = useState([]); // Declare reposData and setReposData


  useEffect(() => {
    const savedTheme = localStorage.getItem('selectedTheme');
    const savedColorIndex = localStorage.getItem('selectedColorIndex');
    if (savedTheme) setTheme(savedTheme);
    if (savedColorIndex) setColorIndex(parseInt(savedColorIndex));
  }, []);
  const github = localStorage.getItem('usergithub');
  useEffect(() => {
    async function fetchData() {
      const reposResponse = await axios.get(`https://api.github.com/users/${github}/repos`);
      setReposData(reposResponse.data);
    }
    fetchData();
  }, []);
  const handleThemeChange = (event) => {
    setTheme(event.target.value);
    setColorIndex(0);
    localStorage.setItem('selectedTheme', event.target.value);
    localStorage.setItem('selectedColorIndex', 0);
  };

  const handleColorChange = (event) => {
    setColorIndex(event.target.value);
    localStorage.setItem('selectedColorIndex', event.target.value);
  };

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  const handleHomeImageChange = (event) => {
    setHomeImage(URL.createObjectURL(event.target.files[0]));
  };
  const handleAboutChange = (event) => {
    setAbout(URL.createObjectURL(event.target.files[0]));
  };

  const handleCommentSubmit = () => {
    const newComment = {
      username,
      projectName,
      image: URL.createObjectURL(image),
      text: commentText,
    };
    setComments([...comments, newComment]);
    setUserName('');
    setProjectName('');
    setCommentText('');
    setImage(null);
  };

  
  const paymentpage = () => {
      navigate('/payment');
    };
    
    
    const generateFiles = async () => {
      const mobile_number = localStorage.getItem('userMobileNumber');
    
      // Validate mobile_number
      if (!mobile_number || typeof mobile_number !== 'string' || mobile_number.includes('.') || mobile_number.includes('#') || mobile_number.includes('$') || mobile_number.includes('[') || mobile_number.includes(']')) {
        console.error('Invalid mobile_number:', mobile_number);
        return;
      }
    
      // Your Firebase configuration
      const firebaseConfig = {
        apiKey: "AIzaSyCYiEAQjAKdHEqBQDFTwEuuWNXxVOxGnOc",
        authDomain: "portfoliowebsite-d52f4.firebaseapp.com",
        projectId: "portfoliowebsite-d52f4",
        storageBucket: "portfoliowebsite-d52f4.appspot.com",
        messagingSenderId: "878018155675",
        appId: "1:878018155675:web:c48258034a6c145075e23e",
        measurementId: "G-6YCE9CE7CT",
        databaseURL: "https://portfoliowebsite-d52f4-default-rtdb.firebaseio.com/"
      };
    
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
    
      const db = firebase.database();
    
      // Fetch user details from Realtime Database
      let userDetails = {};
      try {
        const userRef = db.ref('users/' + mobile_number);
        userDetails = await userRef.once('value').then(snapshot => snapshot.val());
        if (!userDetails) {
          console.error("No such document!");
          return;
        }
      } catch (error) {
        console.error("Error getting document:", error);
        return;
      }
    
      const themeTextColor = themes[theme][colorIndex].text;
      const themeBackgroundColor = themes[theme][colorIndex].background;
      const reposHtml = reposData.map(repo => `
        <div style="margin: 10px 0; padding: 10px; border: 1px solid #ccc; border-radius: 8px; cursor: pointer;" onclick="window.open('${repo.html_url}', '_blank')">
          <h6>${repo.name}</h6>
        </div>
      `).join('');
      const htmlContent = `
     <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Page</title>
  <link rel="stylesheet" href="styles.css">
  <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-database.js"></script>
  <style>
    body {
      background-image: url('${background}');
      background-size: cover;
      height: 100vh;
      width: 100%;
      color: ${themeTextColor};
      margin: 20px;
      text-align: center;
      background-position: center;
      font-family: 'Arial, sans-serif';
    }
    .container {
      background-color: ${themeTextColor};
      margin: 20px;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      padding-top: 5%;
      padding-bottom: 5%;
      background-size: cover;
      background-position: center;
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 20px;
    }
    nav a {
      color: ${themeTextColor};
      text-decoration: none;
      margin: 0 10px;
      font-size: 18px;
    }
    hr {
      background-color: ${themeTextColor};
    }
    section {
      background-color: ${themeBackgroundColor};
      padding: 20px;
      margin: 20px;
      border-radius: 8px;
    }
    h2 {
      font-size: 40px;
      font-weight: bold;
    }
    h4 {
      font-size: 30px;
      font-weight: bold;
    }
    p {
      font-size: 16px;
    }
    button {
      padding: 10px;
      border: none;
      border-radius: 4px;
      background-color: ${themeTextColor};
      color: ${themeBackgroundColor};
      font-size: 16px;
    }
    textarea, input[type="text"], input[type="file"] {
      width: 100%;
      background-color: ${themeBackgroundColor};
      color: ${themeTextColor};
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 10px;
      font-size: 16px;
    }
  </style>
</head>
<body>
<div class="main">
  <div class="container">
    <div class="content">
    </div>

    <div style="background-color: ${themeBackgroundColor}; color: ${themeTextColor}; padding: 20px;">
      <nav style="display: flex; justify-content: space-around;">
        <a href="#home">Home</a>
        <a href="#about">About Us</a>
        <a href="#skill">Skills</a>
        <a href="#experience">Experience</a>
        <a href="#education">Education</a>
        <a href="#project">Projects</a>
        <a href="#contactus">Contact Us</a>
      </nav>
    </div>

    <section id="home" style="display: flex; align-items: center;">
      <img src="${userDetails.personalDetails.image1}" alt="Front display" style="max-width: 60%; height: auto; object-fit: cover;" />
      <div>
        <h2>
          ${userDetails.personalDetails.name || 'Name Surname'}
          <br />
        </h2>
      </div>
    </section>

    <hr />

    <section id="about">
      <h4>About Us</h4>
      <div style="display: flex; align-items: center;">
        <p style="flex: 1;">${userDetails.personalDetails.summary || 'Summary'}</p>
        <img src="${userDetails.personalDetails.image2}" alt="About image" style="max-width: 60%; height: auto; object-fit: cover;" />
      </div>
    </section>

    <hr />

    <section id="skill">
      <h4>Skills</h4>
      <div style="padding: 10px; border-radius: 4px;">
        <p>
          ${userDetails.skills ? userDetails.skills.map(skill => skill).join('<br />') : 'Skill 1<br />Skill 2<br />Skill 3<br />Skill 4'}
        </p>
      </div>
    </section>

    <hr />

    <section id="experience">
      <h4>Experience</h4>
      <p>
        ${userDetails.experience ? userDetails.experience.map(exp => `
          <strong>${exp.designation}</strong>
          <br />
          ${exp.company_name}
          <br />
        `).join('<br /><br />') : 'No experience available.'}
      </p>
    </section>

    <hr />

    <section id="education">
      <h4>Education</h4>
      <p>
        ${userDetails.education ? userDetails.education.map(edu => `
          <strong>${edu.degree}</strong>
          <br />
          ${edu.college_name}
          <br />
          ${edu.description || 'Education Description'}
          <br />
        `).join('<br /><br />') : 'No education details available.'}
      </p>
    </section>

    <hr />

    <section id="project">
      <h4>Projects</h4>
      <div style="padding: 10px; border-radius: 4px;">
            ${reposHtml}
          </div>
    </section>

    <hr />
    
    <section id="contactus">
      <h4>Contact Us</h4>
      <p>Email: ${userDetails.personalDetails.email || 'support@thattrifectamuse.com'}</p>
      <p>Phone: ${userDetails.personalDetails.mobile_number || '+123-456-7890'}</p>
    </section>
  </div>
</body>
</html>
      `;
    
      const zip = new JSZip();
      zip.file('index.html', htmlContent);
    
      zip.generateAsync({ type: 'blob' })
        .then(content => {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(content);
          link.download = 'portfolio.zip';
          link.click();
        });
    };
    
    const fetch = async () => {
      const firebaseConfig = {
        apiKey: "AIzaSyCYiEAQjAKdHEqBQDFTwEuuWNXxVOxGnOc",
        authDomain: "portfoliowebsite-d52f4.firebaseapp.com",
        projectId: "portfoliowebsite-d52f4",
        storageBucket: "portfoliowebsite-d52f4.appspot.com",
        messagingSenderId: "878018155675",
        appId: "1:878018155675:web:c48258034a6c145075e23e",
        measurementId: "G-6YCE9CE7CT",
        databaseURL: "https://portfoliowebsite-d52f4-default-rtdb.firebaseio.com/"
      };
    
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
    
      const db = firebase.database();
      try {
        const mobile_number = localStorage.getItem('userMobileNumber');
        const userRef = db.ref('users/' + mobile_number);
        const snapshot = await userRef.once('value');
        const data = snapshot.val();
        if (data) {
          setUserDetails(data);
        } else {
          console.error("No data found!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
      
      
    };
    
    useEffect(() => {
      fetch();
    }, []);
    
    return (
      <div
        className="App"
        style={{
          flexGrow: 1,
          backgroundColor: themes[theme][colorIndex].text,
          color: themes[theme][colorIndex].background,
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          const newTheme = Object.keys(themes)[Math.floor(Math.random() * Object.keys(themes).length)];
          setTheme(newTheme);
          setColorIndex(0);
          localStorage.setItem('selectedTheme', newTheme);
          localStorage.setItem('selectedColorIndex', 0);
        }}
      >
        <div>
          <FormControl variant="outlined" style={{ minWidth: 120, margin: '10px' }}>
            <InputLabel style={{ color: themes[theme][colorIndex].text }}>Theme</InputLabel>
            <Select value={theme} onChange={handleThemeChange} style={{ color: themes[theme][colorIndex].text, borderColor: themes[theme][colorIndex].text }}>
              {Object.keys(themes).map((themeKey) => (
                <MenuItem key={themeKey} value={themeKey}>
                  {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)} Theme
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" style={{ minWidth: 120, margin: '10px' }}>
            <InputLabel style={{ color: themes[theme][colorIndex].text }}>Color</InputLabel>
            <Select value={colorIndex} onChange={handleColorChange} style={{ color: themes[theme][colorIndex].text, borderColor: themes[theme][colorIndex].text }}>
              {themes[theme].map((color, index) => (
                <MenuItem key={index} value={index}>
                {`Color ${index + 1}`}
              </MenuItem>
              ))};
            </Select>
          </FormControl>
          <FormControl variant="outlined" style={{ minWidth: 140, margin: '20px' }}>
            <Button variant="outlined" style={{ color: themes[theme][colorIndex].background }} onClick={paymentpage}>Pay</Button>
          </FormControl>
        </div>
  
        <Card style={{ backgroundColor: themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>
          <AppBar position="static" sx={{ display: 'space-between', justifyContent: 'center', backgroundColor: themes[theme][colorIndex].background }}>
            <Button href="#home" title="Home" sx={{ backgroundColor: themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>Home</Button>
            <Button href="#about" title="About Us" sx={{ backgroundColor: themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>About Us</Button>
            <Button href="#skill" title="Skill" sx={{ backgroundColor: themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>Skills</Button>
            <Button href="#experience" title="Experience" sx={{ backgroundColor: themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>Experience</Button>
            <Button href="#education" title="Education" sx={{ backgroundColor: themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>Education</Button>
            <Button href="#project" title="Project" sx={{ backgroundColor: themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>Projects</Button>
            <Button href="#comment" title="Comment Section" sx={{ backgroundColor: themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>Comment</Button>
            <Button href="#contactus" title="Contact Us" sx={{ backgroundColor: themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>Contact Us</Button>
          </AppBar>
          <br />
  
          <Box id="home" style={{ display: 'flex', alignItems: 'center', backgroundColor: themes[theme][colorIndex].background, padding: '2%' }}>
            <img src={front} alt="Front display" style={{ maxWidth: '60%', height: '50%', objectFit: 'cover', justifyContent: 'left', alignItems: 'left' }} />
            <Box style={{ display: 'block', alignItems: 'center' }}>
              <Typography variant="h2" style={{ color: themes[theme][colorIndex].text, fontSize: 40 }}>
                {userDetails && userDetails.personalDetails ? userDetails.personalDetails.name : 'Name not available'}
                <br />
              </Typography>
              <br />
            </Box>
          </Box>
        </Card>
        <Divider variant="middle" style={{ backgroundColor: themes[theme][colorIndex].text }} />
        <br />
        <Card style={{ backgroundColor: themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>
          <Box id="about" style={{ display: 'block', alignItems: 'center', backgroundColor: themes[theme][colorIndex].background, padding: '2%' }}>
            <Typography variant="h4" style={{ color: themes[theme][colorIndex].text, fontSize: 24 }}>About Us</Typography>
            <Typography variant="body1" style={{ color: themes[theme][colorIndex].text, fontSize: 16, textAlign: 'justify' }}>
              {userDetails && userDetails.personalDetails ? userDetails.personalDetails.about_me : 'About me not available'}
            </Typography>
          </Box>
        </Card>
        <Divider variant="middle" style={{ backgroundColor: themes[theme][colorIndex].text }} />
        <br />
        <Card style={{ backgroundColor: themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>
          <Box id="skill" style={{ display: 'block', alignItems: 'center', backgroundColor: themes[theme][colorIndex].background, padding: '2%' }}>
            <Typography variant="h4" style={{ color: themes[theme][colorIndex].text, fontSize: 24 }}>Skills</Typography>
            <Typography variant="body1" style={{ color: themes[theme][colorIndex].text, fontSize: 16, textAlign: 'justify' }}>
              {userDetails && userDetails.personalDetails ? userDetails.personalDetails.skills : 'Skills not available'}
            </Typography>
          </Box>
        </Card>
        <Divider variant="middle" style={{ backgroundColor: themes[theme][colorIndex].text }} />
        <br />
        <Card style={{ backgroundColor: themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>
          <Box id="experience" style={{ display: 'block', alignItems: 'center', backgroundColor: themes[theme][colorIndex].background, padding: '2%' }}>
            <Typography variant="h4" style={{ color: themes[theme][colorIndex].text, fontSize: 24 }}>Experience</Typography>
            <Typography variant="body1" style={{ color: themes[theme][colorIndex].text, fontSize: 16, textAlign: 'justify' }}>
              {userDetails && userDetails.experience ? userDetails.experience : 'Experience not available'}
            </Typography>
          </Box>
        </Card>
        <Divider variant="middle" style={{ backgroundColor: themes[theme][colorIndex].text }} />
        <br />
        <Card style={{ backgroundColor: themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>
          <Box id="education" style={{ display: 'block', alignItems: 'center', backgroundColor: themes[theme][colorIndex].background, padding: '2%' }}>
            <Typography variant="h4" style={{ color: themes[theme][colorIndex].text, fontSize: 24 }}>Education</Typography>
            <Typography variant="body1" style={{ color: themes[theme][colorIndex].text, fontSize: 16, textAlign: 'justify' }}>
              {userDetails && userDetails.education ? userDetails.education : 'Education not available'}
            </Typography>
          </Box>
        </Card>
        <Divider variant="middle" style={{ backgroundColor: themes[theme][colorIndex].text }} />
        <br />
        <Card style={{ backgroundColor: themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>
          <Box id="project" style={{ display: 'block', alignItems: 'center', backgroundColor: themes[theme][colorIndex].background, padding: '2%' }}>
            <Typography variant="h4" style={{ color: themes[theme][colorIndex].text, fontSize: 24 }}>Projects</Typography>
            <List>
              {reposData.length > 0 ? reposData.map((repo, index) => (
                <ListItem key={index}>
                  <ListItemText primary={repo.name} secondary={repo.description} />
                </ListItem>
              )) : (
                <Typography variant="body1" style={{ color: themes[theme][colorIndex].text, fontSize: 16, textAlign: 'justify' }}>
                  No projects available.
                </Typography>
              )}
            </List>
          </Box>
        </Card>
        <Divider variant="middle" style={{ backgroundColor: themes[theme][colorIndex].text }} />
        <br />
        <Card style={{ backgroundColor: themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>
          <Box id="comment" style={{ display: 'block', alignItems: 'center', backgroundColor: themes[theme][colorIndex].background, padding: '2%' }}>
            <Typography variant="h4" style={{ color: themes[theme][colorIndex].text, fontSize: 24 }}>Comment Section</Typography>
            <TextField label="Username" value={username} onChange={handleUsernameChange} fullWidth />
            <TextField label="Project Name" value={projectName} onChange={handleProjectNameChange} fullWidth />
            <TextField label="Comment" value={commentText} onChange={handleCommentChange} multiline rows={4} fullWidth />
            <Button onClick={handleCommentSubmit} variant="contained" color="primary">Submit</Button>
            
          </Box>
        </Card>
        <Divider variant="middle" style={{ backgroundColor: themes[theme][colorIndex].text }} />
        <br />
        <Card style={{ backgroundColor: themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>
          <Box id="contactus" style={{ display: 'block', alignItems: 'center', backgroundColor: themes[theme][colorIndex].background, padding: '2%' }}>
            <Typography variant="h4" style={{ color: themes[theme][colorIndex].text, fontSize: 24 }}>Contact Us</Typography>
            <Typography variant="body1" style={{ color: themes[theme][colorIndex].text, fontSize: 16, textAlign: 'justify' }}>
              {userDetails && userDetails.personalDetails ? userDetails.personalDetails.contact : 'Contact details not available'}
            </Typography>
          </Box>
        </Card>
      </div>
    );
  };
  
 