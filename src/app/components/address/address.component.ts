import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit,OnDestroy {

  suscription?:Subscription;
  address:string = '';
  
  constructor(private _web3Service:Web3Service) {
    this.suscription = _web3Service.onAdressChange().subscribe(value=>this.address = value);
   }
  ngOnDestroy(): void {
    if(this.suscription)
    {
      this.suscription.unsubscribe();
    }
  }

  ngOnInit(): void {
  }

  connect():void
  {
    this._web3Service.connect();
  }
}
