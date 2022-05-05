import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../models/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  //Esta URL obtiene el listado de todo los empleados en el backend
  url: string='https://portfolio-hormazabal.herokuapp.com/api/educacion/';


  constructor(private http:HttpClient) { }
  getEducacion(): Observable<Educacion[]>{
   return this.http.get<Educacion[]>(this.url+'listar');
  }
  crearEducacion(educacion: Educacion):Observable<Educacion>{
    return this.http.post<Educacion>(this.url+'crear',educacion);
  }
  actualizarEducacion(educacion: Educacion):Observable<Educacion>{
    return this.http.put<Educacion>(this.url+'actualizar/'+educacion.id, educacion)
  }
  eliminarEducacion(id: number): Observable<any>{
    return this.http.delete<any>(this.url+'eliminar/'+id)
  }
}
