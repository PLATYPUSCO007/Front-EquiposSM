import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

import { CookieService } from 'ngx-cookie-service';

import { environment } from "../../../environments/environment";
import { User, UserLog } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _BASE_URL_API: string = environment.baseUrlAPI;
  private _USER_KEY: string = environment.USER_KEY;
  private _auth: string = '';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) { }

  get auth(): string{
    return !this._auth ? window.sessionStorage.getItem(this._USER_KEY)! : this._auth;
  }

  logIn(userLog: UserLog): Observable<User>{

    return this.http.post<User>(`${this._BASE_URL_API}/Auth`, userLog, this.httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse)=>{
          if (error.status == 400) {
            return throwError(`Error del usuario - ${error.message}`);
          }else{
            return throwError(`Error desconocido - ${error.message}`);
          }
        }),
        tap(auth=>{
            console.log('AUTH RESPONSE -->' , auth);
            // this.cookieService.set('registro_equipos', auth.token);
            this._auth = auth.user;
          }
        ),
        tap(auth=>{
            window.sessionStorage.removeItem(this._USER_KEY);
            window.sessionStorage.setItem(this._USER_KEY, this._auth );
          }
        )
        )
  }

  logOut(){
    return this.http.post(`${this._BASE_URL_API}/Auth/logout`, {})
      .pipe(
        tap(auth=>{
          this._auth = '';
        }
        ),
        tap(auth=>{
          window.sessionStorage.clear();
          this.cookieService.deleteAll();
        })
      )
  }

  isLoguinUser():  Observable<boolean>{
    return of(this.cookieService.check('control_equipos'));
  }
}
