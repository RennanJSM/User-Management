import React, {useEffect, useState} from 'react'
import { getUsers } from '../services/apiService'
import { Button } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const UsersList: React.FC = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users', error);
                throw error;
            }
        }

        fetchUsers()
    }, [])

    const handleDetailClick = (userId: string) => {
      window.location.href = `/userdetail/${userId}`;
    };

    return (

        <>
          <h1>Lista de Usuários</h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Nome</TableCell>
              <TableCell align="right">E-mail</TableCell>
              <TableCell align="right">Gênero</TableCell>
              <TableCell align="right">Data de Nascimento</TableCell>
              <TableCell align="right">Data de Registro</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: any) => (
              <TableRow
                key={user.id}
              >
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                  <TableCell align="right">{user.name}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{user.gender}</TableCell>
                  <TableCell align="right">{user.birthdate}</TableCell>
                  <TableCell align="right">{user.registerDate}</TableCell>
                  <Button style={{ padding: '0.7rem', marginTop: '3px' }}variant="contained" color="primary" onClick={() => handleDetailClick(user.id)}>Detalhes</Button>
                </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </>
    )
}

export default UsersList;