import {Product} from '../products/product.model';

export class Item {
  constructor(public id: number, public amount: number, public product: Product ) {
  }
}
