import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../product.service';
import {ProductImageService} from '../../../services/product-image.service';
import {ProductDirectorService} from '../../../services/product-director.service';
import {GeneralStateService} from '../../../services/general-state.service';
import * as M from 'materialize-css';
import {HttpService} from '../../../services/http.service';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, AfterViewInit {
  id: number;
  editMode = false;
  // productForm: FormGroup;
  // imageForm: FormGroup;
  // DirectorForm: FormGroup;
  imagesToBeDeleted = [];
  directorsToBeDeleted = [];
  private readonly MENU_VISIBLE: boolean = true;
  public readonly BACKGROUND_IMAGE: BackgroundImages = 'none';

  public productForm = new FormGroup({
      en_title: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(1)
      ]),
      original_title: new FormControl('', [
        Validators.minLength(1),
        Validators.maxLength(255)
      ]),
      romanized_original_title: new FormControl('', [
        Validators.minLength(1),
        Validators.maxLength(255),
      ]),
      runtime: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(15)
      ]),
      poster: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(255)
      ]),
      plot: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(500)
      ]),
      year: new FormControl('', [
        Validators.required
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.min(0.01),
        Validators.max(999999.99)
      ]),
      productDirector: new FormGroup({

      }),
      productImage: new FormGroup({

      })
    });


  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router,
              private productImageService: ProductImageService,
              private productDirectorService: ProductDirectorService,
              private generalStateService: GeneralStateService,
              private httpService: HttpService) {
    this.setMenuVisibility();
    this.setBackgroundImage();
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        // this.initForm();
      }
    );
  }

  ngAfterViewInit() {
    document.addEventListener('DOMContentLoaded', function() {
      let options = {format: 'yyyy'};
      let elems = document.querySelectorAll('.datepicker');
      let instances = M.Datepicker.init(elems, options);
    });
  }

  setMenuVisibility(): void {
    this.generalStateService.emitMenuVisibilityEvent(this.MENU_VISIBLE);
  }

  setBackgroundImage(): void {
    this.generalStateService.emitBackgroundImageChangeEvent(this.BACKGROUND_IMAGE);
  }

  // get images() {
  //   return (<FormArray>this.productForm.get('images')).controls;
  // }
  //
  // get directors() {
  //   return (<FormArray>this.productForm.get('directors')).controls;
  // }
  //
  // private initForm() {
  //   let productId = Math.floor(Math.random() * 100) + 7,
  //       productEnglishTitle = '',
  //       productOriginalTitle = '',
  //       productRomanizedOriginalTitle = '',
  //       productRuntime = '',
  //       productPoster = '',
  //       productPlot = '',
  //       productYear = '',
  //       productPrice = 0.00,
  //       productInStock = true,
  //       productAmount = 0,
  //       productTrailer = '',
  //       productCreatedAt = String(new Date()),
  //       productUpdatedAt = String(new Date()),
  //       productImages = new FormArray([]),
  //       productDirectors = new FormArray([]);
  //
  //   if (this.editMode) {
  //     const product = this.productService.getProduct(this.id);
  //     const images = this.productImageService.getImagesByProduct(this.id);
  //     const directors = this.productDirectorService.getDirector(this.id);
  //     productId = product.id;
  //     productEnglishTitle = product.en_title;
  //     productOriginalTitle = product.original_title;
  //     productRomanizedOriginalTitle = product.romanized_original_title;
  //     productRuntime = product.runtime;
  //     productPoster = product.poster;
  //     productPlot = product.plot;
  //     productYear = product.year;
  //     productPrice = product.price;
  //     productInStock = product.in_stock;
  //     productAmount = product.amount;
  //     productTrailer = product.trailer;
  //     productCreatedAt = product.created_at;
  //     productUpdatedAt = product.updated_at;
  //     if (directors) {
  //       for (let director of directors) {
  //         productDirectors.push(
  //           new FormGroup({
  //             'id': new FormControl(director.id),
  //             'productId': new FormControl(director.productId),
  //             'firstName': new FormControl(director.firstName, Validators.required),
  //             'middleName': new FormControl(director.middleName),
  //             'lastName': new FormControl(director.lastName, Validators.required),
  //             'createdAt': new FormControl(director.createdAt),
  //             'updatedAt': new FormControl(director.updatedAt),
  //           })
  //         )
  //       }
  //     }
  //     if (images) {
  //      for (let image of images) {
  //        productImages.push(
  //          new FormGroup({
  //            'id': new FormControl(image.id),
  //            'product': new FormControl(image.product),
  //            'name': new FormControl(image.name),
  //            'path': new FormControl(image.path),
  //            'createdAt': new FormControl(image.createdAt),
  //            'updatedAt': new FormControl(image.updatedAt)
  //          })
  //        )
  //      }
  //     }
  //   }
  //
  //   this.productForm = new FormGroup({
  //     'id': new FormControl(productId),
  //     'en_title': new FormControl(productEnglishTitle, Validators.required),
  //     'original_title': new FormControl(productOriginalTitle),
  //     'romanized_original_title': new FormControl(productRomanizedOriginalTitle),
  //     'runtime': new FormControl(productRuntime, Validators.required),
  //     'poster': new FormControl(productPoster, Validators.required),
  //     'plot': new FormControl(productPlot, Validators.required),
  //     'year': new FormControl(productYear, Validators.required),
  //     'price': new FormControl(productPrice, Validators.required),
  //     'in_stock': new FormControl(productInStock),
  //     'amount': new FormControl(productAmount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
  //     'trailer': new FormControl(productTrailer, Validators.required),
  //     'created_at': new FormControl(productCreatedAt),
  //     'updated_at': new FormControl(productUpdatedAt),
  //     'images': productImages,
  //     'directors': productDirectors
  //   });
  //
  // }
  //
  // onSubmit() {
  //   const newProduct = new Product(
  //     this.productForm.value['id'],
  //     this.productForm.value['en_title'],
  //     this.productForm.value['original_title'],
  //     this.productForm.value['romanized_original_title'],
  //     this.productForm.value['runtime'],
  //     this.productForm.value['poster'],
  //     this.productForm.value['plot'],
  //     this.productForm.value['year'],
  //     this.productForm.value['price'],
  //     this.productForm.value['in_stock'],
  //     this.productForm.value['amount'],
  //     this.productForm.value['trailer'],
  //     this.productForm.value['created_at'],
  //     this.productForm.value['updated_at']
  //   );
  //
  //   let newDirector = [];
  //   for (let index = 0; index < this.productForm.value['directors'].length; index++ ) {
  //    newDirector.push(new ProductDirector(
  //       this.productForm.value['directors'][index]['id'],
  //       this.productForm.value['directors'][index]['productId'],
  //       this.productForm.value['directors'][index]['firstName'],
  //       this.productForm.value['directors'][index]['middleName'],
  //       this.productForm.value['directors'][index]['lastName'],
  //       this.productForm.value['directors'][index]['createdAt'],
  //       this.productForm.value['directors'][index]['updatedAt']
  //     ));
  //   }
  //
  //   let newImage = []
  //
  //   for (let jndex = 0; jndex < this.productForm.value['images'].length; jndex++) {
  //     newImage.push(new ProductImage(
  //       this.productForm.value['images'][jndex]['id'],
  //       this.productForm.value['images'][jndex]['product'],
  //       this.productForm.value['images'][jndex]['name'],
  //       this.productForm.value['images'][jndex]['path'],
  //       this.productForm.value['images'][jndex]['createdAt'],
  //       this.productForm.value['images'][jndex]['updatedAt']
  //     ));
  //   }
  //
  //   if (this.editMode) {
  //     if (this.imagesToBeDeleted.length > 0) {
  //       for (let i = 0; i < this.imagesToBeDeleted.length; i++) {
  //         this.productImageService.deleteImage(this.imagesToBeDeleted[i]);
  //       }
  //     }
  //     if (this.directorsToBeDeleted.length > 0) {
  //       for (let j = 0; j < this.directorsToBeDeleted.length; j++) {
  //         this.productDirectorService.deleteDirector(this.directorsToBeDeleted[j]);
  //       }
  //     }
  //
  //     for (let i = 0; i < newImage.length; i++) {
  //       this.productImageService.updateImage(newImage[i]);
  //     }
  //     for (let j = 0; j < newDirector.length; j++) {
  //       this.productDirectorService.updateDirector(newDirector[j]);
  //     }
  //     this.productService.updateProduct(this.id, newProduct);
  //   } else {
  //     this.productService.addProduct(newProduct);
  //   }
  //   this.imagesToBeDeleted = [];
  //   this.directorsToBeDeleted = [];
  //   this.onCancel();
  // }
  //
  // onCancel() {
  //   this.router.navigate(['../'], {relativeTo: this.route})
  // }
  //
  // onDeleteImage(index: number, id: number) {
  //   this.imagesToBeDeleted.push(id);
  //   (<FormArray>this.productForm.get('images')).removeAt(index);
  // }
  //
  // onDeleteDirector(index: number, id: number) {
  //   this.directorsToBeDeleted.push(id);
  //   (<FormArray>this.productForm.get('directors')).removeAt(index);
  // }
  //
  // onAddImage() {
  //   (<FormArray>this.productForm.get('images')).push(
  //     new FormGroup({
  //       'id': new FormControl(Math.floor(Math.random() * 1000) + 7),
  //       'product': new FormControl(this.productService.getProduct(this.id)),
  //       'name': new FormControl('', Validators.required),
  //       'path': new FormControl('', Validators.required),
  //       'createdAt': new FormControl(''),
  //       'updatedAt': new FormControl('')
  //     })
  //   )
  // }
  //
  // onAddDirector() {
  //   (<FormArray>this.productForm.get('directors')).push(
  //     new FormGroup({
  //       'id': new FormControl(Math.floor(Math.random() * 1000) + 7),
  //       'productId': new FormControl(this.productService.getProduct(this.id)),
  //       'firstName': new FormControl('', Validators.required),
  //       'middleName': new FormControl(''),
  //       'lastName': new FormControl('', Validators.required),
  //       'createdAt': new FormControl(''),
  //       'updatedAt': new FormControl('')
  //     })
  //   )
  // }

  onSubmit() {
    this.httpService.storeProduct(this.productForm.value);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onDeleteImage(index: number, id: number) {
    this.imagesToBeDeleted.push(id);
    (<FormArray>this.productForm.get('images')).removeAt(index);
  }

  onDeleteDirector(index: number, id: number) {
    this.directorsToBeDeleted.push(id);
    (<FormArray>this.productForm.get('directors')).removeAt(index);
  }

  onAddImage() {
    (<FormArray>this.productForm.get('images')).push(
      new FormGroup({
        'id': new FormControl(Math.floor(Math.random() * 1000) + 7),
        'product': new FormControl(this.productService.getProduct(this.id)),
        'name': new FormControl('', Validators.required),
        'path': new FormControl('', Validators.required),
        'createdAt': new FormControl(''),
        'updatedAt': new FormControl('')
      })
    )
  }

  onAddDirector() {
    (<FormArray>this.productForm.get('directors')).push(
      new FormGroup({
        'id': new FormControl(Math.floor(Math.random() * 1000) + 7),
        'productId': new FormControl(this.productService.getProduct(this.id)),
        'firstName': new FormControl('', Validators.required),
        'middleName': new FormControl(''),
        'lastName': new FormControl('', Validators.required),
        'createdAt': new FormControl(''),
        'updatedAt': new FormControl('')
      })
    )
  }
}
