//npm install firebase
import './LoginUi.css';
import profile from "./a.png";
import emailIcon from "./email.jpg";
import googleIcon from "./google.jpg";
import pass from "./pass.png";
import { auth, provider } from './config';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginUi() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [value, setValue] = useState('');
  const navigate = useNavigate(); 
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        setValue(data.user.email);
        localStorage.setItem('email', data.user.email);
        navigate('/ResumeUpload');
      })
      .catch((error) => {
        console.error('Error signing in with Google', error);
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailPasswordSignIn = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setValue(user.email);
        localStorage.setItem('email', user.email);
        console.log('User signed up successfully');
        navigate('/ResumeUpload');
      })
      .catch((error) => {
        console.error('Error signing up with password and email', error);
      });
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setValue(user.email);
        localStorage.setItem('email', user.email);
        navigate('/ResumeUpload');
      })
      .catch((error) => {
        console.error('Error signing in with password and email', error);
      });
  };

 
  useEffect(() => {
    setValue(localStorage.getItem('email'));
  }, []);

  return (
    <div className="main">
      <div className="sub-main">
        <div>
          <div className="imgs">
            <div className="container-image">
              <img src={profile} alt="profile" className="profile" />
            </div>
          </div>
          <div>
            <h1>Login Page</h1>
            <h1>
            <img src={googleIcon} alt="email" className="email" />
              <button onClick={handleGoogleSignIn}>Sign in With Google</button>
            </h1>
            <label>----------OR------------<br></br></label>
            
            <div>
              
              <img src={emailIcon} alt="email" className="email" />
              <input
                type="text"
                placeholder="user name"
                className="name"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="second-input">
              <img src={pass} alt="pass" className="email" />
              <input
                type="password"
                placeholder="password"
                className="name"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="login-button">
              <button onClick={handleEmailPasswordSignIn}>Login</button>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginUi;
