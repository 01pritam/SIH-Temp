import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Import your CSS file

const Login = ({ setLoginUser }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    axios
      .post('http://localhost:9002/login', user)
      .then((res) => {
        // For debugging purposes, log the response
        console.log('Response:', res.data);

        if (res.data.success) {
          // If login is successful, set the user and navigate to '/home'
          setLoginUser(res.data.user);
          navigate('/home');
        } else {
          // If login fails, display the error message
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="text"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Enter your Email"
      />
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Enter your Password"
      />
      <div className="button" onClick={login}>
        Login
      </div>
      <div>or</div>
      <div className="button register" onClick={() => navigate('/register')}>
        Register
      </div>
    </div>
  );
};

export default Login;
