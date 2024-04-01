import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Categoria } from "../models/Categoria"
import { httpClient } from "../utils/httpClient"
import { ICreateCategoria } from "../pages/Categorias/create/CategoriasCreateForm"


const getCategoriasMapper = (x: any): Categoria => new Categoria(x)

export class CategoriasRepository {
  keys = {
    all: () => ['categorias'],
    one: (id: string) => ['categoria', id]
  }
  getCategorias = async () => {
    const { data } = await httpClient.get('/categorias')
    return data.map(getCategoriasMapper) as Categoria[]
  }
  getCategoria = async (id: string) => {
    const { data } = await httpClient.get(`/categorias/${id}`)
    return getCategoriasMapper(data)
  }

  update = async (categoria: Categoria) => {
    const {data} = await httpClient.put(`/categorias/${categoria._id}`, categoria)
    return getCategoriasMapper(data)
  }

  crearSubcategoria = async (dataSend : { categoriaId: string, subcatName: { name: string } }) => {
    const {data} = await httpClient.post(`/categorias/subcategorias/${dataSend.categoriaId}`, dataSend.subcatName);
    return getCategoriasMapper(data);
  }

  borrarCategoria = async (id: string) => {
    await httpClient.delete(`/categorias/${id}`)
  }

  create = async (categoria: ICreateCategoria) => {
    const { data } = await httpClient.post('/categorias/categoriaConSub', categoria)
    return getCategoriasMapper(data);
  }

  borrarSubcategoria = async (ids: {categoria: string, subcategoria: string}) => {
    await httpClient.delete(`/categorias/subcategorias/${ids.categoria}/${ids.subcategoria}`)
  }
}

const repo = new CategoriasRepository();

export const useCategoriasQuery = () =>
  useQuery({ queryKey: repo.keys.all(), queryFn: () => repo.getCategorias() });

export const useOneCategoriaQuery = (id: string) =>
  useQuery({ queryKey: repo.keys.one(id), queryFn: () => repo.getCategoria(id) });

export const useCreateCategoriaMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.create,
    onSuccess: () => {
      qc.invalidateQueries()
    }
  });
};


export const useUpdateCategoriaMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.update,
    onSuccess: () => {
      qc.invalidateQueries()
    }
  });
};

export const useCreateSubCategoriaMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.crearSubcategoria,
    onSuccess: () => {
      qc.invalidateQueries()
    }
  });
};

export const useDeleteSubCategoriaMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.borrarSubcategoria,
    onSuccess: () => {
      qc.invalidateQueries()
    }
  });
};

export const useDeleteCategoriaMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.borrarCategoria,
    onSuccess: () => {
      qc.invalidateQueries()
    }
  });
};