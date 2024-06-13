<template>
  <v-card class="mx-auto pa-4" max-width="425">
    <v-list lines="two">
      <v-list-subheader class="pt-4">ToDoList</v-list-subheader>

      <v-list-item
        v-for="todo in todosStore.todos"
        :key="todo.public_id"
        :prepend-icon="todo.completed ? 'mdi-check-circle-outline' : 'mdi-cancel'"
        @click:prepend="todosStore.toggleTodoCompletion(todo.public_id)"
      >
        <template v-slot:subtitle>
          <v-row>
            <v-col>
              <span class="font-weight-bold">{{ todo.title }}</span> &mdash; {{ todo.description }}
            </v-col>
            <v-col class="d-flex justify-end">
              <v-btn icon @click.stop="todosStore.removeTodo(todo.public_id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn icon @click.stop="todosStore.toggleTodoCompletion(todo.public_id)">
                <v-icon>{{ todo.completed ? 'mdi-toggle-switch' : 'mdi-toggle-switch-off-outline' }}</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </template>
        <v-divider />
      </v-list-item>
    </v-list>
    <v-card-actions class="mx-auto">
      <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Create TODO"
            variant="flat"
          ></v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card>
            <v-card-title>Create TODO Item</v-card-title>
            <v-card-text>
              <v-sheet class="mx-auto" width="300">
                <v-form @submit.prevent="todosStore.addTodo">
                  <v-text-field
                    label="Title"
                    v-model="todosStore.todoTitle"
                    required
                  ></v-text-field>

                  <v-text-field
                    label="Description"
                    v-model="todosStore.todoDescription"
                    required
                  ></v-text-field>

                  <v-btn class="mt-2" type="submit" block>Submit</v-btn>
                </v-form>
              </v-sheet>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text="Close" @click="isActive = false"></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTodosStore } from '@/stores/todoStore'

const todosStore = useTodosStore()

onMounted(async () => {
  await todosStore.fetchTodos()
})
</script>
