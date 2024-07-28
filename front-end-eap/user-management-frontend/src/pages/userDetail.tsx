import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { getUserById, deleteUser } from '../services/apiService';

const UserDetail: React.FC = () => {
    const { id } = useParams<{id: string}>();
    const [user, setUser] = useState({
        name: '',
        email: '',
        gender: '',
        birthdate: '',
        registerDate: '',
    });

    useEffect(() => {
        const fetchUser = async () => {
            if (id) {
                try {
                    const userData = await getUserById(id);
                    setUser(userData);
                } catch (error) {
                    console.error('Error fetching user', error);
                    alert('Erro ao buscar o usuário.');
                }
            }
        };

        fetchUser();
    }, [id]);

    const handleEdit = () => {
        window.location.href = `/edituser/${id}`
    };

    const handleDelete = async () => {
        if (window.confirm('Tem certeza de que deseja deletar este usuário?')) {
            try {
                if (id)
                await deleteUser(id);
                alert('Usuário deletado com sucesso.');
                window.location.href = '/';
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Erro ao deletar o usuário.');
            }
        }
    };

    return (
        <div style={{ maxWidth: '26rem',  margin: 'auto', marginTop: '11rem', alignItems: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Detalhes do Usuário
            </Typography>
            <Typography variant="h6">
                Nome: {user.name}
            </Typography>
            <Typography variant="h6">
                E-mail: {user.email}
            </Typography>
            <Typography variant="h6">
                Sexo: {user.gender}
            </Typography>
            <Typography variant="h6">
                Data de Nascimento: {user.birthdate}
            </Typography>
            <Typography variant="h6">
                Data de Registro: {user.registerDate}
            </Typography>
            <div style={{ marginTop: '20px' }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleEdit} 
                    style={{ marginRight: '10px' }}
                >
                    Editar
                </Button>
                <Button 
                    variant="contained" 
                    color='secondary'
                    onClick={handleDelete}
                >
                    Deletar Usuário
                </Button>
            </div>
        </div>
    );
}

export default UserDetail;
