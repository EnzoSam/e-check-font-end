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
import { ChecksEmitedsComponent } from './components/checks-emiteds/checks-emiteds.component';
import { CheckListComponent } from './components/check-list/check-list.component';
import { Web3Service } from './services/web3.service';
import { AddressComponent } from './components/address/address.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { CheckDetailComponent } from './components/check-detail/check-detail.component';
import { FirestoreService } from './services/firestore.service';


@NgModule({
  declarations: [
    AppComponent,
    DefaultErrorComponent,
    DashboardMenuComponent,
    CheckEmitComponent,
    ChecksEmitedsComponent,
    CheckListComponent,
    AddressComponent,
    CheckDetailComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [Web3Service,FirestoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
