import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import UsersList from './components/UsersList';
import EditUser from './components/EditUser';

function App() {
  const isTokenExpired = () => {
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');

    if (!token || !tokenExpiry || new Date().getTime() > Number(tokenExpiry)) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiry');
      return true;
    }
    return false;
  };

  const ProtectedRoute = ({ element }) => {
    return isTokenExpired() ? <Navigate to="/" /> : element;
  };

  useEffect(() => {
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    if (tokenExpiry && new Date().getTime() > Number(tokenExpiry)) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiry');
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<ProtectedRoute element={<UsersList />} />} />
        <Route path="/edit/:id" element={<ProtectedRoute element={<EditUser />} />} />
      </Routes>
    </Router>
  );
}

export default App;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/Login';
// import UsersList from './components/UsersList';
// import EditUser from './components/EditUser';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/users" element={<UsersList />} />
//         <Route path="/edit/:id" element={<EditUser />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
