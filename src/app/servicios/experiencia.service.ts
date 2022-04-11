import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../models/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  urlexperiencia: string="http://localhost:7070/api/experiencia/";


  constructor(private http: HttpClient) { }
  getExperiencia(): Observable<Experiencia[]>{
    return this.http.get<Experiencia[]>(this.urlexperiencia+'listar')
  }
  crearExperiencia(experiencia: Experiencia):Observable<Experiencia>{
    return this.http.post<Experiencia>(this.urlexperiencia+'crear',experiencia);
  }
  actualizarExperiencia(experiencia: Experiencia):Observable<Experiencia>{
    return this.http.put<Experiencia>(this.urlexperiencia+'actualizar/'+experiencia.id, experiencia)
  }
  eliminarExperiencia(id: number): Observable<any>{
    return this.http.delete<any>(this.urlexperiencia+'eliminar/'+id)
  }
}
