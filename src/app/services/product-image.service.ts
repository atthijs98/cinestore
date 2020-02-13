import {Injectable} from '@angular/core';
import {ProductService} from '../components/product/product.service';
import {ProductImage} from '../shared/product-image.model';
import {Subject} from 'rxjs';

@Injectable()
export class ProductImageService {
  imagesChanged = new Subject<ProductImage[]>();

  private images: ProductImage[] = [];

  constructor(private productService: ProductService) {
  }

  getImagesByProduct(id: number) {
    let img = [];
    for(let i = 0; i < this.images.length; i++) {
      if (id == this.images[i]['product']['id']) {
        img.push(this.images[i]);
      }
    }
    return img;
  }

  deleteImage(id: number) {
    for(let i = 0; i < this.images.length; i++) {
      if (id == this.images[i]['id']) {
        this.images.splice(i, 1);
        this.imagesChanged.next(this.images.slice());
      }
    }
  }

  addImage(image: ProductImage) {

  }

  updateImage(image: ProductImage) {
    for (let i = 0; i < this.images.length; i++) {
      if (image['id'] == this.images[i]['id']) {
        this.images[i] = image;
        this.imagesChanged.next(this.images.slice());
      }
    }
  }
}
