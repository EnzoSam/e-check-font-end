import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const appRoutes: Routes = [


    //{path:'',component:InicioComponent},
//    {path:'**',component:ErrorPredeterminadoComponent}

//{ path: '', component: PanelConfiguracioesComponent},
//{ path: 'emitir',component: CheckEmitComponent},

];


//EXPORTAR CONFIGURACION
export const appRoutingProviders: any[] = [];

export const routing:ModuleWithProviders<any> = RouterModule.forChild(appRoutes);
