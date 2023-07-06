import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

import { Observable } from "rxjs";
import { Truck } from "../models/truck.model";

@Injectable({providedIn:'root'})
export class CamionesService {

    private baseUrl: string = environment.backend;

    constructor(private http: HttpClient){ }

    addNewTruck(truck: Truck): Observable<Truck>{
        return this.http.post<Truck>(`${this.baseUrl}/camiones`,truck);
    }

    getTruck():Observable<Truck[]>{
        return this.http.get<Truck[]>(`${this.baseUrl}/camiones`);
    }

    getTruckPorId(idCamion: number):Observable<Truck>{
        return this.http.get<Truck>(`${this.baseUrl}/usuarios/${idCamion}`)
    }

    updateTruck(truck: Truck): Observable<Truck>{
        return this.http.put<Truck>(`${this.baseUrl}/camiones/${truck.idCamion}`, truck);
    }
    
    deleteTruck(idCamion: number): Observable<Truck>{
        return this.http.delete<Truck>(`${this.baseUrl}/camiones/${idCamion}` );
    }
}