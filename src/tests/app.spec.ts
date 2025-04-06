import { test, expect, vi, describe, beforeEach } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { mount, VueWrapper } from "@vue/test-utils";
import App from "../App.vue";
import TodoUpdate from "../components/TodoUpdate.vue";
import { useTodoList } from "@/stores/todo-list-store";

describe("App.vue", () => {
  let wrapper: VueWrapper<any>;
  beforeEach(() => {
    wrapper = mount(App, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
          }),
        ],
      },
    });
  });

  test("should create new todo and reset input", async () => {
    const toDoStore = useTodoList();
    const input = wrapper.get("input");
    const button = wrapper.get(".btn-primary");

    await input.setValue("Read a Book");
    await button.trigger("click");

    expect(toDoStore.addTodo).toBeCalledWith("Read a Book");
    expect(input.element.value).toBe("");
  });

  test("should display todo from the store when todo is created", async () => {
    const toDoStore = useTodoList();

    toDoStore.todos.push({
      id: Date.now(),
      content: "Read a Book",
      isDone: false,
    });

    await wrapper.vm.$nextTick();
    const liWrappers = wrapper.get("li");
    const checkBoxInput = liWrappers.get("input");

    expect(liWrappers.text()).toContain("Read a Book");
    expect(checkBoxInput.element.checked).toBe(false);
  });

  test("should delete todo", async () => {
    const toDoStore = useTodoList();

    toDoStore.todos.push({
      id: Date.now(),
      content: "Go to the cinema",
      isDone: false,
    });
    await wrapper.vm.$nextTick();
    const button = wrapper.get(".btn-danger");
    await button.trigger("click");

    expect(toDoStore.deleteTodo).toBeCalledWith(0);
    expect(toDoStore.$state.todos.length).toBe(0);
  });

  test("should todo be done when checkbox is checked", async () => {
    const toDoStore = useTodoList();

    const todo = {
      id: Date.now(),
      content: "Play sports",
      isDone: false,
    };

    toDoStore.todos.push(todo);
    await wrapper.vm.$nextTick();
    const checkBoxWrappers = wrapper.find('input[name="isDoneValue"]');
    await checkBoxWrappers.trigger("click");

   expect(toDoStore.$state.todos[0].isDone).toBe(true);
  });

  test("should update todo content when TodoUpdate emit new value", async () => {
    const toDoStore = useTodoList();

    const todo = {
      id: Date.now(),
      content: "Olde Value",
      isDone: false,
      edit: true,
    };

    toDoStore.todos.push(todo);
    await wrapper.vm.$nextTick();
    const el1 = wrapper.findComponent(TodoUpdate);
    el1.vm.$emit("update", "New value");
    expect(toDoStore.$state.todos[0].content).toBe("New value");
  });
});
