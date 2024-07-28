import React from 'react';
import UsersList from '../components/usersList';
import DownloadUsersJson from '../components/downloadJson';
import Dashboard from '../components/dashboard';
import { Button } from '@mui/material'

const Home: React.FC = () => {
  return (
    <div style={{ padding: '11px' }} className="flex justify-center">
      
      <UsersList />
      <div>
        <h1>Criar um novo usuário:</h1>
        <Button variant='contained' color='primary' onClick={() => {window.location.href = 'createuser'}}>Criar Usuário</Button>
      </div>
      <DownloadUsersJson />
      <Dashboard />
      
    </div>
  );
};

export default Home;