import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ListColumn } from '../../../../@fury/shared/list/list-column.model';
import { CustomerCreateUpdateComponent } from './customer-create-update/customer-create-update.component';
import { Customer } from '../../../models/customer.model';
import { fadeInRightAnimation } from '../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'fury-all-in-one-table',
  templateUrl: './all-in-one-table.component.html',
  styleUrls: ['./all-in-one-table.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class AllInOneTableComponent implements OnInit, AfterViewInit {
    /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
    subject$: ReplaySubject<Customer[]> = new ReplaySubject<Customer[]>(1);
    data$: Observable<Customer[]> = this.subject$.asObservable();
    customers: Customer[]=[];
  
  
    @Input()
    columns: ListColumn[] = [
      { name: 'Image', property: 'image', visible: true },
      { name: 'Nombre', property: 'nombreUsuario', visible: true, isModelProperty: true },
      { name: 'Apellido', property: 'apellido', visible: true, isModelProperty: true },
      { name: 'Correo', property: 'correo', visible: true, isModelProperty: true },
      { name: 'Telefono', property: 'telefono', visible: true, isModelProperty: true },
      { name: 'Actions', property: 'actions', visible: true },
    ] as ListColumn[];
    pageSize = 10;
    dataSource: MatTableDataSource<Customer> | null;
  
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
  
    constructor(private dialog: MatDialog,
                private usuariosService:UsuariosService) {
    }
  
    get visibleColumns() {
      return this.columns.filter(column => column.visible).map(column => column.property);
    }
  
    ngOnInit() {
      this.getData();
      this.dataSource = new MatTableDataSource();
  
      this.data$.pipe(
        filter(data => !!data)
      ).subscribe((customers) => {
        this.customers = customers;
        this.dataSource.data = customers;
      });
    }
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
    getData() {
      this.usuariosService.getCustomer().subscribe(customers => {
        this.customers = customers;
        this.dataSource.data = customers;
      });
    }
    
  
  
    createCustomer() {
       this.dialog.open(CustomerCreateUpdateComponent).afterClosed().subscribe((customer: Customer) => {
         /**
          * El cliente es el cliente actualizado (si el usuario presionó "Agregar Usuario", de lo contrario es nulo)
          */
         if (customer) {
           this.customers.unshift(new Customer(customer));
           this.subject$.next(this.customers);
         }
       });
     }
    
     updateCustomer(customers) {
      this.dialog.open(CustomerCreateUpdateComponent, {
        data: customers,
      }).afterClosed().subscribe((customer) => {
        /**
         * Customer es el cliente actualizado (si el usuario presionó "Actualizar Usuario", de lo contrario, es nulo)
         */
        if (customer) {
          const index = this.customers.findIndex((existingCustomer) => existingCustomer.idUsuario === customer.idUsuario);
          this.customers[index] = new Customer(customer);
          this.subject$.next(this.customers);
        }
      });
    }
    
    deleteCustomer(customer) {
      this.usuariosService.deleteCustomer(customer.idUsuario).subscribe();
      this.customers.splice(this.customers.findIndex((existingCustomer) => existingCustomer.idUsuario === customer.idUsuario), 1);
      this.subject$.next(this.customers);
    }

    onFilterChange(value) {
      if (!this.dataSource) {
        return;
      }
      value = value.trim();
      value = value.toLowerCase();
      this.dataSource.filter = value;
    }

}
