import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product/product.service';
import {GeneralStateService} from '../../services/general-state.service';
import {JwtService} from '../../services/jwt.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private readonly MENU_VISIBLE: boolean = true;
  public readonly BACKGROUND_IMAGE: BackgroundImages = 'none';


  constructor(private productService: ProductService, private generalStateService: GeneralStateService, private jwtService: JwtService) {
    this.setMenuVisibility();
    this.setBackgroundImage();
  }

  ngOnInit() {
  }

  setMenuVisibility(): void {
    this.generalStateService.emitMenuVisibilityEvent(this.MENU_VISIBLE);
  }
  setBackgroundImage(): void {
    this.generalStateService.emitBackgroundImageChangeEvent(this.BACKGROUND_IMAGE);
  }

}
