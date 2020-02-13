import { Component, OnInit } from '@angular/core';
import {ProductService} from './product.service';
import {Product} from './product.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductImageService} from '../../services/product-image.service';
import {GeneralStateService} from '../../services/general-state.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductImageService]
})
export class ProductsComponent implements OnInit {
  private readonly MENU_VISIBLE: boolean = true;
  public readonly BACKGROUND_IMAGE: BackgroundImages = 'none';
  selectedProduct: Product;
  constructor(private productService: ProductService, private generalStateService: GeneralStateService) {
    this.setMenuVisibility();
    this.setBackgroundImage();
  }

  ngOnInit() {
    this.productService.productSelected.subscribe(
      (product: Product) => {
        this.selectedProduct = product;
      }
    );
  }

  setMenuVisibility(): void {
    this.generalStateService.emitMenuVisibilityEvent(this.MENU_VISIBLE);
  }
  setBackgroundImage(): void {
    this.generalStateService.emitBackgroundImageChangeEvent(this.BACKGROUND_IMAGE);
  }
}
