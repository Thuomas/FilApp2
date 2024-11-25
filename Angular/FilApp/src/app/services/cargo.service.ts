import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Cargo, InformacionCargo } from '../models/Cargo';

@Injectable({
  providedIn: 'root'
})
export class CargosService {

  private urlApi= "/api/cargos.php";

  constructor(private http: HttpClient) { }

  getAllCargos(): Observable<Cargo>{
    return this.http.get<Cargo>(this.urlApi);
  }

  getCargoById(id: number): Observable<InformacionCargo | undefined> {
    return this.http.get<Cargo>(this.urlApi).pipe(
      map(response => response.data.find(cargo => cargo.idCargo === id)),
      catchError((error) =>{
        console.error("error al obtener empleado", error);
        return of(undefined);
      })
    );
  }

  addCargo(cargo: Cargo): Observable<Cargo>{
    return this.http.post<Cargo>(this.urlApi, cargo)
  }

  updateCargo(id: number, cargo: InformacionCargo): Observable<Cargo>{
    return this.http.put<Cargo>(this.urlApi,{id ,cargo});
  }

  deleteCargo(id: number): Observable<Cargo>{
    return this.http.delete<Cargo>(`${this.urlApi}/${id}`);
  }
}
