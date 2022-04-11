import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Acercade} from '../models/acercade';

@Injectable({
  providedIn: 'root'
})
export class AcercadeService {

  urlpersona: string='http://localhost:7070/api/persona/';

  
  constructor(private http:HttpClient) { }
  getAcercade(): Observable<Acercade[]>{
   return this.http.get<Acercade[]>(this.urlpersona+'listar');
  }
  crearAcercade(acercade: Acercade):Observable<Acercade>{
    return this.http.post<Acercade>(this.urlpersona+'crear',acercade);
  }
  actualizarAcercade(acercade: Acercade):Observable<Acercade>{
    return this.http.put<Acercade>(this.urlpersona+'actualizar/'+acercade.id, acercade)
  }
  eliminarAcercade(id: number): Observable<any>{
    return this.http.delete<any>(this.urlpersona+'eliminar/'+id)
  }
}
