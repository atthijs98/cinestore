import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../products/product.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs';
import { Item } from '../shared/item.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  items: Item[];
  private itChangeSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.items = this.shoppingListService.getProducts();
    this.itChangeSub = this.shoppingListService.itemsChanged.subscribe(
      (items: Item[]) => {
        this.items = items;
      }
    );
  }

  ngOnDestroy(): void {
    this.itChangeSub.unsubscribe();
  }

  onEditItem(id: number) {
    this.shoppingListService.startedEditing.next(id);
  }

}
