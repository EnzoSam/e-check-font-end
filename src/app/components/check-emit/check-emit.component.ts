import { Component, OnInit } from '@angular/core';
import { ICheck } from 'src/app/interfaces/icheck';
import { Web3Service } from '../../services/web3.service';

@Component({
  selector: 'app-check-emit',
  templateUrl: './check-emit.component.html',
  styleUrls: ['./check-emit.component.css']
})
export class CheckEmitComponent implements OnInit {
  
  check: ICheck;
  
  constructor(private _web3Service : Web3Service) {
    this.check= {number:1,amount:0,address:''};
   }

  ngOnInit(): void {


  }

  click()
  {
      this._web3Service.signCheck(this.check);
  }


}
