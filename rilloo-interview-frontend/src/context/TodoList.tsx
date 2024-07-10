import { createContext, useState } from "react";
import {
  createTodo as createTodoApi,
  deleteTodo as deleteTodoApi,
  updateTodo as updateTodoApi,
  getTodos as getTodosApi,
} from "../api";
import { Todo } from "../types/app";

export interface TodoContextType {
  todos: Todo[];
  addTodo: (userId: number, title: string) => Promise<void>;
  toggleTodoCompletion: (id: number, completed: boolean) => Promise<void>;
  removeTodo: (id: number) => Promise<void>;
  fetchTodos: (userId: number) => Promise<void>;
}

const TodoContext = createContext<TodoContextType>({} as TodoContextType);

const TodoContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = async (userId: number, title: string) => {
    try {
      const newTodo = await createTodoApi(userId, title);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const toggleTodoCompletion = async (id: number, completed: boolean) => {
    try {
      const updatedTodo = await updateTodoApi(id, { completed });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const removeTodo = async (id: number) => {
    try {
      await deleteTodoApi(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const fetchTodos = async (userId: number) => {
    try {
      const todos = await getTodosApi(userId);
      setTodos(todos);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, toggleTodoCompletion, removeTodo, fetchTodos }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContextProvider, TodoContext };
