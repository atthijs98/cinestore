import {Product} from '../components/Products/product.model';

export class ProductImage {
  public id: number;
  public product: Product;
  public name: string;
  public path: string;
  public createdAt: string;
  public updatedAt: string;

  constructor(id:number, product: Product, name: string, path: string, createdAt: string, updatedAt: string) {
    this.id = id;
    this.product = product;
    this.name = name;
    this.path = path;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
