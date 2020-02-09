import {Product} from '../components/Products/product.model';

export class ProductDirector {
  public id: number;
  public productId: Product;
  public firstName: string;
  public middleName: string;
  public lastName: string;
  public createdAt: string;
  public updatedAt: string;

  constructor(id: number, productId: Product, firstName: string, middleName: string, lastName: string, createdAt: string, updatedAt: string) {
    this.id = id;
    this.productId = productId;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
