import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralStateService {
  private menuVisibilityEvent: EventEmitter<boolean> = new EventEmitter()
  private backgroundImageEvent: EventEmitter<BackgroundImages> = new EventEmitter();
  private _isMenuVisible: boolean = true;
  private backgroundImage: BackgroundImages = 'none';

  /**
   *
   * @returns {boolean} _isMenuVisible
   */
  public getMenuVisibility(): boolean {
    return this._isMenuVisible;
  }

  /**
   *
   * @returns {EventEmitter<boolean>} menuVisibilityEvent
   */
  public getMenuVisibilityEvent(): EventEmitter<boolean> {
    return this.menuVisibilityEvent;
  }

  /**
   *
   * @param {boolean} val
   */
  public emitMenuVisibilityEvent(val: boolean) {
    this._isMenuVisible = val;
    this.menuVisibilityEvent.emit(val);
  }

  /**
   *
   * @returns {Type: BackgroundImage(String)} backgroundImage
   */
  public getBackgroundImage(): BackgroundImages {
    return this.backgroundImage;
  }

  /**
   * @returns {EventEmitter<BackgroundImages>} backgroundImageEvent
   */
  public getBackgroundImageEvent(): EventEmitter<BackgroundImages> {
    return this.backgroundImageEvent;
  }

  /**
   *
   * @param {Type: BackgroundImages (String)} image
   */
  public emitBackgroundImageChangeEvent(image: BackgroundImages): void {
    this.backgroundImage = image;
    this.backgroundImageEvent.emit(image);
  }
}
