import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../product/product.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs';
import { Item } from '../../shared/item.model';
import {ProductService} from '../product/product.service';
import {GeneralStateService} from '../../services/general-state.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private readonly MENU_VISIBLE: boolean = true;
  items: Item[];
  private itChangeSub: Subscription;
  public readonly BACKGROUND_IMAGE: BackgroundImages = 'none';

  constructor(private shoppingListService: ShoppingListService, private generalStateService: GeneralStateService) {
    this.setMenuVisibility();
    this.setBackgroundImage();
  }

  ngOnInit() {
    this.items = this.shoppingListService.getProducts();
    this.itChangeSub = this.shoppingListService.itemsChanged.subscribe(
      (items: Item[]) => {
        this.items = items;
      }
    );
  }

  setMenuVisibility(): void {
    this.generalStateService.emitMenuVisibilityEvent(this.MENU_VISIBLE);
  }

  setBackgroundImage(): void {
    this.generalStateService.emitBackgroundImageChangeEvent(this.BACKGROUND_IMAGE);
  }

  ngOnDestroy(): void {
    this.itChangeSub.unsubscribe();
  }

  onEditItem(id: number) {
    this.shoppingListService.startedEditing.next(id);
  }

}
