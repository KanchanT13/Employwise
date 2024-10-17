
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
} from '@mui/material';

function EditUser() {
  const { id } = useParams();
  const [user, setUser] = useState({ first_name: '', last_name: '', email: '', avatar: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users/${id}`);
        setUser(response.data.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://reqres.in/api/users/${id}`, user);
      alert('User updated successfully');
      navigate('/users', { state: { updatedUser: response.data } });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Paper elevation={10} sx={{ padding: 4, borderRadius: 3 }}>
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <Avatar
              src={user.avatar}
              alt={user.first_name}
              sx={{ width: 100, height: 100, marginBottom: 2 }}
            />
            <Typography variant="h5" gutterBottom>
              Edit User
            </Typography>
          </Box>
          <form onSubmit={handleUpdate}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={user.first_name}
              onChange={(e) => setUser({ ...user, first_name: e.target.value })}
              InputProps={{
                style: { borderRadius: '10px' },
              }}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={user.last_name}
              onChange={(e) => setUser({ ...user, last_name: e.target.value })}
              InputProps={{
                style: { borderRadius: '10px'},
              }}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                InputProps={{
                  style: { borderRadius: '10px' },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{
                  mt: 2,
                  paddingY: 1.5,
                  borderRadius: '10px',
                  backgroundColor: '#1976d2',
                  '&:hover': { backgroundColor: '#115293' },
                }}
              >
                Update
              </Button>
            </form>
          </Paper>
        </Box>
      </Container>
    );
  }
  
  export default EditUser;
  
