import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Contract } from '../constants/global';
import { BehaviorSubject, Observable } from 'rxjs';
import { Check } from '../models/check.model';
var abi = require('ethereumjs-abi');



declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  /*web3: any;
  defaultAccount:any;
  web3Provider:any;*/

  private web3: any;
  private chainIds:string[]= ['0x4'];
  private addressUser:any=new BehaviorSubject<string>('');


  constructor() {

  }

  async connect()
  {
    console.log('conecting...');
    if (typeof window.ethereum !== undefined) {
      this.web3 = new Web3(window.ethereum);
      this.handleIdChainChange();
    }
    else{
      console.log('no esta metamask.');
    }
  }

  onAdressChange(): Observable<string>
  {
    return this.addressUser.asObservable()
  }

  async handleIdChainChange()
  {
    const chainId:string = await window.ethereum.request({method:'eth_chainId'});
    if(this.chainIds.includes(chainId))
    {
      this.handleAccountsChange();
    }
    else{
      //red no contemplada
    }

    window.ethereum.on('chainChanged',(res:string)=>
    {
      if(!this.chainIds.includes(res))
      {
        //red no contemplada
      }
      else{
        this.handleAccountsChange();
      }
    });
  }

  async handleAccountsChange()
  {
    const accounts :string[] = await window.ethereum.request({method:'eth_requestAccounts'});
    this.addressUser.next(accounts[0]);
    console.log(this.addressUser.value);

    window.ethereum.on('accountsChanged',(accounts:string[])=>
      {
        this.addressUser.next(accounts[0]);
        console.log(this.addressUser.value);
      });
  }


  generateHash(check: Check) {
    let hash = "0x" + abi.soliditySHA3
      (["address", "uint256", "uint256", "address"],
        [check.recipient, check.amount, check.number, Contract.address]).toString("hex");

    console.log(hash);
    return hash;
  }

  async signCheck(check: Check) {
    
    let hash = await this.generateHash(check);

    if (this.addressUser && this.addressUser.value) {
      await this.web3.eth.personal.sign(hash, this.addressUser.value, (err: any, signature: any) => {
        check.signer = this.addressUser.value;
        check.signature = signature;        
      });
    }
  }
}
