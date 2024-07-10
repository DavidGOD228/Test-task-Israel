import { Todo, User } from '../types/app';
import axios from 'axios';

export interface API {
    login: (username: string, password: string) => Promise<User>;
    getUser: (id: number) => Promise<User>;
    getTodos: (userId: number) => Promise<Todo[]>;
    getTodo: (id: number) => Promise<Todo>;
    createTodo: (userId: number, todo: string) => Promise<Todo>;
    updateTodo: (id: number, todo: Partial<Omit<Todo, "id">>) => Promise<Todo>;
    deleteTodo: (id: number) => Promise<Todo[]>;
}

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
});

const login = async (username: string, password: string): Promise<User> => {
    const response = await instance.post('/login', { username, password });
    return response.data;
};

const getUser = async (id: number): Promise<User> => {
    const response = await instance.get(`/user/${id}`);
    return response.data;
};

const getTodos = async (userId: number): Promise<Todo[]> => {
    const response = await instance.get(`/todos/${userId}`);
    return response.data;
};

const getTodo = async (id: number): Promise<Todo> => {
    const response = await instance.get(`/todo/${id}`);
    return response.data;
};

const createTodo = async (userId: number, todo: string): Promise<Todo> => {
    const response = await instance.post('/todo', { userId, title: todo, completed: false });
    return response.data;
};

const updateTodo = async (id: number, todo: Partial<Omit<Todo, "id">>): Promise<Todo> => {
    const response = await instance.put(`/todo/${id}`, todo);
    return response.data;
};

const deleteTodo = async (id: number): Promise<Todo[]> => {
    const response = await instance.delete(`/todo/${id}`);
    return response.data;
};

export {
    login,
    getUser,
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
};

