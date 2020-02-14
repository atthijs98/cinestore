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
  productForm: FormGroup;
  imagesToBeDeleted = [];
  directorsToBeDeleted = [];
  private readonly MENU_VISIBLE: boolean = true;
  public readonly BACKGROUND_IMAGE: BackgroundImages = 'none';

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
        this.initForm();
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

  private initForm() {
    this.productForm = new FormGroup({
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
      productDirector: new FormArray([]),
      productImage: new FormArray([])
    });
  }

  onSubmit() {
    this.httpService.storeProduct(this.productForm.value);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  get images() {
    return (<FormArray>this.productForm.get('images')).controls;
  }

  get directors() {
    return (<FormArray>this.productForm.get('directors')).controls;
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
        'name': new FormControl('', Validators.required),
        'createdAt': new FormControl(''),
        'updatedAt': new FormControl('')
      })
    )
  }
}
