import {Product} from '../components/product/product.model';

export class ProductDirector {
  public id: number;
  public productId: Product;
  public name: string;
  public createdAt: string;
  public updatedAt: string;

  constructor(id: number, productId: Product, name: string, createdAt: string, updatedAt: string) {
    this.id = id;
    this.productId = productId;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
