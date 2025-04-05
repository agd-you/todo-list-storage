<template>
  <div class="main">
    <div class="container card">
      <h2>TODO LIST</h2>
      <div class="flex flex-row align-items-center mb-20">
        <input v-model="todoInput" type="text" class="flex-fill mr-20" />
        <button class="btn btn-primary" @click="addTodo">Ajouter</button>
      </div>

      <ul class="d-flex flex-column">
        <li
          v-for="(todo, index) in todoStore.getTodoList"
          :key="index"
          class="card mb-20"
          @click="checkTodo(todo)"
        >
          <div v-if="!todo.edit" class="flex flex-row align-items-center">
            <span class="flex-fill mr-20">{{ todo.content }}</span>
            <input
              class="mr-20"
              type="checkbox"
              :checked="todo.isDone"
              v-model="todo.isDone"
            />
            <button class="btn btn-primary mr-20" @click.stop="editTodo(todo)">
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
              @cancel="cancel(todo)"
              @update="updateTodo(todo, index, $event)"
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

function addTodo() {
  todoStore.addTodo(todoInput.value);
  todoInput.value = "";
}

function checkTodo(todo:TodoList){
  todoStore.checkTodo(todo);
}

function deleteTodo(index: number) {
  todoStore.deleteTodo(index);
}

function editTodo(todo: TodoList) {
  todo.edit = true;
}

function cancel(todo: TodoList) {
  todo.edit = false;
}

function updateTodo(todo: TodoList, index: number, event: string) {
  todo.content = event;
  todo.edit = false;
  todoStore.updateTodo(todo, index);
}
</script>

<style lang="scss">
@use "./assets/base.scss";
</style>
