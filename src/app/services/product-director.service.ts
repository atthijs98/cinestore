import {ProductDirector} from '../shared/product-director.model';
import {Injectable} from '@angular/core';
import {ProductService} from '../components/product/product.service';
import {Subject} from 'rxjs';
import {Product} from '../components/product/product.model';

@Injectable()
export class ProductDirectorService {
  directorsChanged = new Subject<ProductDirector[]>();

  private directors: ProductDirector[] = [];

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
