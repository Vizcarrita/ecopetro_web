import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from "./pages/main/main.component";
import { RegisterComponent } from "./pages/register/register.component";
import { LoginComponent } from "./pages/login/login.component";


const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children:[
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: '**',
                redirectTo: 'register'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}