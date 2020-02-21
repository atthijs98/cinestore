import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Product} from '../components/product/product.model';
import {environment} from '../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {ProductService} from '../components/product/product.service';
import {Observable, throwError} from 'rxjs';
import Resp from '../interfaces/response.interface';
import {ProductDirector} from '../shared/product-director.model';
import {ProductImage} from '../shared/product-image.model';

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
      this.productService.setProducts(data.result.products);
    });
  }

  storeProduct(productDetails: {en_title: string, original_title: string, romanized_original_title: string, runtime: string, poster: string, plot: string, year: Date, price:number, trailer: string}):void {
    const response: Observable<Resp> = this.http.post<Resp>(`${environment.apiURL}/product`, productDetails)
      .pipe(
        catchError(this.handleHttpError)
      );
    response.subscribe((data) => {
      this.productService.addProduct(data.result.product);
    })

  }

  updateProduct(id: number, productDetails: {id: number, en_title: string, original_title: string, romanized_original_title: string, runtime: string, poster: string, plot: string, year: Date, price:number, trailer: string}):void {
    const response: Observable<Resp> = this.http.post<Resp>(`${environment.apiURL}/product/${id}`, productDetails)
      .pipe(
        catchError(this.handleHttpError)
      );
    response.subscribe((data) => {
      console.log(data.result);
      const id = data.result.product.id;
      this.productService.updateProduct(id, data.result.product);
    })
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

  deleteImage(id: number) {
    const response: Observable<Resp> = this.http.delete<Resp>(`${environment.apiURL}/image/${id}`)
      .pipe(
          catchError(this.handleHttpError)
      );
    response.subscribe((data) => {
      console.log(data.result);
    })
  }

  deleteDirector(id: number) {
    const response: Observable<Resp> = this.http.delete<Resp>(`${environment.apiURL}/director/${id}`)
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
