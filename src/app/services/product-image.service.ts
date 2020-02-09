import {Injectable} from '@angular/core';
import {ProductService} from '../components/Products/product.service';
import {ProductImage} from '../shared/product-image.model';
import {Subject} from 'rxjs';

@Injectable()
export class ProductImageService {
  imagesChanged = new Subject<ProductImage[]>();

  private images: ProductImage[] = [
    new ProductImage(
      1,
      this.productService.getProduct(1),
      'Persona',
      'https://s3.amazonaws.com/criterion-production/carousel-files/4d0bb0bd3dbd6ce440b5409f01d8fb88.jpeg',
      '3-1-2020',
      '3-1-2020'
    ),
    new ProductImage(
      2,
      this.productService.getProduct(1),
      'Persona',
      'https://s3.amazonaws.com/criterion-production/carousel-files/959babf22cf13c81cb2032b2d157c857.jpeg',
      '3-1-2020',
      '3-1-2020'
    ),
    new ProductImage(
      3,
      this.productService.getProduct(2),
      'In a Lonely Place',
      'https://s3.amazonaws.com/criterion-production/carousel-files/b25a29d213baf81135edf300015bd671.jpeg',
      '3-1-2020',
      '3-1-2020'
    ),
    new ProductImage(
      4,
      this.productService.getProduct(2),
      'In a Lonely Place',
      'https://s3.amazonaws.com/criterion-production/carousel-files/e7e84e9f1786861d5b30cb1e09a07347.jpeg',
      '3-1-2020',
      '3-1-2020'
    ),
    new ProductImage(
      5,
      this.productService.getProduct(3),
      'In the mood For Love',
      'https://s3.amazonaws.com/criterion-production/carousel-files/4ac0f702b5665ef521058958ae3add93.jpeg',
      '3-1-2020',
      '3-1-2020'
    ),
    new ProductImage(
      6,
      this.productService.getProduct(3),
      'In the mood For Love',
      'https://s3.amazonaws.com/criterion-production/carousel-files/eaa6434f7720adef12b1acd008c9c2fa.jpeg',
      '3-1-2020',
      '3-1-2020'
    ),
    new ProductImage(
      7,
      this.productService.getProduct(4),
      'La Haine',
      'https://criterion-production.s3.amazonaws.com/carousel-files/3c11fb27babb97eccbba11d044933ac0.jpeg',
      '3-1-2020',
      '3-1-2020'
    ),
    new ProductImage(
      8,
      this.productService.getProduct(4),
      'La Haine',
      'https://criterion-production.s3.amazonaws.com/carousel-files/02d56dff1738ee67881a6f15c4a086c0.jpeg',
      '3-1-2020',
      '3-1-2020'
    ),
    new ProductImage(
      9,
      this.productService.getProduct(5),
      'Pierrot le Fou',
      'https://criterion-production.s3.amazonaws.com/carousel-files/230f279a15bb02088196cbd07463c5c1.jpeg',
      '3-1-2020',
      '3-1-2020'
    ),
    new ProductImage(
      10,
      this.productService.getProduct(5),
      'Pierrot le Fou',
      'https://criterion-production.s3.amazonaws.com/carousel-files/2042a23aa08e99e3ca4d5d1511daa3ca.jpeg',
      '3-1-2020',
      '3-1-2020'
    ),
    new ProductImage(
      11,
      this.productService.getProduct(6),
      'Throne of Blood',
      'https://s3.amazonaws.com/criterion-production/carousel-files/491f44a130ee767664fe9f549ee668d6.jpeg',
      '3-1-2020',
      '3-1-2020'
    ),
    new ProductImage(
      12,
      this.productService.getProduct(6),
      'Throne of Blood',
      'https://s3.amazonaws.com/criterion-production/carousel-files/b699ce2b43d8e4c31a1b3fd87afd2663.jpeg',
      '3-1-2020',
      '3-1-2020'
    ),
    new ProductImage(
      13,
      this.productService.getProduct(7),
      'Inside Llewyn Davis',
      'https://s3.amazonaws.com/criterion-production/carousel-files/ba8135f9ca6bfb39fd294180b52cc336.jpeg',
      '3-1-2020',
      '3-1-2020'
    ),
    new ProductImage(
      14,
      this.productService.getProduct(3),
      'In the mood for love',
      'https://s3.amazonaws.com/criterion-production/carousel-files/be0f53ecf0de3e4d3e92baf0ac0a0255.jpeg',
      '5-1-2020',
      '5-1-2020'
    ),
    new ProductImage(
      15,
      this.productService.getProduct(4),
      'la haine',
      'https://criterion-production.s3.amazonaws.com/carousel-files/e0ea11faed5ead5990ab7e4307c918c6.jpeg',
      '5-1-2020',
      '5-1-2020'
    )
  ];

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
