import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, NgForm, FormGroupDirective} from '@angular/forms';
import {JwtService} from '../../services/jwt.service';
import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material';
import {GeneralStateService} from '../../services/general-state.service';
import RouteInterface from '../../interfaces/route.interface';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, RouteInterface {
  public readonly MENU_VISIBLE: boolean = false;
  public readonly BACKGROUND_IMAGE: BackgroundImages = 'under-the-skin.jpg';

  matcher = new MyErrorStateMatcher();

  public userForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),
      Validators.maxLength(255)
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(255)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(255)
    ]),
    passwordRepeat: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(255)
    ])
  }, {validators: this.checkPasswords });

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

  // real-time error messages
  get email() {
    return this.userForm.get('email');
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('passwordRepeat').value;

    return pass === confirmPass ? null : { notSame: true }
  }

  onSubmit(): void {
    let values = this.userForm.value;
    delete values.passwordRepeat;
    this.jwtService.signup(this.userForm.value);
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
