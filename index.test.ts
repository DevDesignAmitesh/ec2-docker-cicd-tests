import { describe, it, expect } from "bun:test";
import axios from "axios";
import type { Todo } from ".";

// const BASE_URL = "http://localhost:3000/";
const BASE_URL = "https://uncombustive-scripturally-thomas.ngrok-free.dev/";
let todoId = "";

describe("/POST todos", () => {
  it("it will return the id of the created todo", async () => {
    const data = {
      id: crypto.randomUUID(),
      title: "choco",
      decription: "hello",
      isCompleted: false,
    } as Todo;
    const res = await axios.post(`${BASE_URL}/todos`, data);
    expect(res.data.id).toBeDefined();
    todoId = res.data.id;
  });
});

describe("/GET-ALL todos", () => {
  it("it will return all the todos", async () => {
    const res = await axios.get(`${BASE_URL}/todos`);
    expect(res.data.todos).toBeDefined();
  });
});

describe("/GET-ONE todos", () => {
  it("it will return single todo", async () => {
    const res = await axios.get(`${BASE_URL}/todos/${todoId}`);
    expect(res.data.todo).toBeDefined();
  });
});

describe("/UPDATE-ONE todos", () => {
  it("it will update a todo", async () => {
    const data: Omit<Todo, "id"> = {
      title: "choco",
      decription: "hello",
      isCompleted: false,
    };
    const res = await axios.put(`${BASE_URL}/todos/${todoId}`, data);
    expect(res.data.message).toBe("done");
  });
});

describe("/DELETE-ONE todos", () => {
  it("it will delete a todo", async () => {
    const res = await axios.delete(`${BASE_URL}/todos/${todoId}`);
    expect(res.data.message).toBe("done");
  });
});
