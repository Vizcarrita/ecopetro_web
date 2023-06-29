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
}
// get name(){
//   let name = '';
  
//   if (this.nombreUsuario && this.apellido){
//     name = this.nombreUsuario + ' ' + this.apellido;
//   } else if ( this.nombreUsuario ){
//     name = this.nombreUsuario;
//   } else if ( this.apellido ){
//     name = this.apellido;
//   }
//   return name;
// }
// set name (value){
  
// }

