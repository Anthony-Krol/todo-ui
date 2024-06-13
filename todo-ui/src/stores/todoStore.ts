import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getTodos, createTodo, deleteTodo, toggleTodoState } from '../services/api'

export const useTodosStore = defineStore('todos', () => {
  const todos = ref([])

  const fetchTodos = async () => {
    try {
      const response = await getTodos()
      todos.value = response.data
    } catch (error) {
      console.error('Fetching todos failed', error)
    }
  }
  const todoDescription = ref<string>('')
  const todoTitle = ref<string>('')

  const addTodo = async () => {
    if(!(todoDescription.value === '')){
    try {
      const response = await createTodo({
        title: todoTitle.value,
        description: todoDescription.value,
        completed: false,
      })
      todos.value.push(response.data)
      todoTitle.value = ''
      todoDescription.value = ''
    } catch (error) {
      console.error('Creating todo failed', error)
    }
  }
  }

  const removeTodo = async (publicId: string) => {
    try {
      await deleteTodo(publicId)
      todos.value = todos.value.filter(todo => todo.public_id !== publicId)
    } catch (error) {
      console.error('Deleting todo failed', error)
    }
  }

  const toggleTodoCompletion = async (publicId: string) => {
    try {
      const response = await toggleTodoState(publicId)
      const index = todos.value.findIndex(todo => todo.public_id === publicId)
      if (index !== -1) {
        todos.value[index] = response.data
      }
    } catch (error) {
      console.error('Toggling todo state failed', error)
    }
  }

  return { todos, todoTitle, todoDescription, fetchTodos, addTodo, removeTodo, toggleTodoCompletion }
})
