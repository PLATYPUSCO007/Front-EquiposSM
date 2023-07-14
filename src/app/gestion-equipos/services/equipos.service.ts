import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipo } from '../interfaces/Equipo';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  private _BASE_URL = environment.baseUrlAPI;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  getEquipos(): Observable<Equipo[]>{
    return this.httpClient.get<Equipo[]>(`${this._BASE_URL}/BD/equipo/`, {withCredentials: true});
  }
}
