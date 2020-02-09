import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';
import {GeneralStateService} from '../../../services/general-state.service';

@Component({
  selector: 'app-product-start',
  templateUrl: './product-start.component.html',
  styleUrls: ['./product-start.component.scss']
})
export class ProductStartComponent implements OnInit {
  private readonly MENU_VISIBLE: boolean = true;
  public readonly BACKGROUND_IMAGE: BackgroundImages = 'none';

  constructor(private generalStateService: GeneralStateService) {
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
  }

}
