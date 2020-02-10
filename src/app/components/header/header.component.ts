import {AfterViewInit, Component} from '@angular/core';
import * as M from 'materialize-css';
import {JwtService} from '../../services/jwt.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  // user = this.jwtService.parseJWT();

  constructor(private jwtService: JwtService) {
  }

  logout(): void {
    this.jwtService.logout();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      let elem = document.querySelector('.sidenav'),
          instance = M.Sidenav.init(elem);
    }, 0);
  }
}
