
// import { Route, Routes } from "react-router-dom";
// //  import { BrowserRouter as Router} from 'react-router-dom';
// import AppRoutes from "./AppRoutes";
// import Layout from "./components/Layout";
// import { CacheProvider } from '@emotion/react';
// import React, { useEffect, useState } from 'react';
// import service from './TasksService';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import createCache from '@emotion/cache';
// import rtlPlugin from 'stylis-plugin-rtl';
// import { prefixer } from 'stylis';
// // const cacheRtl = {}; 
// const cacheRtl = createCache({
//   key: 'muirtl',
//   stylisPlugins: [prefixer, rtlPlugin], // מוסיף את תמיכת ה-RTL
// });
// const theme = createTheme({
//   direction: 'rtl', // מאפשר RTL
// });
// function App() {
//   const [newTodo, setNewTodo] = useState("");
//   const [todos, setTodos] = useState([]);

//   async function getTodos() {
//     const todos = await service.getTasks();
//     setTodos(todos);
//   }

//   async function createTodo(e) {
//     e.preventDefault();
//     await service.addTask(newTodo);
//     setNewTodo("");//clear input
//     await getTodos();//refresh tasks list (in order to see the new one)
//   }

//   async function updateCompleted(todo, isComplete) {
//     await service.setCompleted(todo.id, isComplete);
//     await getTodos();//refresh tasks list (in order to see the updated one)
//   }

//   async function deleteTodo(id) {
//     await service.deleteTask(id);
//     await getTodos();//refresh tasks list
//   }

//   // useEffect(() => {
//   //   getTodos();
//   // }, []);

//   return (
//     <div className="App">
//       <ThemeProvider theme={theme}>
//     <CacheProvider value={cacheRtl}>
//     {/* <Router> */}
//       <Layout>
//         <Routes>
//           {AppRoutes.map((route, index) => {
//             const { element, ...rest } = route;
//             return <Route key={index} {...rest} element={element} />;
//           })}
//         </Routes>
//       </Layout>
//       {/* </Router> */}
//       </CacheProvider>
//       </ThemeProvider>
//   </div>
  
//    ); 
// }

// export default App; 
import React from 'react';
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Layout from "./components/Layout";
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  return (
    <div className="App">
      <CacheProvider value={cacheRtl}>
        <Layout>
          <Routes>
            {AppRoutes.map((route, index) => {
              const { element, ...rest } = route;
              return <Route key={index} {...rest} element={element} />;
            })}
          </Routes>
        </Layout>
        </CacheProvider>
    </div>
  );
}

export default App;