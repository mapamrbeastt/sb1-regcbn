import axios from 'axios';

const API_BASE_URL =
  'mongodb+srv://aguscordes17:<L8kyMXrYPkpjdawB>@mrbeastairdrop.5wew6.mongodb.net/?retryWrites=true&w=majority&appName=Mrbeastairdrop'; // Asegúrate de que esta URL sea correcta

export async function registerUser(
  email: string,
  username: string,
  password: string
): Promise<string> {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      email,
      username,
      password,
    });
    return response.data.userId;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Registration error:', error.response.data);
      throw new Error(error.response.data.message || 'Registration failed');
    }
    console.error('Unexpected error:', error);
    throw new Error('Registration failed');
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<string> {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data.userId;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Login error:', error.response.data);
      throw new Error(error.response.data.message || 'Login failed');
    }
    console.error('Unexpected error:', error);
    throw new Error('Login failed');
  }
}
