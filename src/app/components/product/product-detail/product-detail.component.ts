import {AfterContentInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../product.model';
import {ProductService} from '../product.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import * as M from 'materialize-css';
import {Subscription} from 'rxjs';
import {GeneralStateService} from '../../../services/general-state.service';
import {HttpService} from '../../../services/http.service';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, AfterContentInit, OnDestroy {
  product: Product;
  id: number;
  options: { fullWidth: true };
  // @ts-ignore
  initialized = true;
  mobile = false;
  private readonly MENU_VISIBLE: boolean = true;
  public readonly BACKGROUND_IMAGE: BackgroundImages = 'none';

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private generalStateService: GeneralStateService,
              private httpService: HttpService, private sanitizer: DomSanitizer) {
    this.setMenuVisibility();
    this.setBackgroundImage();

  }

  toShoppingList() {
    this.productService.addToShoppingList(this.product);
  }

  setMenuVisibility(): void {
    this.generalStateService.emitMenuVisibilityEvent(this.MENU_VISIBLE);
  }

  setBackgroundImage(): void {
    this.generalStateService.emitBackgroundImageChangeEvent(this.BACKGROUND_IMAGE);
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.product = this.productService.getProduct(this.id);
        this.initialized = false;
      }
    );
    if (window.screen.width <= 480) {
      this.mobile = true;
    }
  }

  ngOnDestroy(): void {
  }

  ngAfterContentInit(): void {
    setTimeout(function() {
      let elems = document.querySelectorAll('.dropdown-trigger'),
        instance = M.Dropdown.init(elems);

      let elems2 = document.querySelectorAll('.modal'),
          instances = M.Modal.init(elems2);
    }, 0);
  }

  // @ts-ignore
  initCarousel() {
    //setTimeout(function() {
      let element = document.querySelectorAll('.carousel');
      let instance = M.Carousel.init(element, this.options);
      this.initialized = true;
    // }, 0);
  }


  onEditProduct() {
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }


  onDeleteProduct(id: number) {
    this.httpService.deleteProduct(id);
    this.productService.deleteProduct(id);
    this.router.navigate(['/product']);
  }
}
