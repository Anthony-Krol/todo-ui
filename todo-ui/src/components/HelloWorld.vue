<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
    >
      <VRow>
        <VCard>
        </VCard>
      </VRow>
      <Login v-if="authStore.isLoggedIn"/>
      <div v-else>
        <ToDoList></ToDoList>
        <VBtn @click="authStore.logout">Logout</VBtn>
      </div>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
</script>
