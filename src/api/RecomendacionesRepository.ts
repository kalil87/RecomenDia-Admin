

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { httpClient } from "../utils/httpClient"
import { Recomendaciones } from "../models/Recomendaciones"

export interface ICreateRecomendacion {
  categoria: string;
  subcategoria: string;
  idUser: string;
  especificaciones: string | null | undefined;
}

const getRecomendacionesMapper = (x: any): Recomendaciones => new Recomendaciones(x)

export class RecomendacionesRepository {
  keys = {
    all: () => ['recomendaciones'],
    one: (id: string) => ['recomendacion', id]
  }
  getRecomendaciones = async () => {
    const { data } = await httpClient.get('/recomendacion')
    return data.map(getRecomendacionesMapper) as Recomendaciones[]
  }
  update = async (recomendacion: Recomendaciones) => {
    const {data} = await httpClient.put(`/recomendacion/${recomendacion._id}`, recomendacion)
    return getRecomendacionesMapper(data)
  }
  borrarRecomendacion = async (id: string) => {
    await httpClient.delete(`/recomendacion/${id}`)
  }
  getRecomendacion = async (id: string) => {
    const { data } = await httpClient.get(`/recomendacion/${id}`)
    return getRecomendacionesMapper(data)
  }
  create = async (recomendacion: ICreateRecomendacion) => {
    const { data } = await httpClient.post('/recomendacion', recomendacion)
    return getRecomendacionesMapper(data);
  }
}

const repo = new RecomendacionesRepository();

export const useRecomendacionesQuery = () =>
  useQuery({ queryKey: repo.keys.all(), queryFn: () => repo.getRecomendaciones() });


export const useDeleteRecomendacionMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.borrarRecomendacion,
    onSuccess: () => {
      qc.invalidateQueries()
    }
  });
};

export const useCreateRecomendacionMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.create,
    onSuccess: () => {
      qc.invalidateQueries()
    }
  });
};

export const useOneRecomendacionQuery = (id: string) =>
  useQuery({ queryKey: repo.keys.one(id), queryFn: () => repo.getRecomendacion(id) });

export const useUpdateRecomendacionMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.update,
    onSuccess: () => {
      qc.invalidateQueries()
    }
  });
};