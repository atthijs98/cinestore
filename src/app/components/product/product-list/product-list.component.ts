import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../product.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {GeneralStateService} from '../../../services/general-state.service';
import {HttpService} from '../../../services/http.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  private readonly MENU_VISIBLE: boolean = true;
  public readonly BACKGROUND_IMAGE: BackgroundImages = 'none';

  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute,
              private generalStateService: GeneralStateService,
              private httpService: HttpService) {
    this.setMenuVisibility();
    this.setBackgroundImage();
    this.httpService.fetchProducts();
  }

  setMenuVisibility(): void {
    this.generalStateService.emitMenuVisibilityEvent(this.MENU_VISIBLE);
  }
  setBackgroundImage(): void {
    this.generalStateService.emitBackgroundImageChangeEvent(this.BACKGROUND_IMAGE);
  }

  ngOnInit() {
    this.subscription = this.productService.productsChanged.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
    this.products = this.productService.getProducts();
  }

  onNewProduct() {
    this.router.navigate(['new'], { relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
