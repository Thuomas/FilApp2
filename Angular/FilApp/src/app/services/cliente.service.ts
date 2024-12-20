import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cliente, Info } from '../models/Cliente';

import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlApi = "/api/Clientes/clientes.php";
  private urlApiUpdate = "/api/Clientes/Uclientesinicio.php";
  private urlApiFin = "/api/Clientes/Uclientesfin.php";

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

  
  updateCliente(id: number,  usuarioDeAtencion?: string ): Observable<any> {    
    const url = `${this.urlApiUpdate}?id=${id}&usuarioDeAtencion=${usuarioDeAtencion}`;
  
    // Enviar la solicitud POST a la ruta relativa configurada en el proxy
    return this.http.post(url, null).pipe(
      map((response: any) => {
        console.log('Actualización exitosa:', response);
        return response;
      }),
      catchError(error => {
        console.error('Error al actualizar cliente:', error);
        return of(error); // Devolver un observable con el error para manejarlo adecuadamente
      })
    );
  }

  finalizarTurno(id: number): Observable<any> {
    // Usar la URL configurada en la propiedad urlApiFin
    const url = `${this.urlApiFin}?id=${id}`;
    
    // Enviar la solicitud POST sin cuerpo
    return this.http.post(url, null).pipe(
      map((response: any) => {
        console.log('Actualización exitosa:', response);
        return response;
      }),
      catchError(error => {
        console.error('Error al actualizar cliente enEspera:', error);
        return of(error); // Manejar el error adecuadamente
      })
    );
  }




  deleteCliente(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlApi}/${id}`);
  }

  

}
