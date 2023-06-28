import { EstadoUsuario } from "./estadoUsuario.model";
import { FkTipoUsuario } from "./fkTipoUsuario.model";

export class Customer{
  nombreUsuario   : string;
  apellido        : string;
  correo          : string;
  telefono        : string;
  idUsuario?      : number;
  fechaCreacion?  : string;
  FKTipoUsuario?  : FkTipoUsuario;
  estadoUsuario?  : EstadoUsuario;
  constructor(customer){
    this.idUsuario      = customer.idUsuario;
    this.nombreUsuario  = customer.nombreUsuario;
    this.apellido       = customer.apellido;
    this.correo         = customer.correo;
    this.fechaCreacion  = customer.fechaCreacion;
    this.telefono       = customer.telefono;
    this.FKTipoUsuario  = customer.FKTipoUsuario;
    this.estadoUsuario  = customer.estadoUsuario;
  }
  get name(){
    let name = '';
    
    if (this.nombreUsuario && this.apellido){
      name = this.nombreUsuario + ' ' + this.apellido;
    } else if ( this.nombreUsuario ){
      name = this.nombreUsuario;
    } else if ( this.apellido ){
      name = this.apellido;
    }
    return name;
  }
  set name (value){
    
  }
}

//  export class Customer {
//    id: number;
//    firstName: string;
//    lastName: string;
//    street: string;
//    zipcode: number;
//    city: string;
//    phoneNumber: string;
//    mail: string;

//    constructor(customer) {
//      this.id = customer.id;
//      this.firstName = customer.firstName;
//      this.lastName = customer.lastName;
//      this.street = customer.street;
//      this.zipcode = customer.zipcode;
//      this.city = customer.city;
//      this.phoneNumber = customer.phoneNumber;
//      this.mail = customer.mail;
//    }

//    get name() {
//      let name = '';

//      if (this.firstName && this.lastName) {
//        name = this.firstName + ' ' + this.lastName;
//      } else if (this.firstName) {
//        name = this.firstName;
//      } else if (this.lastName) {
//        name = this.lastName;
//      }

//      return name;
//    }

//    set name(value) {
//    }

//    get address() {
//      return `${this.street}, ${this.zipcode} ${this.city}`;
//    }

//    set address(value) {
//    }
//  }

// interface FKTipoUsuario {
//   idTipoUsuarios: number;
//   nombre:         string;
// }

// interface EstadoUsuario {
//   idEstadoUsuarios: number;
//   nombreEstado:     string;
// }
// export class Customer{
//   constructor(
//   public apellido         : string,
//   public correo           : string,
//   public estadoUsuario    : EstadoUsuario,
//   public nombreUsuario    : string,
//   public telefono         : string,
//   public fechaCreacion?   : string,
//   public idUsuario?       : string,
//   ){}
// }