import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
  Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password) {
      setError('Both fields are required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });

      if (response.data.token) {
        const expiryTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour expiration
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('tokenExpiry', expiryTime.toString());
        navigate('/users');
      } else {
        setError('Invalid credentials.');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Invalid credentials. Please try again.');
      } else {
        setError('Login failed. Please try again later.');
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Paper elevation={10} sx={{ padding: 4, borderRadius: 3 }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar sx={{ bgcolor: '#1976d2', marginBottom: 2 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" gutterBottom>
              EmployWise
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Sign in to continue
            </Typography>
          </Box>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{
                style: { borderRadius: '10px' },
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                style: { borderRadius: '10px' },
              }}
            />
            <Button
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
                paddingY: 1.5,
                borderRadius: '10px',
                backgroundColor: '#1976d2',
                '&:hover': { backgroundColor: '#115293' },
              }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import {
//   TextField,
//   Button,
//   Container,
//   Typography,
//   Box,
//   Paper,
//   Avatar,
// } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('https://reqres.in/api/login', {
//         email,
//         password,
//       });

//       // Check if the response contains a token
//       if (response.data.token) {
//         localStorage.setItem('token', response.data.token);
//         navigate('/users');
//       } else {
//         alert('Credentials do not match. Please check your credentials.');
//       }
//     } catch (error) {
//       // Handle error responses (e.g., incorrect credentials)
//       if (error.response && error.response.status === 400) {
//         alert('Credentials do not match. Please check your credentials.');
//       } else {
//         alert('Login failed. Please try again later.');
//       }
//     }
//   };

//   return (
//     <Container maxWidth="xs">
//       <Box
//         display="flex"
//         flexDirection="column"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="100vh"
//       >
//         <Paper elevation={10} sx={{ padding: 4, borderRadius: 3 }}>
//           <Box display="flex" flexDirection="column" alignItems="center">
//             <Avatar sx={{ bgcolor: '#1976d2', marginBottom: 2 }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography variant="h5" gutterBottom>
//               EmployWise
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               Sign in to continue
//             </Typography>
//           </Box>
//           <form onSubmit={handleLogin}>
//             <TextField
//               label="Email"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               InputProps={{
//                 style: { borderRadius: '10px' },
//               }}
//             />
//             <TextField
//               label="Password"
//               type="password"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               InputProps={{
//                 style: { borderRadius: '10px' },
//               }}
//             />
//             <Button
//               variant="contained"
//               type="submit"
//               color="primary"
//               fullWidth
//               sx={{
//                 mt: 2,
//                 paddingY: 1.5,
//                 borderRadius: '10px',
//                 backgroundColor: '#1976d2',
//                 '&:hover': { backgroundColor: '#115293' },
//               }}
//             >
//               Login
//             </Button>
//           </form>
//         </Paper>
//       </Box>
//     </Container>
//   );
// }

// export default Login;
