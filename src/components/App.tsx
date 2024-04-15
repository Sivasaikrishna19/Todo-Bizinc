import { Button, Input } from "antd";
import React, { useState } from "react";
import Todos from "./Todos/Todos";

export interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleAdd = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        task: inputValue,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggleComplete = (id: number) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    }));
  };

  const handleUpdate = (id: number, newTask: string) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, task: newTask };
      }
      return todo;
    }));
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-[60%] m-auto py-4">
        <div className="text-[32px] flex justify-center">Todo App</div>
        <div className="flex items-center mt-4">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task"
          />
          <Button onClick={handleAdd} className="ml-2" type="primary">Add</Button>
        </div>
        <div className="mt-4">
          <div className="text-[24px] mb-4">Todos</div>
          <Todos
            todos={todos}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
            onUpdate={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
