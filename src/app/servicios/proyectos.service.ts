import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyectos } from '../models/proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  urlproyectos: string="http://localhost:7070/api/proyecto/"

  constructor(private http: HttpClient) { }
  getProyectos(): Observable<Proyectos[]>{
    return this.http.get<Proyectos[]>(this.urlproyectos+'listar')
  }
  crearProyectos(proyectos: Proyectos):Observable<Proyectos>{
    return this.http.post<Proyectos>(this.urlproyectos+'crear',proyectos);
  }
  actualizarProyectos(proyectos: Proyectos):Observable<Proyectos>{
    return this.http.put<Proyectos>(this.urlproyectos+'actualizar/'+proyectos.id, proyectos)
  }
  eliminarProyectos(id: number): Observable<any>{
    return this.http.delete<any>(this.urlproyectos+'eliminar/'+id)
  }
}
