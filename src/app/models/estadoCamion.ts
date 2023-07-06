export class EstadoCamion {
    idEstadoCamion      : number;
    nombreEstadoCamion  : string;
    constructor(estadoCamion){
        this.idEstadoCamion     = estadoCamion.idEstadoCamion;
        this.nombreEstadoCamion = estadoCamion.nombreEstadoCamion;
    }
}