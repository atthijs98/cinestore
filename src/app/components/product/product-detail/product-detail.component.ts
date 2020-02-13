import {AfterContentInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../product.model';
import {ProductService} from '../product.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProductDirector} from '../../../shared/product-director.model';
import {ProductDirectorService} from '../../../services/product-director.service';
import {ProductImage} from '../../../shared/product-image.model';
import {ProductImageService} from '../../../services/product-image.service';
import * as M from 'materialize-css';
import {Subscription} from 'rxjs';
import {GeneralStateService} from '../../../services/general-state.service';
import {HttpService} from '../../../services/http.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, AfterContentInit, OnDestroy {
  product: Product;
  directors: ProductDirector[];
  images: ProductImage[];
  id: number;
  options: { fullWidth: true };
  // @ts-ignore
  initialized = true;
  mobile = false;
  imagesObserver: Subscription;
  directorsObserver: Subscription;
  private readonly MENU_VISIBLE: boolean = true;
  public readonly BACKGROUND_IMAGE: BackgroundImages = 'none';

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private directorService: ProductDirectorService,
              private imageService: ProductImageService,
              private generalStateService: GeneralStateService,
              private httpService: HttpService) {
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
        this.directors = this.directorService.getDirector(this.id);
        this.images = this.imageService.getImagesByProduct(this.id);
        this.initialized = false;
      }
    );
   this.imagesObserver = this.imageService.imagesChanged.subscribe(
      (image: ProductImage[]) => {
        this.images = this.imageService.getImagesByProduct(this.id);
      }
    );
    this.directorsObserver = this.directorService.directorsChanged.subscribe(
      (director: ProductDirector[]) => {
        this.directors = this.directorService.getDirector(this.id);
      }
    );
    if (window.screen.width <= 480) {
      this.mobile = true;
    }
  }

  ngOnDestroy(): void {
    this.imagesObserver.unsubscribe();
    this.directorsObserver.unsubscribe();
  }

  ngAfterContentInit(): void {
    setTimeout(function() {
      let elems = document.querySelectorAll('.dropdown-trigger'),
        instance = M.Dropdown.init(elems);
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
