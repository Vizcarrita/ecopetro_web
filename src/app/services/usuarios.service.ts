import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Usuario } from '../../app/interface/usuarios.interface';
import { Observable } from "rxjs";

@Injectable({providedIn:'root'})
export class UsuariosService {

    private baseUrl: string = environment.backend;

    constructor(private http: HttpClient){ }

    getUsuarios():Observable<Usuario[]>{
        return this.http.get<Usuario[]>(`${this.baseUrl}/usuarios`);
    }
}