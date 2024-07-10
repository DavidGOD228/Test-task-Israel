
export interface User {
    id: number;
    name: string;
    email: string;
    profileUrl: string;
}

export interface LoginForm {
    username: string;
    password: string;
}

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}