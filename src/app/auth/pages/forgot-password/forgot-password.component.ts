import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';

@Component({
  selector: 'fury-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations:[fadeInUpAnimation]
})
export class ForgotPasswordComponent {

  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  form:FormGroup = this.fb.group({
    correo: [, [Validators.required,Validators.pattern(this.emailPattern)]],
  });

  constructor(private router: Router,
              private fb: FormBuilder) { }


}
