import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

// Register a new user
export const registerUser = async (userData: { username: string; email: string; password: string }) => {
  return await axios.post(`${API_URL}/register`, userData);
};

// Login to get a token
export const loginUser = async (credentials: { username: string; password: string }) => {
  const formData = new FormData()
  formData.append('grant_type', '')
  formData.append('username', credentials.username)
  formData.append('password', credentials.password)
  formData.append('scope', '')
  formData.append('client_id', '')
  formData.append('client_secret', '')

  return await axios.post(`${API_URL}/token`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// Get todos
export const getTodos = async () => {
  return await axios.get(`${API_URL}/todos`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  });
};

// Create a new todo
export const createTodo = async (todoData: { title: string; description: string; completed: boolean }) => {
  return await axios.post(`${API_URL}/todos`, todoData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  });
};

export const deleteTodo = async (publicId: string) => {
  return await axios.delete(`${API_URL}/todos/${publicId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  })
}

// Toggle a todo state
export const toggleTodoState = async (publicId: string) => {
  return await axios.patch(`${API_URL}/todos/${publicId}/toggle`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  })
}
