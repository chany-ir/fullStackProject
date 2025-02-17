import React from "react";
import Sessions from "./Sessions";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
 import { useEffect ,useState } from "react";
 import service from '../TasksService';
//  import '../index.css';

export default function Private() {

  // const [newTodo, setNewTodo] = useState("");
  // const [todos, setTodos] = useState([]);

  // // פונקציות לשליטה במשימות
  // async function getTodos() {
  //   const todos = await service.getTasks();
  //   setTodos(todos);
  // }

  // async function createTodo(e) {
  //   e.preventDefault();
  //   await service.addTask(newTodo);
  //   setNewTodo(""); // לנקות את שדה הקלט
  //   await getTodos(); // לרענן את רשימת המשימות
  // }

  // async function updateCompleted(todo, isComplete) {
  //   await service.setCompleted(todo.id, isComplete);
  //   await getTodos();
  // }

  // async function deleteTodo(id) {
  //   await service.deleteTask(id);
  //   await getTodos();
  // }

  // // אם יש Token, נטען את המשימות
  // useEffect(() => {
  //   const token = localStorage.getItem("access_token");
  //   if (token) {
  //     getTodos();
  //   }
  // }, []);

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="md">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          דף פרטי
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          את המידע בדף הזה יכולים לראות רק משתמשים מחוברים.
        </Typography>
        <Typography
          component="h5"
          variant="h5"
          align="center"
          color="text.primary"
          gutterBottom
        >
          מידע על התחברויות המשתמש
        </Typography>
        { <Sessions /> }
        
        {/* אם יש token, תציג את רשימת המשימות
        {localStorage.getItem("access_token") && (
          <section className="todoapp">
            <header className="header">
              <h1>todos</h1>
              <form onSubmit={createTodo}>
                <input
                  className="new-todo"
                  placeholder="Well, let's take on the day"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                />
              </form>
            </header>
            <section className="main" style={{ display: "block" }}>
              <ul className="todo-list">
                {todos.map((todo) => {
                  return (
                    <li
                      className={todo.isComplete ? "completed" : ""}
                      key={todo.id}
                    >
                      <div className="view">
                        <input
                          className="toggle"
                          type="checkbox"
                          defaultChecked={todo.isComplete}
                          onChange={(e) =>
                            updateCompleted(todo, e.target.checked)
                          }
                        />
                        <label>{todo.taskName}</label>
                        <button
                          className="destroy"
                          onClick={() => deleteTodo(todo.id)}
                        ></button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          </section> */}
        {/* )} */}
      </Container>
    </Box>
  );
}
