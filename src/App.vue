<template>
  <div class="main">
    <div class="container card">
    <div class="flex flex-row align-items-center mb-20">
      <input v-model="todoInput" type="text" class="flex-fill mr-20" />
      <button class="btn btn-primary" @click="addTodo">Ajouter</button>
    </div>

    <ul class="d-flex flex-column">
      <li v-for="(todo, index) in todoStore.getTodoList" :key="index" class="card mb-20">
        <div class="flex flex-row align-items-center">
          <span class="flex-fill mr-20">{{ todo.content }}</span>
        </div>
      </li>
    </ul>
  </div>
  </div>

</template>

<script setup lang="ts">

import { ref } from "vue";
import { useTodoList } from "./stores/todo-list-store.ts";

const todoInput = ref<string>("");
const todoStore = useTodoList();

function addTodo() {
  todoStore.addTodo(todoInput.value);
  todoInput.value = "";
}
</script>

<style scoped lang="scss">

.main{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // hauteur de la page

}
input {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 15px;
}

.container {
  width: 500px;
}
.flex {
  display: flex;
}
.flex-row {
  flex-direction: row;
}
.flex-column {
  flex-direction: column;
}
.aling-items-center {
  align-items: center;
}
.flex-fill {
  flex: 1 1 auto;
}
.btn {
  margin-right: 20px;
  padding: 8px 15px;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}
.btn-primary {
  background-color: #3498db;
  color: #ffffff;
  &:hover {
    background-color: #2980b9;
  }
}
.btn-danger {
  background-color: #e74c3c;
  color: #ffffff;
  &:hover {
    background-color: #c0392b;
  }
}
.mb-20 {
  margin-bottom: 20px;
}

.mr-20 {
  margin-right: 20px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  padding: 10px;
}
ul {
  list-style: none;
  padding: 0;
}
</style>
