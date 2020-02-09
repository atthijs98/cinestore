import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {LocalStorageService} from './local-storage.service';
import Resp from '../interfaces/response.interface';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  public redirectURL: string;

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService,
              private router: Router) {
  }

  handleHttpError(error: HttpErrorResponse): Observable<Resp> {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred: ', error.error.message);
    } else {
      console.error(
        `backend returned code ${error.error.status}, ` +
        `body was: ${error.error.message}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.'
    );

  }

  isAuthenticated(): boolean {
    if (this.localStorageService.get('jwt')) {
      return true;
    }
  }

  parseJWT(): {email: string, iat: number, id: string, name: string} {
    const token = this.localStorageService.get('jwt');

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/g/, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }

  login(loginDetails: {email: string, password: string}): void {
    const response: Observable<Resp> = this.http.post<Resp>(`${environment.apiURL}/login`, loginDetails)
      .pipe(
        catchError(this.handleHttpError)
      );
    response.subscribe((data) => {
      this.localStorageService.set('jwt', data.result.token);
      // redirect to user page
      this.router.navigate(['/me/start']);
    });
  }

  logout() {
    this.localStorageService.set('jwt', null);
    this.router.navigate(['/']);
  }

  signup(singupDetails: {name: string, email: string, password: string}): void {
    const response: Observable<Resp> = this.http.post<Resp>(`${environment.apiURL}/signup`, singupDetails)
      .pipe(
          catchError(this.handleHttpError)
      );

    response.subscribe((data) => {
      this.localStorageService.set('jwt', data.result.token);
      // redirect to user page
      this.router.navigate(['/me/start']);
    });
  }
}
