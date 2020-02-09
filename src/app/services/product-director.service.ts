import {ProductDirector} from '../shared/product-director.model';
import {Injectable} from '@angular/core';
import {ProductService} from '../components/Products/product.service';
import {Subject} from 'rxjs';
import {Product} from '../components/Products/product.model';

@Injectable()
export class ProductDirectorService {
  directorsChanged = new Subject<ProductDirector[]>();

  private directors: ProductDirector[] = [
    new ProductDirector(
      1,
      this.productService.getProduct(1),
      'Ingmar',
      null,
      'Bergman',
      '3-1-2020',
      '3-1-2020'
    ),
    new ProductDirector(
      2,
      this.productService.getProduct(2),
      'Nicholas',
      null,
      'Ray',
      '3-1-2020',
      '3-1-2020'
    ),
    new ProductDirector(
      3,
      this.productService.getProduct(3),
      'Wong',
      'Kar',
      'Wai',
      '3-1-2020',
      '3-1-2020'
    ),
    new ProductDirector(
      4,
      this.productService.getProduct(4),
      'Mathieu',
      null,
      'Kassovitz',
      '3-1-2020',
      '3-1-2020'
    ),
    new ProductDirector(
      5,
      this.productService.getProduct(5),
      'Jean-Luc',
      null,
      'Godard',
      '3-1-2020',
      '3-1-2020'
    ),
    new ProductDirector(
      6,
      this.productService.getProduct(6),
      'Akira',
      null,
      'Kurosawa',
      '3-1-2020',
      '3-1-2020'
    ),
    new ProductDirector(
      7,
      this.productService.getProduct(7),
      'Joel',
      null,
      'Coen',
      '3-1-2020',
      '3-1-2020'
    ),
    new ProductDirector(
      8,
      this.productService.getProduct(7),
      'Ethan',
      null,
      'Coen',
      '3-1-2020',
      '3-1-2020'
    ),
    new ProductDirector(
      9,
      this.productService.getProduct(8),
      'Joon-ho',
      null,
      'Bong',
      '3-1-2020',
      '3-1-2020'
    )
  ];

  constructor(private productService: ProductService) {
  }

  getDirector(id: number) {
    let ds = [];
    for(let i = 0; i < this.directors.length; i++) {
      if (id == this.directors[i]['productId']['id']) {
        ds.push(this.directors[i]);
      }
    }
    return ds;
  }

  deleteDirector(id: number) {
    for(let i = 0; i < this.directors.length; i++) {
      if (id == this.directors[i]['id']) {
        this.directors.splice(i, 1);
        this.directorsChanged.next(this.directors.slice());
      }
    }
  }

  updateDirector(director: ProductDirector) {
    for (let i = 0; i < this.directors.length; i++) {
      if (director['id'] == this.directors[i]['id']) {
        this.directors[i] = director;
        this.directorsChanged.next(this.directors.slice());
      }
    }
  }

  addDirector(directors: ProductDirector[]) {
    console.log("add director:" + directors);
  }

}
