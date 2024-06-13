<template>
  <v-form v-model="valid" @submit.prevent="handleSubmit">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="username"
            :counter="10"
            :rules="nameRules"
            label="Username"
            hide-details
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="password"
            :counter="10"
            :rules="nameRules"
            label="Password"
            hide-details
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <VBtn class="mt-4" type="submit">Login</VBtn>
      <v-alert v-if="authStore.error" type="error">{{ authStore.error }}</v-alert>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const valid = ref(false)
const username = ref('')
const password = ref('')

const nameRules = [
  (value: string) => !!value || 'Name is required.',
  (value: string) => value.length <= 10 || 'Name must be less than 10 characters.',
]

const handleSubmit = async () => {
  await authStore.login(username.value, password.value)
}
</script>
