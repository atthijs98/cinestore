import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../product.model';
import {ProductService} from '../../product.service';
import {GeneralStateService} from '../../../../services/general-state.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  @Input() id: number;
  private readonly MENU_VISIBLE: boolean = true;
  public readonly BACKGROUND_IMAGE: BackgroundImages = 'none';

  constructor(private generalStateService: GeneralStateService) {
    this.setMenuVisibility();
    this.setBackgroundImage();
  }
  setBackgroundImage(): void {
    this.generalStateService.emitBackgroundImageChangeEvent(this.BACKGROUND_IMAGE);
  }

  setMenuVisibility(): void {
    this.generalStateService.emitMenuVisibilityEvent(this.MENU_VISIBLE);
  }

  ngOnInit() {
  }


}
