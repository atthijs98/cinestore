import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../product.service';
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
    let en_title = '',
        original_title = '',
        romanized_original_title = '',
        runtime = '',
        poster = '',
        plot = '',
        year = '',
        price = 0.00,
        trailer = '',
        directors = new FormArray([]),
        images = new FormArray([]);

    if (this.editMode) {
      const product = this.productService.getProduct(this.id);
      en_title = product.en_title;
      original_title = product.original_title;
      romanized_original_title = product.romanized_original_title;
      runtime = product.runtime;
      poster = product.poster;
      plot = product.plot;
      year = product.year;
      price = product.price;
      trailer = product.trailer;
      for (let director of product.directors) {
        directors.push(
          new FormGroup({
            id: new FormControl(director.id),
            name: new FormControl(director.name)
          })
        )
      }
      for (let image of product.images) {
        images.push(
          new FormGroup({
            id: new FormControl(image.id),
            path: new FormControl(image.path)
          })
        )
      }
    }
    this.productForm = new FormGroup({
      en_title: new FormControl(en_title, [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(1)
      ]),
      original_title: new FormControl(original_title, [
        Validators.minLength(1),
        Validators.maxLength(255)
      ]),
      romanized_original_title: new FormControl(romanized_original_title, [
        Validators.minLength(1),
        Validators.maxLength(255),
      ]),
      runtime: new FormControl(runtime, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(15)
      ]),
      poster: new FormControl(poster, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(255)
      ]),
      plot: new FormControl(plot, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(500)
      ]),
      year: new FormControl(year, [
        Validators.required
      ]),
      price: new FormControl(price, [
        Validators.required,
        Validators.min(0.01),
        Validators.max(999999.99)
      ]),
      trailer: new FormControl(trailer, [
        Validators.required,
        Validators.min(1),
        Validators.max(85)
      ]),
      directors: directors,
      images: images
    });

  }

  onSubmit() {
    if (this.editMode) {
      this.httpService.updateProduct(this.id, this.productForm.value);
      for (let director of this.directorsToBeDeleted) {
          this.httpService.deleteDirector(director);
      }
      for (let image of this.imagesToBeDeleted) {
          this.httpService.deleteImage(image);
      }
    } else {
      console.log("joagf");
      this.httpService.storeProduct(this.productForm.value);
    }
    this.imagesToBeDeleted = [];
    this.directorsToBeDeleted = [];
  }

  onCancel() {
    this.imagesToBeDeleted = [];
    this.directorsToBeDeleted = [];
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
        'path': new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
      })
    )
  }

  onAddDirector() {
    (<FormArray>this.productForm.get('directors')).push(
      new FormGroup({
        'name': new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
      })
    )
  }
}
