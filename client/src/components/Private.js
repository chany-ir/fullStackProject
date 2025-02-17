import React from "react";
import Sessions from "./Sessions";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
 import { useEffect ,useState } from "react";
 import service from '../TasksService';
//  import '../index.css';

export default function Private() {

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
