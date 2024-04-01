export const PATHS = {
  path: '',
  auth: {
    root: '/login',
    restore: (token: string) => `/restore/${token}`
  },
  dashboard: {
    root: '/dashboard',
    usuarios: {
      root: '/dashboard/usuarios',
      create: '/dashboard/usuarios/create',
      update: (id: string) => `/dashboard/usuarios/${id}`
    },
    categorias: {
      root: '/dashboard/categorias',
      create: '/dashboard/categorias/create',
      update: (id: string) => `/dashboard/categorias/${id}`
    },
    recomendaciones: {
      root: '/dashboard/recomendaciones',
      create: '/dashboard/recomendaciones/create',
      update: (id: string) => `/dashboard/recomendaciones/${id}`
    },
  }
} as const;

export const PATHS_PER_ROLE = [
  {
    role: 'admin',
    paths: [
      PATHS.dashboard.root,
    ],
  },
];
