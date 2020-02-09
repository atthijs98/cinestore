import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {JwtService} from '../../services/jwt.service';
import {GeneralStateService} from '../../services/general-state.service';
import {Router} from '@angular/router';
import RouteInterface from '../../interfaces/route.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, RouteInterface {
  public readonly MENU_VISIBLE: boolean = false;
  public readonly BACKGROUND_IMAGE: BackgroundImages = 'her.jpg';

  public userForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(255)
    ])
  });

  constructor(
    private jwtService: JwtService,
    private router: Router,
    private generalStateService: GeneralStateService
  ) {
    if (this.jwtService.isAuthenticated()) {
      this.router.navigate(['/me/start']);
    }
    this.setMenuVisibility();
    this.setBackgroundImage();
  }

  ngOnInit() {

  }

  // real-time error messages
  get email() {
    return this.userForm.get('email');
  }

  onSubmit(): void {
    this.jwtService.login(this.userForm.value);
  }

  setMenuVisibility(): void {
    this.generalStateService.emitMenuVisibilityEvent(this.MENU_VISIBLE);
  }

  setBackgroundImage(): void {
    this.generalStateService.emitBackgroundImageChangeEvent(this.BACKGROUND_IMAGE);
  }
}
