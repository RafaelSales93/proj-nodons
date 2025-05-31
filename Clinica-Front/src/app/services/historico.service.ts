import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Historico } from '../shared/model/historico';

@Injectable({
  providedIn: 'root',
})
export class HistoricoService {
  private readonly apiUrl = 'http://localhost:8080/api/historico';

  constructor(private readonly http: HttpClient) {}

  getHistoricos(): Observable<Historico[]> {
    return this.http.get<Historico[]>(this.apiUrl);
  }

  getHistoricoByIdConsulta(idConsulta: number): Observable<Historico[]> {
    return this.http.get<Historico[]>(`${this.apiUrl}/${idConsulta}`);
  }

  getHistoricosByPacienteId(pacienteId: number): Observable<Historico[]> {
    return this.http.get<Historico[]>(`${this.apiUrl}/paciente/${pacienteId}/todas`);
  }

  createHistorico(historico: Historico): Observable<Historico> {
    return this.http.post<Historico>(this.apiUrl, historico);
  }

  updateHistorico(id: number, historico: Historico): Observable<Historico> {
    return this.http.put<Historico>(`${this.apiUrl}/${id}`, historico);
  }

  deleteHistorico(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
