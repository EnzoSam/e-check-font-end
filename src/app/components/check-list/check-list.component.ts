import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { states } from 'src/app/constants/checks';
import { routesPaths } from 'src/app/constants/routes';
import { CheckViewType } from 'src/app/enums/checks.enum';
import { ICheck } from 'src/app/interfaces/icheck.interface';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class CheckListComponent implements OnInit,OnDestroy {

  @Input() viewType: CheckViewType | undefined;
  public checks: ICheck[];
  displayedColumns: string[] = ['number', 'recipient', 'amount', 'state'];
  expandedElement: any | null;
  suscription?: Subscription;
  
  constructor(private _fireStoreService: FirestoreService, 
    private _web3Service: Web3Service,
    private _route: Router) {
    this.checks = [];
  }

  ngOnInit(): void {

    if (!this.viewType)
      return;

      this.suscription = this._web3Service.onAdressChange().subscribe
      ((value: string) => {
        this.loadChecks();
      }
      );

  }

  loadChecks():void
  {
    let address = this._web3Service.getCurrentAccountAddress();

    if (this.viewType === CheckViewType.Emmited) {
      this._fireStoreService.getEmitedCheck(address).then((snapshot: any) => {
        this.checks = [];
        snapshot.forEach((doc: { data: () => ICheck; }) => {
          this.checks.push(doc.data());
        });

      }).catch((reason: any) => {
        console.log(reason);
        alert(reason);
      });
    }
    else  if (this.viewType === CheckViewType.Pendings)
    {
      this._fireStoreService.getPorfolioChecks(address).then((snapshot: any) => {
        this.checks = [];
        snapshot.forEach((doc: { data: () => ICheck; }) => {
          this.checks.push(doc.data());
        });

      }).catch((reason: any) => {
        alert(reason);
      });      
    }    
  }

  getTotalChecks(): number {
    return this.checks.reduce((sum, c) => sum + parseInt(c.amount), 0);
  }

  accredit():void{

    console.log('accredit');
    console.log(this.expandedElement);
    if(!this.expandedElement)
    {
       alert('Sin seleccion');
       return;
    }

    this._web3Service.accreedit(this.expandedElement as ICheck).then((value:any)=>
    {
      let c = this.expandedElement as ICheck;
      c.state = states.accredit;
      this._fireStoreService.updateCheck(c);
      alert('Acreditado: \n' + value);
    }).catch((error)=>
    {
      if(error.code && error.code === 4001)
          alert('Error: \n' + 'Denegado por el usuario');
      else
        alert('Error: \n' + error);
    });
  }

  ngOnDestroy(): void {
    if (this.suscription) {
      this.suscription.unsubscribe();
    }
  }
}
