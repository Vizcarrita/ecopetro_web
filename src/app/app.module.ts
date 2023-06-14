import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Needed for Touch functionality of Material Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { PendingInterceptorModule } from '../@fury/shared/loading-indicator/pending-interceptor.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';
import { PageLayoutModule } from "../@fury/shared/page-layout/page-layout.module";
import { BreadcrumbsModule } from "../@fury/shared/breadcrumbs/breadcrumbs.module";
import { PageLayoutDemoContentModule } from "./pages/page-layouts/components/page-layout-content/page-layout-demo-content.module";



@NgModule({
    declarations: [AppComponent,],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'fill'
            } as MatFormFieldDefaultOptions
        },
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: {
                duration: 5000,
                horizontalPosition: 'end',
                verticalPosition: 'bottom'
            } as MatSnackBarConfig
        }
    ],
    imports: [
        // Angular Core Module // Don't remove!
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        // Fury Core Modules
        AppRoutingModule,
        // Layout Module (Sidenav, Toolbar, Quickpanel, Content)
        LayoutModule,
        // Displays Loading Bar when a Route Request or HTTP Request is pending
        PendingInterceptorModule,
        PageLayoutModule,
        BreadcrumbsModule,
        PageLayoutDemoContentModule
    ]
})
export class AppModule {
}
