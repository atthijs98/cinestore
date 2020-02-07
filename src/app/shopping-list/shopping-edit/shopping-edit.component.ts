import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ShoppingListService} from '../shopping-list.service';
import {Product} from '../../products/product.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Item} from '../../shared/item.model';

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

  constructor(private shoppingListService: ShoppingListService) { }

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
