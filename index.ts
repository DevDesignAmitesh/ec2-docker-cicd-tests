import express from "express";

const app = express();
app.use(express.json());

export type Todo = {
  id: string;
  title: string;
  decription: string;
  isCompleted: boolean;
}

let todos: Todo[] = []

app.get("/todos", (req, res) => {
  res.json({ todos });
})

app.get("/todos/:id", (req, res) => {
  console.log("req.params ", req.params)
  const todo = todos.find((td) => td.id === req.params.id);
  if (!todo) return res.status(404).json({ message: "not found" })

  return res.json({ todo });
})

app.post("/todos", (req, res) => {
  const data = req.body as Todo;
  const id = crypto.randomUUID();

  todos.push({...data, id });

  return res.status(201).json({ id })
})

app.delete("/todos/:id", (req, res) => {
  console.log("req.params ", req.params)
  
  const todo = todos.find((td) => td.id === req.params.id);
  if (!todo) return res.status(404).json({ message: "not found" })

  const filteredTodos = todos.filter((td) => td.id !== req.params.id);
  todos = filteredTodos;

  res.json({ message: "done" })
})

app.put("/todos/:id", (req, res) => {
  console.log("req.params ", req.params)
  const data = req.body as Omit<Todo, "id">;
  const todo = todos.find((td) => td.id === req.params.id);
  if (!todo) return res.status(404).json({ message: "not found" })

  const updatedTodo: Todo = {
    id: todo.id,
    title: data.title ?? todo.title,
    decription: data.decription ?? todo.decription,
    isCompleted: data.isCompleted ?? todo.isCompleted,
  }

  const filteredTodos = todos.filter((td) => td.id !== req.params.id);
  const finalTodos = [...filteredTodos, updatedTodo]
  todos = finalTodos

  res.json({ message: "done" })

});


app.listen(3000)