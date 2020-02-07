import {AfterViewInit, Component} from '@angular/core';
import * as M from 'materialize-css';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit{
  ngAfterViewInit(): void {
    setTimeout(() => {
      let elem = document.querySelector('.sidenav'),
          instance = M.Sidenav.init(elem);
    }, 0);
  }
}
