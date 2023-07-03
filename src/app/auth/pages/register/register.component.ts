import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'fury-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [fadeInUpAnimation]
})
export class RegisterComponent {
  
  form: FormGroup = this.fb.group({
    idUsuario: [],
    nombreUsuario: [, Validators.required],
    apellido: [, Validators.required],
    correo: [, Validators.required],
    // password: [, Validators.required],
    telefono: ['+569']
  });

  inputType = 'password';
  visible = false;

  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private usuariosService: UsuariosService) { }

  send() {
    const usuario = this.form.value;
    this.usuariosService.addNewCustomer(usuario).subscribe();
    console.log(usuario);
    this.router.navigate(['/auth/login']);
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
