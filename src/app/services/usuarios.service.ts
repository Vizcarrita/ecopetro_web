import { environment } from "src/environments/environment";
import { Usuario } from "../models/users.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export class UsuariosService {
    private readonly baseUrl: string = environment.backend;
    constructor(private http: HttpClient) {}


    getUsuarios():Observable<Usuario[]>{
        return this.http.get<Usuario[]>(`${this.baseUrl}/usuarios`);
    }
}