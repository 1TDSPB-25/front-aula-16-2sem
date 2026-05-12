import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import "./globals.css";
import Home from "./routes/Home/index.tsx";
import Users from "./routes/Users/index.tsx";
import Error from "./routes/Error/index.tsx";
import Alunos from "./routes/Alunos/index.tsx";
import EditarAluno from "./routes/EditarAluno/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/users", element: <Users /> },
      { path: "/alunos", element: <Alunos /> },
      { path: "/editar/aluno/:rm", element: <EditarAluno /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);
