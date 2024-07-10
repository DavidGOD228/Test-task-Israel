import { useContext, useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Checkbox,
  List,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { TodoContext } from "../../context/TodoList";
import authContext from "../../context/Auth";
function Home() {
  const { user } = useContext(authContext);

  const [todoInput, setTodoInput] = useState<string>("");
  const { todos, addTodo, toggleTodoCompletion, removeTodo, fetchTodos } =
    useContext(TodoContext);

  const onAdd = async () => {
    if (todoInput.trim() !== "") {
      await addTodo(user!.id, todoInput);
      setTodoInput("");
    }
  };

  useEffect(() => {
    fetchTodos(user!.id);
  }, []);

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Todo List
      </Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        mt={3}
        rowGap={2}
      >
        <TextField
          id="todoInput"
          label="Add a new todo"
          variant="outlined"
          fullWidth
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={onAdd}>
          Add
        </Button>
      </Box>
      <List sx={{ mt: 2 }}>
        {todos.map((todo) => (
          <Card key={todo.id} sx={{ mb: 2 }}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleTodoCompletion(todo.id, !todo.completed)}
                sx={{ mr: 2 }}
              />
              <Typography
                variant="h5"
                sx={{
                  flexGrow: 1,
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Button
                color="error"
                variant="outlined"
                onClick={() => removeTodo(todo.id)}
              >
                Remove
              </Button>
            </CardActions>
          </Card>
        ))}
      </List>
    </Box>
  );
}
export default Home;
