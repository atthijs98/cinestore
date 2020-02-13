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

  /**
   *
   * @param error
   * @returns {Resp} Observable
   */
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

  /**
   *
   * @returns {boolean}
   */
  isAuthenticated(): boolean {
    if (this.localStorageService.get('jwt')) {
      return true;
    }
  }

  /**
   *
   * @returns
   */
  parseJWT(): {email: string, iat: number, id: string, name: string} {
    const token = this.localStorageService.get('jwt');
    console.log(token);

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/g/, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }

  /**
   *
   * @param loginDetails
   */
  login(loginDetails: {email: string, password: string}): void {
    const response: Observable<Resp> = this.http.post<Resp>(`${environment.apiURL}/login`, loginDetails)
      .pipe(
        catchError(this.handleHttpError)
      );
    response.subscribe((data) => {
      console.log(data.result);
      this.localStorageService.set('jwt', data.result);
      // redirect to user page
      //this.parseJWT();
      this.router.navigate(['/product']);
    });
  }

  logout() {
    this.localStorageService.set('jwt', null);
    this.router.navigate(['/']);
  }

  /**
   *
   * @param singupDetails
   */
  signup(singupDetails: {name: string, email: string, password: string, userRole: string}): void {
    console.log(singupDetails);
    const response: Observable<Resp> = this.http.post<Resp>(`${environment.apiURL}/signup`, singupDetails)
      .pipe(
          catchError(this.handleHttpError)
      );

    response.subscribe((data) => {
      this.localStorageService.set('jwt', data.result.token);
      this.router.navigate(['/login']);
    });
  }
}
