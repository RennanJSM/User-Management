import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_URL,
});



export const getUsers = async () => {
    try {
        const response = await api.get('/user')
        return response.data


    } catch (error) {
        console.error('Error fetching users: ', error)
        throw error
    }
}

export const getUserById = async(userId: string) => {
    try {
        const response = await api.get(`/user/${userId}`)
        return response.data

    } catch (error) {
        console.error('Error fetching this user: ', error);
        throw error;
    }
}

interface CreateUserParams {
    name: string;
    email: string;
    gender: string;
    birthdate: Date;
}

export const createUser = async ({ name, email, gender, birthdate }: CreateUserParams) => {
    try {
        const response = await api.post('/user', {
                name,
                email,
                gender,
                birthdate
            
        });

        return response.data

    } catch (error) {
        console.error('Error creating user: ', error);
        throw error;
    }
}

interface UpdateUserParams {
    userId?: string;
    name: string;
    email: string;
    gender: string;
    birthdate: Date;
}

export const updateUser = async ({userId, name, email, gender, birthdate}: UpdateUserParams) => {
    try {
        const response = await api.patch(`/user/${userId}`, {name, email, gender, birthdate})
        return response.data

    } catch (error) {
        console.error('Error updating user: ', error);
        throw error;
    }
}

export const deleteUser = async (userId: string) => {
    try {
        const response = await api.delete(`/user/${userId}`)
        return response.data

    } catch (error) {
        console.error('Error deleting user: ', error);
        throw error;
    }
}
