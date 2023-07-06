import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Truck } from '../../../../models/truck.model';
import { CamionesService } from 'src/app/services/camiones.service';

@Component({
  selector: 'fury-customer-create-update',
  templateUrl: './customer-create-update.component.html',
  styleUrls: ['./customer-create-update.component.scss']
})
export class CustomerCreateUpdateComponent implements OnInit {


  mode: 'create' | 'update' = 'create';

  form: FormGroup = this.fb.group({
    idCamion:[],
    patente: [,[Validators.required]],
    marca: [,[Validators.required]],
    capacidad: [,[Validators.required]],
    fkidEstadoCamion: [],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: Truck,
              private dialogRef: MatDialogRef<CustomerCreateUpdateComponent>,
              private fb: FormBuilder,
              private camionesService: CamionesService) {
  }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
      this.form.patchValue({
        idCamion: this.defaults.idCamion,
        patente: this.defaults.patente,
        marca: this.defaults.marca,
        capacidad: this.defaults.capacidad,
        fkidEstadoCamion: this.defaults.fkidEstadoCamion
      });
    } else {
      this.defaults = {} as Truck;
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
    const truck = this.form.value;
    this.camionesService.addNewTruck(truck).subscribe();
    this.dialogRef.close(truck);
  }

  updateCustomer() {
    const truck = this.form.value;
    this.camionesService.updateTruck(truck).subscribe();
    this.dialogRef.close(truck);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
