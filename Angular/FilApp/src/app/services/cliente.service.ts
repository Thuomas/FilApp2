import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cliente, Informacion } from '../models/Cliente';

import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlApi = "/api/clientes.php";
  constructor(private http: HttpClient) {
  }

  getAllClientes(): Observable<Cliente> {
    return this.http.get<Cliente>(this.urlApi);
  }

  getClienteById(id: number): Observable<Informacion | undefined> {
    return this.http.get<Cliente>(this.urlApi).pipe(
      map(response => response.data.find(cliente => cliente.id === id)),
      catchError(error => {
        console.error("error al obtener empleado", error);
        return of(undefined);
      })
    );
  }
  addCliente(empleado: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.urlApi, empleado)
  }

  updateCliente(id: number, empleado: Informacion): Observable<Cliente>{
    return this.http.put<Cliente>(this.urlApi,{id, empleado} );
  }

  deleteCliente(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlApi}/${id}`);
  }

  

}
