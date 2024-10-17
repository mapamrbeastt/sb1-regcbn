import axios from 'axios';

const API_BASE_URL = 'mongodb+srv://aguscordes17:<L8kyMXrYPkpjdawB>@mrbeastairdrop.5wew6.mongodb.net/?retryWrites=true&w=majority&appName=Mrbeastairdrop';

export async function fetchUserData(userId: string) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return response.json();
}

export async function createUser(userData: any) {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Failed to create user');
  }
  return response.json();
}

export async function updateUserData(userId: string, updateData: any) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });
  if (!response.ok) {
    throw new Error('Failed to update user data');
  }
  return response.json();
}