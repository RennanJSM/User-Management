import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Button, ThemeProvider } from '@mui/material';
import { LightTheme } from './themes';
import EditUser from './pages/editUser';
import Home from './pages/home';
import CreateUser from './pages/createUser';
import UserDetail from './pages/userDetail';
import Navbar from './components/navbar';

function App() {

  return (
    <ThemeProvider theme={LightTheme}>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="edituser/:id" Component={EditUser}></Route>
          <Route path="/" Component={Home}></Route>
          <Route path='createuser' Component={CreateUser}></Route>
          <Route path='userdetail/:id' Component={UserDetail}></Route>
        </Routes>
    
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
