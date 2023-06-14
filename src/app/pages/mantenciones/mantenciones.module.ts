import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantencionesCamionComponent } from './mantenciones-camion/mantenciones-camion.component';
import { PageLayoutSimpleComponent } from './page-layout-simple/page-layout-simple.component';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from 'src/@fury/shared/page-layout/page-layout.module';
import { PageLayoutDemoContentModule } from '../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { PageLayoutSimpleRoutingModule } from './page-layout-simple/page-layout-simple-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { HighlightModule } from 'src/@fury/shared/highlightjs/highlight.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FormElementsRoutingModule } from '../forms/form-elements/form-elements-routing.module';





@NgModule({
    declarations: [
        MantencionesCamionComponent,
        PageLayoutSimpleComponent
    ],
    imports: [
        CommonModule,
        PageLayoutModule,
        BreadcrumbsModule,
        PageLayoutDemoContentModule,
        PageLayoutSimpleRoutingModule,
        FurySharedModule,
        FormElementsRoutingModule,
        MaterialModule,
        FurySharedModule,
        ReactiveFormsModule,
    
        // Core
        HighlightModule,
        FuryCardModule,
        BreadcrumbsModule
    ]
})
export class MantencionesModule { }
