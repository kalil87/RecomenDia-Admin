



export interface IRecomendaciones {
  _id: string;
  id: string;
  idUser: string;
  message: string;
  categoriaId: string;
  subcategoriaId: string;
}


export class Recomendaciones {
  
  _id: string;
  id: string;
  idUser: string;
  message: string;
  categoriaId: string;
  subcategoriaId: string;

  constructor(args: IRecomendaciones) {
    this._id = args._id;
    this.id = args.id;
    this.idUser = args.idUser
    this.message = args.message
    this.categoriaId = args.categoriaId;
    this.subcategoriaId = args.subcategoriaId;
  }

}