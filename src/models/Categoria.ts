

export interface ICategoria {
  _id: string;
  name: string;
  subCategories: ISubCategoria[];
}

export interface ISubCategoria {
  _id: string;
  name: string;
}

export class Categoria {
  
  _id: string;
  name: string;
  subCategories: ISubCategoria[];

  constructor(args: ICategoria) {
    this._id = args._id;
    this.name = args.name;
    this.subCategories = args.subCategories;
  }

}