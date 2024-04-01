import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import { LoginPage } from "./pages/Login/LoginPage";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { Categorias } from "./pages/Categorias/Categorias";
import { Usuarios } from "./pages/Usuarios/Usuarios";
import { Recomendaciones } from "./pages/Recomendaciones/Recomendaciones";
import { PATHS } from "./routes/paths";
import { UsuariosCreatePage } from "./pages/Usuarios/Create/UsuariosCreatePage";
import { UsuariosUpdatePage } from "./pages/Usuarios/Update/UsuariosUpdatePage";
import { RestorePass } from "./pages/Restore/RestorePass";
import { CategoriasUpdatePage } from "./pages/Categorias/update/CategoriasUpdatePage";
import { CategoriasCreatePage } from "./pages/Categorias/create/CategoriasCreatePage";
import { RecomendacionUpdatePage } from "./pages/Recomendaciones/Update/RecomendacionUpdatePage";
import { RecomendacionCreatePage } from "./pages/Recomendaciones/Create/RecomendacionCreatePage";

const router = createBrowserRouter([
  {
    path: PATHS.auth.root,
    element: <LoginPage />,
    index: true
  },
  {
    path: '/auth/restore/:token',
    element: <RestorePass />,
  },
  {
    path: PATHS.dashboard.root,
    element: <DashboardLayout />,
    children: [
      // ROOT
      {path: PATHS.dashboard.root, element: <Usuarios />},

      // USUARIOS
      {path: PATHS.dashboard.usuarios.root, element: <Usuarios />},
      {path: PATHS.dashboard.usuarios.create, element: <UsuariosCreatePage />},
      {path: '/dashboard/usuarios/:id', element: <UsuariosUpdatePage />},

      // CATEGORIAS
      {path: PATHS.dashboard.categorias.root, element: <Categorias />},
      {path: PATHS.dashboard.categorias.create, element: <CategoriasCreatePage />},
      {path: '/dashboard/categorias/:id', element: <CategoriasUpdatePage />},

      // RECOMENDACIONES
      {path: PATHS.dashboard.recomendaciones.root, element: <Recomendaciones />},
      {path: PATHS.dashboard.recomendaciones.create, element: <RecomendacionCreatePage />},
      {path: '/dashboard/recomendaciones/:id', element: <RecomendacionUpdatePage />},
    ]
  },
  {
    path: "/*",
    element: <LoginPage />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
