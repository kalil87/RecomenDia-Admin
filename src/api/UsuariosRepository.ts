

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { httpClient } from "../utils/httpClient"
import { Usuario } from "../models/Usuarios"
import { ICreateUsuario } from "../pages/Usuarios/Create/UsuariosCreateForm"



const getUsuariosMapper = (x: any): Usuario => new Usuario(x)

export class UsuariosRepository {
  keys = {
    all: () => ['usuarios'],
    one: (id: string) => ['usuario', id]
  }
  getUsuarios = async () => {
    const { data } = await httpClient.get('/usuarios')
    return data.map(getUsuariosMapper) as Usuario[]
  }

  getUsuario = async (id: string) => {
    const { data } = await httpClient.get(`/usuarios/${id}`)
    return getUsuariosMapper(data)
  }

  register = async (user: ICreateUsuario) => {
    const { data } = await httpClient.post('/usuarios', user)
    return getUsuariosMapper(data);
  }

  update = async (user: Usuario) => {
    const {data} = await httpClient.put(`/usuarios/${user._id}`, user)
    return getUsuariosMapper(data)
  }

  borrarUsuario = async (id: string) => {
    await httpClient.delete(`/usuarios/${id}`)
  }
}

const repo = new UsuariosRepository();

export const useUsuariosQuery = () =>
  useQuery({ queryKey: repo.keys.all(), queryFn: () => repo.getUsuarios() });

export const useOneUsuariosQuery = (id: string) =>
  useQuery({ queryKey: repo.keys.one(id), queryFn: () => repo.getUsuario(id) });


export const useCreateUsuarioMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.register,
    onSuccess: () => {
      qc.invalidateQueries()
    }
  });
};

export const useUpdateUsuarioMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.update,
    onSuccess: () => {
      qc.invalidateQueries()
    }
  });
};

export const useDeleteUsuarioMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.borrarUsuario,
    onSuccess: () => {
      qc.invalidateQueries()
    }
  });
};