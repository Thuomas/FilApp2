import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cliente, Info } from '../models/Cliente';

import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlApi = "/api/clientes.php";
  //esta url es para hacer el update de cliente pero apunta a filapp2 (???!!!!
  private urlApi2 = "http://localhost/filapp2/php/api/Clientes/Uclientesinicio.php";

  constructor(private http: HttpClient) {
  }

  getAllClientes(): Observable<Cliente> {
    return this.http.get<Cliente>(this.urlApi);
  }

  getClienteById(id: number): Observable<Info | undefined> {
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

  //TODO: modificar parametros para que reciba id del cliente a modificar
  //quien lo antiende (string) y el estado de enEspera pasarlo a 3
  updateCliente(id: number, empleado: Info): Observable<Cliente>{
    return this.http.put<Cliente>(this.urlApi,{id, empleado} );
  }

  deleteCliente(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlApi}/${id}`);
  }

  

}
