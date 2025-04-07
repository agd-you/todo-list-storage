<template>
  <div class="main">
    <div class="container card">
      <h2>TODO LIST</h2>
      <p v-if="error" class="msgError">Vous n'avez pas saisi le todo!</p>
      <div class="flex flex-row align-items-center mb-20">
        <input
          name="todoContent"
          v-model="todoInput"
          type="text"
          class="flex-fill mr-20"
        />
        <button class="btn btn-primary" @click="addTodo">Ajouter</button>
      </div>

      <ul class="d-flex flex-column">
        <li
          v-for="(todo, index) in todoStore.getTodoList"
          :key="todo.id"
          class="card mb-20"
        >
          <div v-if="!todo.edit" class="flex flex-row align-items-center">
            <span class="flex-fill mr-20">{{ todo.content }}</span>
            <input
              name="isDoneValue"
              class="mr-20"
              type="checkbox"
              :checked="todo.isDone"
              @click="todo.isDone = !todo.isDone"
            />
            <button
              class="btn btn-primary mr-20"
              @click.stop="todo.edit = true"
            >
              Editer
            </button>
            <button class="btn btn-danger" @click.stop="deleteTodo(index)">
              Supprimer
            </button>
          </div>
          <!-- edit -->
          <div v-else>
            <TodoUpdate
              :content="todo.content"
              @cancel="todo.edit = false"
              @update="updateTodo(todo, $event)"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTodoList } from "./stores/todo-list-store.ts";
import type { TodoList } from "./interfaces/todoList.interface.ts";
import TodoUpdate from "./components/TodoUpdate.vue";

const todoInput = ref<string>("");
const todoStore = useTodoList();
const error = ref(false);

function addTodo() {
  if (!todoInput.value) {
    error.value = true;
    return;
  }
  todoStore.addTodo(todoInput.value);
  todoInput.value = "";
  error.value = false;
}

function deleteTodo(index: number) {
  todoStore.deleteTodo(index);
}

function updateTodo(todo: TodoList, event: string) {
  todoStore.updateTodoContent(todo, event);
}
</script>

<style lang="scss">
@use "./assets/base.scss";
.msgError {
  color: red;
}
</style>
