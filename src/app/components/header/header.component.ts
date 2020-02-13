import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as M from 'materialize-css';
import {JwtService} from '../../services/jwt.service';
import {LocalStorageService} from '../../services/local-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit, OnInit {
  // user = this.jwtService.parseJWT();

  constructor(private jwtService: JwtService, private localStorageService: LocalStorageService) {
  }

  logout(): void {
    this.jwtService.logout();
  }

  ngOnInit(): void {
    console.log(this.localStorageService);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      let elem = document.querySelector('.sidenav'),
          instance = M.Sidenav.init(elem);
    }, 0);
  }
}
