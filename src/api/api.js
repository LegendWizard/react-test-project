import axios from 'axios';

const baseUrl = 'http://192.168.36.101:1337/api';

async function login(username, password) {
  try {
    const response = await axios.post(`${baseUrl}/auth/local`, {
      identifier: username,
      password: password,
    });

    const token = response.data.jwt;
    return token;
  } catch (error) {
    throw error;
  }
}

async function getClients(token) {
  try {
    const response = await axios.get(`${baseUrl}/clients`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const clients = response.data;
    return clients;
  } catch (error) {
    throw error;
  }
}

async function createClient(token) {
  try {
    const response = await axios.post(
      `${baseUrl}/clients`,
      {
        data: {
          name: 'Client3',
          company: 'Company3',
          plan: 'Gfcold',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const createdClient = response.data;
    return createdClient;
  } catch (error) {
    throw error;
  }
}

async function updateClient(token) {
  try {
    const response = await axios.put(
      `${baseUrl}/clients/2`,
      {
        data: {
          plan: 'Gold',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const updatedClient = response.data;
    return updatedClient;
  } catch (error) {
    throw error;
  }
}

export default {
  login,
  getClients,
  createClient,
  updateClient,
};
