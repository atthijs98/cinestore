import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {GeneralStateService} from '../services/general-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'cinestore';
  menuVisible: boolean = this.generalStateService.getMenuVisibility();
  menuVisibilitySubscriber: EventEmitter<boolean> = this.generalStateService.getMenuVisibilityEvent();
  backgroundImage: BackgroundImages = this.generalStateService.getBackgroundImage();
  backgroundImageSubscriber: EventEmitter<BackgroundImages> = this.generalStateService.getBackgroundImageEvent();


  constructor(private generalStateService: GeneralStateService) {
  }

  ngOnInit(): void {
    this.menuVisibilitySubscriber.subscribe((val: boolean) => {
      this.menuVisible = val;
    });

    this.backgroundImageSubscriber.subscribe((image: BackgroundImages) => {
      this.backgroundImage = image;
    });
  }

  ngOnDestroy(): void {
    this.menuVisibilitySubscriber.unsubscribe();
    this.backgroundImageSubscriber.unsubscribe();
  }
}
