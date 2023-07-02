import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'fury-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInUpAnimation]
})
export class LoginComponent {

  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  form:FormGroup = this.fb.group({
    correo: ['', [Validators.required,Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(45)]],
  });
  inputType = 'password';
  visible = false;

  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              private authService: AuthService) { }

  send() {
    const { correo, password } = this.form.value;
    this.authService.login(correo, password).subscribe(ok => {
      if (ok === true) {
        this.router.navigate(['/']);
        this.snackbar.open('Bienvenido', 'Ok', {
          duration: 10000
        });
      } else {
        this.router.navigateByUrl('/auth/login');
      }
    });
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }

}
