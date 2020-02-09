import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ShoppingListService} from '../shopping-list.service';
import {Product} from '../../Products/product.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Item} from '../../../shared/item.model';
import {ProductService} from '../../Products/product.service';
import {GeneralStateService} from '../../../services/general-state.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm;
  subscription: Subscription;
  editedItemId: number;
  editedItem: Item;
  productItem: Product;
  private readonly MENU_VISIBLE: boolean = true;
  public readonly BACKGROUND_IMAGE: BackgroundImages = 'none';

  constructor(private shoppingListService: ShoppingListService, private generalStateService: GeneralStateService) {
    this.setMenuVisibility();
    this.setBackgroundImage();
  }

  setMenuVisibility(): void {
    this.generalStateService.emitMenuVisibilityEvent(this.MENU_VISIBLE);
  }

  setBackgroundImage(): void {
    this.generalStateService.emitBackgroundImageChangeEvent(this.BACKGROUND_IMAGE);
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (id: number) => {
        this.editedItemId = id;
        this.editedItem = this.shoppingListService.getProduct(id);
        this.productItem = this.editedItem.product;
        this.slForm.setValue({
          name: this.productItem.en_title,
          amount: this.editedItem.amount
        })
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    const newItem = new Item(this.editedItemId, value.amount, this.productItem)
    this.shoppingListService.updateProduct(this.editedItemId, newItem);
    form.reset();
  }

  onClear() {
    this.slForm.reset();
  }

  onDelete() {
    this.shoppingListService.deleteProduct(this.editedItemId);
    this.onClear();
  }
}
