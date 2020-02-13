import {Product} from '../components/product/product.model';

export class Item {
  constructor(public id: number, public amount: number, public product: Product ) {
  }
}
