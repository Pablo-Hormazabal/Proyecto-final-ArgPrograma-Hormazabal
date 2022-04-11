import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HardSoftSkills } from '../models/hard-soft-skills';

@Injectable({
  providedIn: 'root'
})
export class HardSoftSkillsService {
  urlhsys: string="http://localhost:7070/api/hard_soft_skills/";


  constructor(private http: HttpClient) { }
  getHardsoftskills(): Observable<HardSoftSkills[]>{
    return this.http.get<HardSoftSkills[]>(this.urlhsys+'listar')
  }

  crearHardSoftSkills(hardSoftSkills: HardSoftSkills):Observable<HardSoftSkills>{
    return this.http.post<HardSoftSkills>(this.urlhsys+'crear',hardSoftSkills);
  }
  actualizarHardSoftSkills(hardSoftSkills: HardSoftSkills):Observable<HardSoftSkills>{
    return this.http.put<HardSoftSkills>(this.urlhsys+'actualizar/'+hardSoftSkills.id, hardSoftSkills)
  }
  eliminarHardSoftSkills(id: number): Observable<any>{
    return this.http.delete<any>(this.urlhsys+'eliminar/'+id)
  }
}
