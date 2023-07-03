import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

import { Observable } from "rxjs";
import { Customer } from "../models/customer.model";

@Injectable({providedIn:'root'})
export class UsuariosService {

    private baseUrl: string = environment.backend;

    constructor(private http: HttpClient){ }

    addNewCustomer(customer: Customer): Observable<Customer>{
        return this.http.post<Customer>(`${this.baseUrl}/usuarios`,customer);
    }

    getCustomer():Observable<Customer[]>{
        return this.http.get<Customer[]>(`${this.baseUrl}/usuarios`);
    }

    getCustomerPorId(idUsuario: number):Observable<Customer>{
        return this.http.get<Customer>(`${this.baseUrl}/usuarios/${idUsuario}`)
    }

    updateCustomer(customer: Customer): Observable<Customer>{
        return this.http.put<Customer>(`${this.baseUrl}/usuarios/cambiarDatos/${customer.idUsuario}`, customer);
    }
    
    deleteCustomer(idUsuario: number): Observable<Customer>{
        return this.http.delete<Customer>(`${this.baseUrl}/usuarios/${idUsuario}` );
    }
}