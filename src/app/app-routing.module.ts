import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckEmitComponent } from './components/check-emit/check-emit.component';
import { ChecksEmitedsComponent } from './components/checks-emiteds/checks-emiteds.component';
import { DashboardMenuComponent } from './components/dashboard-menu/dashboard-menu.component';
import { DefaultErrorComponent } from './components/default-error/default-error.component';
import {routesPaths} from './constants/routes';

const routes: Routes = [
  {
    path:'',
    redirectTo:routesPaths.dashboard,
    pathMatch:'full'
  },
  { path: routesPaths.dashboard,
  children:[
      {
          path:routesPaths.emit,
          component:CheckEmitComponent
      },
      {
        path:routesPaths.emiteds,
        component:ChecksEmitedsComponent
      },
      {
        path:routesPaths.accredit,
        component:CheckEmitComponent
      }
  ]},

  {path:'**',component:DefaultErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
