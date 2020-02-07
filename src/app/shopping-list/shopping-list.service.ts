import {EventEmitter, Injectable} from '@angular/core';
import {Product} from '../products/product.model';
import {Subject} from 'rxjs';
import {Item} from '../shared/item.model';



export class ShoppingListService {
  itemsChanged = new Subject<Item[]>();
  startedEditing = new Subject<number>();

  private items: Item[] = [
    new Item(
      1,
      1,
      new Product(
        1,
        'Persona',
        null,
        null,
        '85',
        'https://s3.amazonaws.com/criterion-production/films/d5c135c95f58e74e2ee28cb92659bafd/DoD5SlisIFjKyi0zucupnwj2B3ADGy_large.jpg',
        'A young nurse, Alma, is put in charge of Elisabeth Vogler: an actress who is seemingly healthy in all respects, but will not talk. As they spend time together, Alma speaks to Elisabeth constantly, never receiving any answer. Alma eventually confesses her secrets to a seemingly sympathetic Elisabeth and finds that her own personality is being submerged into Elisabeth’s persona.',
        '1966',
        8.99,
        true,
        2,
        '37g9h8cROsM',
        '31-12-2019',
        '31-12-2019'
      )
    )
  ];


  getProducts() {
    return this.items.slice();
  }

  getProduct(id: number) {
    for (let i = 0; i < this.items.length; i++) {
      if (id == this.items[i]['id']) {
        return this.items[i];
      }
    }
  }

  addProduct(product: Product) {
    const newItem = new Item(Math.floor(Math.random() * 1000), 1, product)
    this.items.push(newItem);
    this.itemsChanged.next(this.items.slice());
  }

  // addProducts(products: Product[]) {
  //   this.products.push(...products);
  //   this.productsChanged.next(this.products.slice());
  // }

  deleteProduct(id: number) {
    for (let i = 0; i < this.items.length; i++) {
      if (id == this.items[i]['id']) {
        this.items.splice(i, 1);
        this.itemsChanged.next(this.items.slice());
      }
    }
  }

  updateProduct(id: number, newItem: Item) {
    for (let i = 0; i < this.items.length; i++) {
      if (id == this.items[i]['id']) {
        this.items[i] = newItem;
        this.itemsChanged.next(this.items.slice());
      }
    }
  }
}
