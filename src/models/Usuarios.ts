

export interface IUsuario {
  _id: string;
  name: string;
  email: string;
  password: string;
  nationality: string;
  verificado: boolean;
}



export class Usuario {
  
  _id: string;
  name: string;
  email: string;
  password: string;
  nationality: string;
  verificado: boolean;

  constructor(args: IUsuario) {
    this._id = args._id;
    this.name = args.name;
    this.email = args.email;
    this.password = args.password;
    this.nationality = args.nationality
    this.verificado = args.verificado;
  }

}