import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

import { Observable } from "rxjs";
import { Customer } from "../models/customer.model";

@Injectable({providedIn:'root'})
export class UsuariosService {

    private baseUrl: string = environment.backend;

    constructor(private http: HttpClient){ }

    getUsuarios():Observable<Customer[]>{
        return this.http.get<Customer[]>(`${this.baseUrl}/usuarios`);
    }
    
}