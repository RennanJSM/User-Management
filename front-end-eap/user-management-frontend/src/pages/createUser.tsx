import React, { useState } from 'react';
import { TextField, Button, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { createUser } from '../services/apiService';

const CreateUser: React.FC = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        gender: '',
        birthdate: '',
    });

    const handleChange = (field: string, value: string) => {
        setUser((prevUser) => ({ ...prevUser, [field]: value }));
    };

    const handleSave = async () => {
        if (!user.name || !user.email || !user.gender || !user.birthdate) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        try {
            debugger
            await createUser({
                name: user.name,
                email: user.email,
                gender: user.gender,
                birthdate: new Date(user.birthdate)
            });
            console.log('Usuário criado com sucesso!');
            window.location.href = '/'
        } catch (error) {
            console.error('Error creating user:', error);
            console.log('Erro ao criar o usuário. Tente novamente.');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Criar Novo Usuário
            </Typography>
            <form noValidate autoComplete="off">
                <TextField
                    fullWidth
                    label="Nome"
                    value={user.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    label="E-mail"
                    value={user.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    margin="normal"
                    variant="outlined"
                />
                <FormControl component="fieldset" margin="normal">
                    <FormLabel component="legend">Sexo</FormLabel>
                    <RadioGroup
                        aria-label="gender"
                        name="gender"
                        value={user.gender}
                        onChange={(e) => handleChange('gender', e.target.value)}
                    >
                        <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" />
                        <FormControlLabel value="Feminino" control={<Radio />} label="Feminino" />
                        <FormControlLabel value="Outro" control={<Radio />} label="Outro" />
                    </RadioGroup>
                </FormControl>
                <TextField
                    fullWidth
                    label="Data de Nascimento"
                    value={user.birthdate}
                    onChange={(e) => handleChange('birthdate', e.target.value)}
                    margin="normal"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                />
                <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: '20px' }}>
                    Salvar
                </Button>
            </form>
        </div>
    );
}

export default CreateUser;
