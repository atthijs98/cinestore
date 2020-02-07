import { Component, OnInit } from '@angular/core';
import {ProductService} from './product.service';
import {Product} from './product.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductImageService} from '../shared/product-image.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductImageService]
})
export class ProductsComponent implements OnInit {
  selectedProduct: Product;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.productSelected.subscribe(
      (product: Product) => {
        this.selectedProduct = product;
      }
    );
  }

}
