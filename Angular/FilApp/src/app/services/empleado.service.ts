import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Empleado, Informacion } from 'src/app/models/Empleado';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private urlApi = "/api/empleados.php";

  constructor(private http: HttpClient) {

  }
  usuarioLogeado: Informacion | null = null ;

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

  addEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.urlApi, empleado)
  }

  updateEmpleado(id: number, empleado: Informacion): Observable<Empleado> {
    return this.http.put<Empleado>(this.urlApi, { id, empleado });
  }

  deleteEmpleado(id: number): Observable<Empleado> {
    return this.http.delete<Empleado>(`${this.urlApi}/${id}`);
  }
}
