import { useEffect ,useState } from "react";
 import service from '../TasksService';
 export default function Tasks() {

    const [newTodo, setNewTodo] = useState("");
    const [todos, setTodos] = useState([]);
  
    // פונקציות לשליטה במשימות
    async function getTodos() {
      const todos = await service.getTasks();
      setTodos(todos);
    }
  
    async function createTodo(e) {
      e.preventDefault();
      await service.addTask(newTodo);
      setNewTodo(""); // לנקות את שדה הקלט
      await getTodos(); // לרענן את רשימת המשימות
    }
  
    async function updateCompleted(todo, isComplete) {
      await service.setCompleted(todo.id, isComplete);
      await getTodos();
    }
  
    async function deleteTodo(id) {
      await service.deleteTask(id);
      await getTodos();
    }
  
    // אם יש Token, נטען את המשימות
    useEffect(() => {
      const token = localStorage.getItem("access_token");
      if (token) {
        getTodos();
      }
    }, []);
    return (
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
          </section>
    );
}