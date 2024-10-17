import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
  Paper,
  Box,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLastPage, setIsLastPage] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to check token expiration
  const isTokenExpired = () => {
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    return !tokenExpiry || new Date().getTime() > Number(tokenExpiry);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || isTokenExpired()) {
      alert('Session expired. Please log in again.');
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiry');
      navigate('/');
    } else {
      fetchUsers(page);
    }
  }, [page, navigate]);

  useEffect(() => {
    if (location.state && location.state.updatedUser) {
      const updatedUser = location.state.updatedUser;
      const updatedUsers = users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    }
  }, [location.state, users]);

  const fetchUsers = async (page) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      const fetchedUsers = response.data.data;
      setUsers(fetchedUsers);
      setFilteredUsers(fetchedUsers);
      setIsLastPage(fetchedUsers.length === 0);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(value) ||
        user.last_name.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://reqres.in/api/users/${id}`);
      if (response.status === 204) {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        setIsLastPage(updatedUsers.length === 0);
        alert('User deleted successfully');
      } else {
        alert('Failed to delete the user. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    alert('You have been logged out.');
    navigate('/');
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center" mt={4} width="100%">
        <Paper elevation={10} sx={{ padding: 4, borderRadius: 3, width: '100%' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" align="center" gutterBottom>
              Users List
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSignOut}
              sx={{ borderRadius: '10px' }}
            >
              Sign Out
            </Button>
          </Box>
          <TextField
            label="Search Users"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              style: { borderRadius: '30px' },
            }}
            sx={{ mb: 4, '& .MuiOutlinedInput-root': { borderRadius: '30px', backgroundColor: '#f0f2f5' }}}
          />
          <Grid container spacing={3} justifyContent="center">
            {filteredUsers.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Card sx={{ borderRadius: '15px', textAlign: 'center', padding: 2 }}>
                  <CardContent>
                    <Typography variant="h6">
                      {user.first_name} {user.last_name}
                    </Typography>
                    <Box display="flex" justifyContent="center" mt={2} mb={1}>
                      <img
                        src={user.avatar}
                        alt={user.first_name}
                        style={{ borderRadius: '50%', width: '100px', height: '100px' }}
                      />
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      {user.email}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      sx={{ mt: 2, borderRadius: '10px' }}
                      onClick={() => navigate(`/edit/${user.id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      sx={{ mt: 1, borderRadius: '10px' }}
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          {isLastPage && (
            <Typography variant="h6" align="center" sx={{ mt: 4, color: '#888' }}>
              No more users to display.
            </Typography>
          )}
          <Box mt={4} display="flex" justifyContent="space-between" width="100%">
            <Button
              variant="outlined"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              sx={{ borderRadius: '10px' }}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              onClick={() => setPage(page + 1)}
              disabled={isLastPage}
              sx={{ borderRadius: '10px' }}
            >
              Next
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default UsersList;
