import {ProductDirector} from '../../shared/product-director.model';
import { ProductImage } from 'src/app/shared/product-image.model';

export class Product {
  public id: number;
  public en_title: string;
  public original_title?: string;
  public romanized_original_title: string;
  public runtime: string;
  public poster: string;
  public plot: string;
  public year: string;
  public price: number;
  public directors: ProductDirector[];
  public images: ProductImage[];
  public created_at: string;
  public updated_at: string;

  constructor(id: number, en_title: string, original_title: string, romanized_original_title: string, runtime: string, poster: string,
              plot: string, year: string, price:number, directors: ProductDirector[], images: ProductImage[], created_at: string, updated_at: string) {
    this.id = id;
    this.en_title = en_title;
    this.original_title = original_title;
    this.romanized_original_title = romanized_original_title;
    this.runtime = runtime;
    this.poster = poster;
    this.plot = plot;
    this.year = year;
    this.price = price;
    this.directors = directors;
    this.images = images;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
