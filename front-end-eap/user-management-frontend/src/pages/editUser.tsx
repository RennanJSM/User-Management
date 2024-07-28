import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TextField, Button, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { getUserById, updateUser } from '../services/apiService';

const EditUser: React.FC = () => {
    const { id } = useParams<{id: string}>(); 
    const [user, setUser] = useState({
        name: '',
        email: '',
        gender: '',
        birthdate: '',
      });
 

    useEffect(() => {
        const fetchUser = async () => {
            if (id) {
            try {
                const userData = await getUserById(id);
                setUser(userData)
            } catch (error) {
                console.error('Error fetching user', error)
                throw error;

            }
        }
        }

        fetchUser();
    }, [id])  


    const handleChange = (field: string, value: string) => {
        setUser((prevUser) => ({ ...prevUser, [field]: value }));
      };
      
    const handleSave = async () => {
        debugger
        try {
        
          await updateUser({
            userId: id,
            name: user.name,
            email: user.email,
            gender: user.gender,
            birthdate: new Date(user.birthdate.split('T')[0])
          });
          console.log('User updated successfully!');
          window.location.href = '/'
        } catch (error) {
          console.error('Error updating user:', error);
          throw error;
        }
      };

      return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', marginTop: '7rem' }}>
          <Typography variant="h4" gutterBottom>
            Editar dados do Usuário
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
                    <FormControlLabel value="Masculino"  control={<Radio />} label="Masculino" />
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

export default EditUser;