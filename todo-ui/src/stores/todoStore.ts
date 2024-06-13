import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getTodos, createTodo } from '../services/api'

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

  return { todos, fetchTodos, addTodo, todoDescription, todoTitle }
})
