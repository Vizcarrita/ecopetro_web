import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../../../../models/customer.model';
import { UsuariosService } from '../../../../services/usuarios.service';

@Component({
  selector: 'fury-customer-create-update',
  templateUrl: './customer-create-update.component.html',
  styleUrls: ['./customer-create-update.component.scss']
})
export class CustomerCreateUpdateComponent implements OnInit {

  customers: Customer[]=[];

  mode: 'create' | 'update' = 'create';

  form: FormGroup = this.fb.group({
    idUsuario:[],
    nombreUsuario: [,[Validators.required]],
    apellido: [,[Validators.required]],
    correo: [,[Validators.required]],
    telefono: [,[Validators.required]],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: Customer,
              private dialogRef: MatDialogRef<CustomerCreateUpdateComponent>,
              private fb: FormBuilder,
              private usuariosService:UsuariosService) {
  }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
      this.form.patchValue({
        idUsuario: this.defaults.idUsuario,
        nombreUsuario: this.defaults.nombreUsuario,
        apellido: this.defaults.apellido,
        correo: this.defaults.correo,
        telefono: this.defaults.telefono
      });

    } else {
      this.defaults = {} as Customer;
    }
  }

  save() {
    if (this.mode === 'create') {
      this.createCustomer();
    } else if (this.mode === 'update') {
      this.updateCustomer();
    }
  }

  createCustomer() {
    const customer = this.form.value;
    this.usuariosService.addNewCustomer(customer).subscribe();
    this.dialogRef.close(customer);
  }

  updateCustomer() {
    const customer = this.form.value;
    console.log(customer)
    this.usuariosService.updateCustomer(customer).subscribe()
    this.dialogRef.close(customer);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
