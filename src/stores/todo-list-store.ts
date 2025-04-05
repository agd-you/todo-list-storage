import type { TodoList } from "@/interfaces/todoList.interface";
import type { TodoState } from "@/interfaces/todoState.interface";
import { defineStore } from "pinia";

export const useTodoList = defineStore("todoList", {
  state: (): TodoState => ({
    todos: [],
  }),
  persist: true,
  getters: {
    getTodoList(state: TodoState): TodoList[] {
      return state.todos;
    },
  },
  actions: {
    addTodo(content: string) {
      this.todos.push({
        content,
        isDone: false,
      });
    },
  },
});
