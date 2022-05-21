import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { DefaultErrorComponent } from './components/default-error/default-error.component';
import { DashboardMenuComponent } from './components/dashboard-menu/dashboard-menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { CheckEmitComponent } from './components/check-emit/check-emit.component';
import { CheckSignComponent } from './components/check-sign/check-sign.component';
import { ChecksEmitedsComponent } from './components/checks-emiteds/checks-emiteds.component';
import { CheckListComponent } from './components/check-list/check-list.component';
import { Web3Service } from './services/web3.service';
import { AddressComponent } from './components/address/address.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultErrorComponent,
    DashboardMenuComponent,
    CheckEmitComponent,
    CheckSignComponent,
    ChecksEmitedsComponent,
    CheckListComponent,
    AddressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [Web3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
