import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Product} from '../components/product/product.model';
import {environment} from '../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {ProductService} from '../components/product/product.service';
import {Observable, throwError} from 'rxjs';
import Resp from '../interfaces/response.interface';

@Injectable({providedIn: 'root'})
export class HttpService {

  constructor(private http: HttpClient,
              private productService: ProductService) {
  }

  fetchProducts() {
    const response: Observable<Resp> = this.http.get<Resp>(`${environment.apiURL}/product`)
      .pipe(
        catchError(this.handleHttpError)
      );
    response.subscribe((data) => {
      console.log(data.result.products);
      this.productService.setProducts(data.result.products);
    });
  }

  storeProduct(productDetails: {en_title: string, original_title: string, romanized_original_title: string, runtime: string, poster: string, plot: string, year: Date, price:number}):void {
    const response: Observable<Resp> = this.http.post<Resp>(`${environment.apiURL}/product`, productDetails)
      .pipe(
        catchError(this.handleHttpError)
      );
    response.subscribe((data) => {
      this.productService.addProduct(data.result.product);
    })

  }

  updateProduct(id: number, product: any) {
    this.http
      .post(`${environment.apiURL}/product/${id}`, JSON.stringify(product)).subscribe(response => {
        return response;
      },
      catchError(this.handleHttpError));
  }

  deleteProduct(id: number) {
    const response: Observable<Resp> = this.http.delete<Resp>(`${environment.apiURL}/product/ ${id}`)
      .pipe(
        catchError(this.handleHttpError)
      );

    response.subscribe((data) => {
      console.log(data);
    })
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

}
