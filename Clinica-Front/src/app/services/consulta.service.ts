import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consulta } from '../shared/model/consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private readonly apiUrl = 'http://localhost:8080/api/consulta';

  constructor(private readonly http: HttpClient) {}

  getConsultas(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(this.apiUrl);
  }

  getConsultaById(id: number): Observable<Consulta> {
    return this.http.get<Consulta>(`${this.apiUrl}/${id}`);
  }

  getConsultasByPaciente(pacienteId: number): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(`${this.apiUrl}/paciente/${pacienteId}`);
  }

  createConsulta(consulta: Consulta): Observable<Consulta> {
    return this.http.post<Consulta>(this.apiUrl, consulta);
  }

  updateConsulta(consulta: Consulta): Observable<Consulta> {
    return this.http.put<Consulta>(`${this.apiUrl}/${consulta.id}`, consulta);
  }
  
  deleteConsulta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getTodasConsultasByPaciente(pacienteId: number) {
    return this.http.get<Consulta[]>(`${this.apiUrl}/paciente/${pacienteId}/todas`);
  }
  
  
}
