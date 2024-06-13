import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginUser, registerUser } from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('authToken'))
  const error = ref<string | null>(null)
  const isLoggedIn = ref<boolean>(!(localStorage.getItem('authToken')))
  const login = async (username: string, password: string) => {
    try {
      const response = await loginUser({ username, password })
      token.value = response.data.access_token
      localStorage.setItem('authToken', response.data.access_token)
      isLoggedIn.value = true
      error.value = null
    } catch (err) {
      error.value = 'Login failed. Please check your credentials.'
      console.error('Login failed', err)
    }
  }

  const register = async (username: string, email: string, password: string) => {
    try {
      await registerUser({ username, email, password })
      alert('User registered successfully')
      error.value = null
    } catch (err) {
      error.value = 'Registration failed. Please try again.'
      console.error('Registration failed', err)
    }
  }

  return { token, error, login, register, isLoggedIn }
})
