import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ComingSoonComponent } from './no-pages-found/coming-soon.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        pathMatch: 'full'
      },
      {
        path: 'apps/inbox',
        loadChildren: () => import('./pages/apps/inbox/inbox.module').then(m => m.InboxModule),
      },
      {
        path: 'apps/calendar',
        loadChildren: () => import('./pages/apps/calendar/calendar.module').then(m => m.CalendarAppModule),
      },
      {
        path: 'apps/chat',
        loadChildren: () => import('./pages/apps/chat/chat.module').then(m => m.ChatModule),
      },
      {
        path: 'components',
        loadChildren: () => import('./pages/components/components.module').then(m => m.ComponentsModule),
      },
      {
        path: 'forms/form-elements',
        loadChildren: () => import('./pages/forms/form-elements/form-elements.module').then(m => m.FormElementsModule),
      },
      {
        path: 'forms/form-wizard',
        loadChildren: () => import('./pages/forms/form-wizard/form-wizard.module').then(m => m.FormWizardModule),
      },
      {
        path: 'icons',
        loadChildren: () => import('./pages/icons/icons.module').then(m => m.IconsModule),
      },
      {
        path: 'page-layouts',
        loadChildren: () => import('./pages/page-layouts/page-layouts.module').then(m => m.PageLayoutsModule),
      },
      {
        path: 'table/users',
        loadChildren: () => import('./pages/tables/all-in-one-table/all-in-one-table.module').then(m => m.AllInOneTableModule),
      },
      {
        path: 'table/trucks',
        loadChildren: () => import('./pages/tables/table-camion/all-in-one-table.module').then(m => m.AllInOneTableModule),
      },
      {
        path: 'drag-and-drop',
        loadChildren: () => import('./pages/drag-and-drop/drag-and-drop.module').then(m => m.DragAndDropModule)
      },
      {
        path: 'editor',
        loadChildren: () => import('./pages/editor/editor.module').then(m => m.EditorModule),
      },
      {
        path: 'blank',
        loadChildren: () => import('./pages/blank/blank.module').then(m => m.BlankModule),
      },
    ],
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: '**',
    component: ComingSoonComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledNonBlocking',
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
