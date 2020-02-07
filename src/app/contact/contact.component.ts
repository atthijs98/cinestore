import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      message:  new FormControl('', Validators.required)
    });
  }

  // real-time error messages
  get email() {
    return this.contactForm.get('email');
  }

  onSubmit() {
    const value = this.contactForm.value;
    console.log(value);
  }
}
