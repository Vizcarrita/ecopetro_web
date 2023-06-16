import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../models/customer.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'fury-page-layout-simple',
  templateUrl: './page-layout-simple.component.html',
  styleUrls: ['./page-layout-simple.component.scss']
})
export class PageLayoutSimpleComponent implements OnInit {

  customers: Customer[]=[];

  constructor(private usuariosService:UsuariosService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.usuariosService.getUsuarios().subscribe(customers => {
      this.customers = customers;
      console.log(this.customers);
    });
  }

}
