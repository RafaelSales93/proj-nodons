import { ResolveFn } from '@angular/router';
import { HistoricoService } from '../../../services/historico.service';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Historico } from '../../../shared/model/historico';
import { Observable } from 'rxjs';

export const historicoResolver: ResolveFn<Historico[]> = (route, state): Observable<Historico[]> => {
  const pacienteId = Number(route.queryParams['id']);
  const service = inject(HistoricoService);
  
  if (pacienteId) {
    return service.getHistoricoByIdConsulta(pacienteId).pipe(
      catchError((err) => {
        console.error('Erro ao carregar históricos:', err);
        return of([]); 
      })
    );
  }

  return of([]); 
};
