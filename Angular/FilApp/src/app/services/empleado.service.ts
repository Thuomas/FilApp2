import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Empleado, Informacion } from 'src/app/models/Empleado';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private urlApi = "/api/Empleados/empleados.php";
  private urlApiPost = "/api/Empleados/Pempleados.php";

  constructor(private http: HttpClient) {

  }
  usuarioLogeado: Informacion | null = null;

  getAllEmpleados(): Observable<Empleado> {
    return this.http.get<Empleado>(this.urlApi);
  }

  getEmpleadoById(id: number): Observable<Informacion | undefined> {
    return this.http.get<Empleado>(this.urlApi).pipe(
      map(response => response.data.find(empleado => empleado.id === id)),
      catchError(error => {
        console.error("error al obtener empleado", error);
        return of(undefined);
      })
    );
  }

  updateEmpleado(id: number, empleado: Informacion): Observable<Empleado> {
    return this.http.put<Empleado>(this.urlApi, { id, empleado });
  }

  deleteEmpleado(id: number): Observable<Empleado> {
    return this.http.delete<Empleado>(`${this.urlApi} / ${id}`);
  }

  addEmpleado(
    nombre: string,
    apellido: string,
    usuario: string,
    pass: string,
    idCargo: number,
    idVendedor: number,
    mail: string
  ): Observable<any> {
    const body = {
      nombre,
      apellido,
      usuario,
      pass,
      idCargo,
      idVendedor,
      mail
    };

    return this.http.post(`${this.urlApiPost}`, body);
  }

}


