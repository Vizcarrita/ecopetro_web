import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ListColumn } from '../../../../@fury/shared/list/list-column.model';
import { CustomerCreateUpdateComponent } from './customer-create-update/customer-create-update.component';
import { Truck } from '../../../models/truck.model';
import { fadeInRightAnimation } from '../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { CamionesService } from 'src/app/services/camiones.service';


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
    subject$: ReplaySubject<Truck[]> = new ReplaySubject<Truck[]>(1);
    data$: Observable<Truck[]> = this.subject$.asObservable();
    trucks: Truck[]=[];
  
  
    @Input()
    columns: ListColumn[] = [
      { name: 'Checkbox', property: 'checkbox', visible: false },
      { name: 'Patente', property: 'patente', visible: true, isModelProperty: true },
      { name: 'Marca', property: 'marca', visible: true, isModelProperty: true },
      { name: 'Capacidad', property: 'capacidad', visible: true, isModelProperty: true },
      { name: 'Estado', property: 'fkidEstadoCamion', visible: true, isModelProperty: true },
      { name: 'Actions', property: 'actions', visible: true },
    ] as ListColumn[];
    pageSize = 10;
    dataSource: MatTableDataSource<Truck> | null;
  
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
  
    constructor(private dialog: MatDialog,
                private camionesService: CamionesService) {
    }
  
    get visibleColumns() {
      return this.columns.filter(column => column.visible).map(column => column.property);
    }
  
    ngOnInit() {
  
      this.getData();

      this.dataSource = new MatTableDataSource();
  
      this.data$.pipe(
        filter(data => !!data)
      ).subscribe((trucks) => {
        this.trucks = trucks;
        this.dataSource.data = trucks;
      });
    }
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
    getData() {
      this.camionesService.getTruck().subscribe(trucks => {
        this.trucks = trucks;
        this.dataSource.data = trucks;
      });
    }
    
  
  
    createCustomer() {
       this.dialog.open(CustomerCreateUpdateComponent).afterClosed().subscribe((truck: Truck) => {
         /**
          * Customer is the updated customer (if the user pressed Save - otherwise it's null)
          */
         if (truck) {
           /**
            * Here we are updating our local array.
            * You would probably make an HTTP request here.
            */
           this.trucks.unshift(new Truck(truck));
           this.subject$.next(this.trucks);
         }
       });
     }
    
     updateCustomer(trucks) {
      this.dialog.open(CustomerCreateUpdateComponent, {
        data: trucks,
      }).afterClosed().subscribe((truck) => {
        /**
         * Customer es el cliente actualizado (si el usuario presionó "Actualizar Usuario", de lo contrario, es nulo)
         */
        if (truck) {
          const index = this.trucks.findIndex((existingTruck) => existingTruck.idCamion === truck.idCamion);
          this.trucks[index] = new Truck(truck);
          this.subject$.next(this.trucks);
        }
      });
    }
    
    deleteCustomer(truck) {
      /**
       * Here we are updating our local array.
       * You would probably make an HTTP request here.
       */
      this.trucks.splice(this.trucks.findIndex((existingTruck) => existingTruck.idCamion === truck.idCamion), 1);
      this.subject$.next(this.trucks);
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
