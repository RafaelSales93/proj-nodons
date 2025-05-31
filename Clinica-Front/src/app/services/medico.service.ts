import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medico } from '../shared/model/medico';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  private readonly apiUrl = 'http://localhost:8080/api/medico';

  constructor(private readonly http: HttpClient) {}

  getMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.apiUrl);
  }

  getMedicoById(id: number): Observable<Medico> {
    return this.http.get<Medico>(`${this.apiUrl}/${id}`);
  }

  createMedico(medico: Medico): Observable<Medico> {
    return this.http.post<Medico>(this.apiUrl, medico);
  }

  updateMedico(id: number, medico: Medico): Observable<Medico> {
    return this.http.put<Medico>(`${this.apiUrl}/atualizar/${id}`, medico);
  }

  deleteMedico(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
