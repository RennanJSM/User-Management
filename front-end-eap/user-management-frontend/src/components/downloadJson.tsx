import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material'
import { getUsers } from '../services/apiService';

const DownloadUsersJson = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);


      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(users, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "users.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div>
      <h1>Baixar JSON dos usuários:</h1>
      <Button variant='contained' color='primary' onClick={handleDownload}>Download JSON</Button>
    </div>
  );
};

export default DownloadUsersJson;
