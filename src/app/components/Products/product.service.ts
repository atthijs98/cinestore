import { Product } from './product.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Item} from '../../shared/item.model';

@Injectable()
export class ProductService {
  productSelected = new EventEmitter<Product>();
  productsChanged = new Subject<Product[]>();

  private products: Product[] = [
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
    ),
    new Product(
      2,
      'In a Lonely Place',
      null,
      null,
      '94',
      'https://s3.amazonaws.com/criterion-production/films/df93d59f964f578be1c4ed9db26df611/LHDGeFoUAUtHamDnXwv012TKgg62mL_large.jpg',
      'A potentially violent screenwriter is a murder suspect until his lovely neighbor clears him. But she begins to have doubts.',
      '1950',
      8.99,
      true,
      3,
      'f7S8PcTtbOM',
      '31-12-2019',
      '31-12-2019'
    ),
    new Product(
      3,
      'In the Mood for Love',
      'Faa yeung nin wa',
      '花樣年華',
      '98',
      'https://s3.amazonaws.com/criterion-production/films/1b263590b0faeba99ca35b4fc02f7667/mTibr0yzCnoUK8wYtfEOXwKwAwPDUa_large.jpg',
      'Taking place in Hong Kong of 1962, a melancholy story about the love between a woman and a man who live in the same building and one day find out that their husband and wife had an affair with each other.',
      '2000',
      8.99,
      true,
      4,
      'AfZbh4cteqI',
      '31-12-2019',
      '31-12-2019'
    ),
    new Product(
      4,
      'La Haine',
      null,
      null,
      '98',
      'https://s3.amazonaws.com/criterion-production/films/726755430bd298a5aa424f68a792bcea/aQ0KQhoip19olkpwhmNbrAfMY6qhAB_large.jpg',
      'Aimlessly whiling away their days in the concrete environs of their dead-end suburbia, Vinz, Hubert, and Said – a Jew, African, and an Arab – give human faces to France’s immigrant populations, their bristling resentment at their social marginalization slowly simmering until it reaches a climactic boiling point.',
      '1995',
      8.99,
      true,
      4,
      'M2Wl4li8TFo',
      '31-12-2019',
      '31-12-2019'
    ),
    new Product(
      5,
      'Pierrot le Fou',
      null,
      null,
      '110',
      'https://s3.amazonaws.com/criterion-production/films/cd633db777351aee1b7444b7a50cad07/aOUxsNMCS7uo0DkdShLeSHLNL58fXv_large.jpg',
      'Pierrot escapes his boring society and travels from Paris to the Mediterranean Sea with Marianne, a girl chased by hit-men from Algeria. They lead an unorthodox life, always on the run.',
      '1965',
      8.99,
      true,
      6,
      'TVvhJrrgfs0',
      '31-12-2019',
      '31-12-2019'
    ),
    new Product(
      6,
      'Throne of Blood',
      '蜘蛛巣城',
      'Kumonosu-jô',
      '110',
      'https://s3.amazonaws.com/criterion-production/films/98b05e1d3fcf11d6017dc8f992628702/Ik644p20t9hnsvAgVJGckMGPIXVmBG_large.jpg',
      'Returning to their lord’s castle, samurai warriors Washizu and Miki are waylaid by a spirit who predicts their futures. When the first part of the spirit’s prophecy comes true, Washizu’s scheming wife, Asaji, presses him to speed up the rest of the spirit’s prophecy by murdering his lord and usurping his place. Director Akira Kurosawa’s resetting of William Shakespeare’s “Macbeth” in feudal Japan is one of his most acclaimed films.',
      '1957',
      8.99,
      true,
      6,
      'vI60AQTGKSU',
      '31-12-2019',
      '31-12-2019'
    ),
    new Product(
      7,
      'Inside Llewyn Davis',
      null,
      null,
      '104',
      'https://s3.amazonaws.com/criterion-production/films/50601e2e6d31f2758588c3375c856abe/Mij0GgpVEQDG55eQGe1juUCJWRmy9f_large.jpg',
      'The visionary chroniclers of eccentric Americana Joel and Ethan Coen present one of their greatest creations in Llewyn Davis, a singer barely eking out a living on the peripheries of the flourishing Greenwich Village folk scene of the early sixties. As embodied by Oscar Isaac in a revelatory performance, Llewyn (loosely modeled on the Village folk legend Dave Van Ronk) is extraordinarily talented but also irascible, rude, and self-defeating. His circular odyssey through an unforgiving winter cityscape, evocatively captured by cinematographer Bruno Delbonnel, is realized with poignant humor and the occasional surreal touch. Featuring a folk soundtrack curated by T Bone Burnett, Inside Llewyn Davis reminds us that in the Coens’ world, history isn’t necessarily written by the winners.',
      '2013',
      8.99,
      true,
      6,
      'eXMuR-Nsylg',
      '31-12-2019',
      '31-12-2019'
    ),
    new Product(
      8,
      'Memories of Murder',
      '살인의 추억',
      'Salinui chueok',
      '131',
      'https://m.media-amazon.com/images/M/MV5BMzhlNGJhYzUtZTNiMi00MjI0LWFjN2MtOTVlN2IxODVkZWVkXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UY268_CR1,0,182,268_AL_.jpg',
      '1986 Gyunggi Province. The body of a young woman is found brutally raped and murdered. Two months later, a series of rapes and murders commences under similar circumstances. And in a country that had never known such crimes, the dark whispers about a serial murderer grow louder. A special task force is set up in the area, with two local detectives Park Doo-Man and Jo Young-Goo joined by a detective from Seoul who requested to be assigned to the case.',
      '2003',
      8.99,
      true,
      2,
      '-YvWR3Bds0A',
      '08-02-2020',
      '08-02-2020'
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getProducts() {
    return this.products.slice();
  }

  addToShoppingList(product: Product) {
    this.shoppingListService.addProduct(product);
  }
  getProduct(id:number) {
    for(let i = 0; i < this.products.length; i++) {
      if (id == this.products[i]['id']) {
        return this.products[i];
      }
    }
  }

  deleteProduct(id: number) {
    for (let i = 0; i < this.products.length; i++) {
      if (id == this.products[i]['id']) {
        this.products.splice(i, 1);
        this.productsChanged.next(this.products.slice());
      }
    }
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.productsChanged.next(this.products.slice());
  }

  updateProduct(id: number, newProduct: Product) {
    for (let i = 0; i < this.products.length; i++) {
      if (id == this.products[i]['id']) {
        this.products[i] = newProduct;
        this.productsChanged.next(this.products.slice());
      }
    }
  }
}
