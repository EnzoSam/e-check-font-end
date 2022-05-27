import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Contract, Site } from '../../constants/global';
import { routesPaths } from '../../constants/routes';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css']
})
export class DashboardMenuComponent implements OnInit, OnDestroy {

  suscription?: Subscription;
  title: string;
  routesPaths = routesPaths;
  isEmmiter: boolean = false;
  appName:string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private _web3Service: Web3Service) {
    this.title = '';
    this.appName =Site.name;
  }

  ngOnInit(): void {
    this.suscription = this._web3Service.onAdressChange().subscribe
      ((value: string) => {
        console.log(value + '  ' + Contract.owner);    
        this.isEmmiter = ((value + '').toLowerCase() === Contract.owner.toLowerCase());
      }
      );
  }

  ngOnDestroy(): void {
    if (this.suscription) {
      this.suscription.unsubscribe();
    }
  }

  emitClick()
  {
    this.title = 'Emitir Cheque';
  }

  emitedsClick()
  {
    this.title = 'Cheques emitidos';
  }

  portfolioClick()
  {
    this.title = 'Cartera';
  }

}
