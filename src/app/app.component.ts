import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { SidenavService } from './layout/sidenav/sidenav.service';
import { ThemeService } from '../@fury/services/theme.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Platform } from '@angular/cdk/platform';
import { SplashScreenService } from '../@fury/services/splash-screen.service';
import { UsuariosService } from './services/usuarios.service';
import { Customer } from './models/customer.model';

@Component({
  selector: 'fury-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private sidenavService: SidenavService,
              private iconRegistry: MatIconRegistry,
              private renderer: Renderer2,
              private themeService: ThemeService,
              private usuariosService: UsuariosService,
              @Inject(DOCUMENT) private document: Document,
              private platform: Platform,
              private route: ActivatedRoute,
              private splashScreenService: SplashScreenService) {
    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('style'))
    ).subscribe(queryParamMap => this.themeService.setStyle(queryParamMap.get('style')));

    this.iconRegistry.setDefaultFontSetClass('material-icons-outlined');
    this.themeService.theme$.subscribe(theme => {
      if (theme[0]) {
        this.renderer.removeClass(this.document.body, theme[0]);
      }

      this.renderer.addClass(this.document.body, theme[1]);
    });

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, 'is-blink');
    }

    this.sidenavService.addItems([
      {
        name: 'APPS',
        position: 5,
        type: 'subheading',
        customClass: 'first-subheading'
      },
      {
        name: 'Dashboard',
        routeOrFunction: '/',
        icon: 'dashboard',
        position: 10,
        pathMatchExact: true
      },
      {
        name: 'Lista de usuarios',
        routeOrFunction: '/table/users',
        icon: 'assignment',
        badgeColor: '#2196F3',
        position: 15,
      },
      {
        name: 'Camiones',
        routeOrFunction: '/table/trucks',
        icon: 'local_shipping',
        badgeColor: '#32CD32',
        position: 20,
      },
      {
        name: 'Calendario',
        routeOrFunction: '/apps/calendar',
        icon: 'date_range',
        position: 25
      },
      {
        name: 'Inbox',
        routeOrFunction: '/apps/inbox',
        icon: 'inbox',
        position: 30
      },
      {
        name: 'Chat',
        routeOrFunction: '/apps/chat',
        icon: 'chat',
        position: 35,
        badgeColor: '#009688'
      },
      {
        name: 'USER INTERFACE',
        type: 'subheading',
        position: 40
      },
      {
        name: 'Components',
        routeOrFunction: '/components',
        icon: 'layers',
        position: 45
      },
      {
        name: 'Forms',
        icon: 'description',
        position: 50,
        subItems: [
          {
            name: 'Form Elements',
            routeOrFunction: '/forms/form-elements',
            position: 10
          },
          {
            name: 'Form Wizard',
            routeOrFunction: '/forms/form-wizard',
            position: 15
          }
        ]
      },
      {
        name: 'Drag & Drop',
        routeOrFunction: '/drag-and-drop',
        icon: 'mouse',
        position: 55
      },
      {
        name: 'WYSIWYG Editor',
        routeOrFunction: '/editor',
        icon: 'format_shapes',
        position: 60
      },
      {
        name: 'PAGES',
        type: 'subheading',
        position: 65
      },
      {
        name: 'Authentication',
        icon: 'lock',
        position: 66,
        subItems: [
          {
            name: 'Login Page',
            routeOrFunction: '/login',
            position: 5
          },
          {
            name: 'Register Page',
            routeOrFunction: '/register',
            position: 10
          },
          {
            name: 'Forgot Password',
            routeOrFunction: '/forgot-password',
            position: 15
          }
        ]
      },
      {
        name: 'Page Layouts',
        icon: 'view_compact',
        position: 67,
        subItems: [
          {
            name: 'Simple',
            routeOrFunction: '/page-layouts/simple',
            position: 5
          },
          {
            name: 'Simple Tabbed',
            routeOrFunction: '/page-layouts/simple-tabbed',
            position: 5
          },
          {
            name: 'Card',
            routeOrFunction: '/page-layouts/card',
            position: 10
          },
          {
            name: 'Card Tabbed',
            routeOrFunction: '/page-layouts/card-tabbed',
            position: 15
          },
        ],
        badge: '4',
        badgeColor: '#4CAF50'
      },
      {
        name: 'Blank',
        routeOrFunction: '/blank',
        icon: 'picture_in_picture',
        position: 69
      },
      {
        name: 'Material Icons',
        routeOrFunction: '/icons',
        icon: 'grade',
        position: 75
      },
    ]);
  }

}
