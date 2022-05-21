import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { ICheck } from '../interfaces/icheck';
import { Contract } from '../constants/global';
import { BehaviorSubject, Observable } from 'rxjs';
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

    this.initWeb3();
  }

  async initWeb3() {
    if (typeof window.ethereum !== undefined) {
      this.web3 = new Web3(window.ethereum);
      this.connect();
    }
    else{
      //no esta metamask
    }
  }

  connect()
  {
    this.handleIdChainChange();
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


  generateHash(check: ICheck) {
    let hash = "0x" + abi.soliditySHA3
      (["address", "uint256", "uint256", "address"],
        [check.address, check.amount, check.number, Contract.address]).toString("hex");

    console.log(hash);
    return hash;
  }

  async signCheck(check: ICheck) {
    //0xf9EFE64C0d8E11536BF4a903e80De48dAB9b13F1
    let hash = await this.generateHash(check);
    if (this.addressUser && this.addressUser.value) {
      this.web3.eth.personal.sign(hash, this.addressUser.value, (err: any, signature: any) => {
        console.log(signature);
        alert(signature);
        return signature;
      });
    }
  }
}
