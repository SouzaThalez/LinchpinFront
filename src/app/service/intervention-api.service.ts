import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Intervention, InterventionForm, InterventionSource } from '../models/intervention';
import { environment } from '../../environments/environment';

/** Intervenções sobre os chamados no linchpin-backend. */
@Injectable({
  providedIn: 'root'
})
export class InterventionApiService {

  private readonly url = `${environment.apiUrl}/interventions`;

  constructor(private httpClient: HttpClient) {}

  list(filters: { source?: InterventionSource; status?: string; type?: string } = {}): Observable<Intervention[]> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params = params.set(key, value);
    });
    return this.httpClient.get<Intervention[]>(this.url, { params });
  }

  /** Registra a intervenção e a liga ao relatório do chamado. */
  create(source: InterventionSource, reportId: number, form: InterventionForm): Observable<Intervention> {
    return this.httpClient.post<Intervention>(this.url, { ...form, source, reportId });
  }

  update(id: number, form: InterventionForm): Observable<Intervention> {
    return this.httpClient.put<Intervention>(`${this.url}/${id}`, form);
  }
}
