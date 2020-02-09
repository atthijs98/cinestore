import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralStateService {
  private menuVisibilityEvent: EventEmitter<boolean> = new EventEmitter()
  private backgroundImageEvent: EventEmitter<BackgroundImages> = new EventEmitter();
  private _isMenuVisible: boolean = true;
  private backgroundImage: BackgroundImages = 'none';

  public getMenuVisibility(): boolean {
    return this._isMenuVisible;
  }

  public getMenuVisibilityEvent(): EventEmitter<boolean> {
    return this.menuVisibilityEvent;
  }

  public emitMenuVisibilityEvent(val: boolean) {
    this._isMenuVisible = val;
    this.menuVisibilityEvent.emit(val);
  }

  public getBackgroundImage(): BackgroundImages {
    return this.backgroundImage;
  }

  public getBackgroundImageEvent(): EventEmitter<BackgroundImages> {
    return this.backgroundImageEvent;
  }

  public emitBackgroundImageChangeEvent(image: BackgroundImages): void {
    this.backgroundImage = image;
    this.backgroundImageEvent.emit(image);
  }
}
