import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Usuario, AuthResponse } from '../auth/interface/auth.interface';
import { catchError, map, tap } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { Customer } from "../models/customer.model";

@Injectable({
    providedIn:'root'
})
export class AuthService{

    private readonly baseUrl: string = environment.backend;
    private _currentUsuario!: Usuario;

    get usuario(){
        return { ...this._currentUsuario };
    }
    
    constructor(private http: HttpClient) { }
    
    registro(customer: Customer): Observable<Customer>{
        return this.http.post<Customer>(`${this.baseUrl}/usuarios`,customer);
    }

    login( correo: string, pass: string ){
        const url = `${ this.baseUrl }/usuarios/login`;
        const body = { correo, pass };
        return this.http.post<AuthResponse>(url,body)
        .pipe(
            tap(({ok, token}) => {
                if( ok ){
                    localStorage.setItem('token', token!);
                }
            }),
            map(resp => resp.ok),
            catchError(err => of(err.error.msg) )
            
        )
    }

    logout(){
        localStorage.removeItem("token");
      }
}
