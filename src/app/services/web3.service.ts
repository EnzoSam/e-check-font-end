import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Contract } from '../constants/global';
import { BehaviorSubject, Observable } from 'rxjs';
import { Check } from '../models/check.model';
import { ICheck } from '../interfaces/icheck.interface';
var abi = require('ethereumjs-abi');
let contractAbi = require('./contractAbi.json');


declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  private web3: any;
  private chainIds:string[]= ['0x4'];
  private addressUser:any=new BehaviorSubject<string>('');


  constructor() {

  }

  async connect()
  {
    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum);
      this.handleIdChainChange();
    }
    else{
      alert('Debes instalar metamask.');
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
      alert('Solo disponible para la red Rinkeby (Ethereum).');
    }

    window.ethereum.on('chainChanged',(res:string)=>
    {
      if(!this.chainIds.includes(res))
      {
        alert('Solo disponible para la red Rinkeby (Ethereum).');
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

    window.ethereum.on('accountsChanged',(accounts:string[])=>
      {
        this.addressUser.next(accounts[0]);
      });
  }


  generateHash(check: Check) {
    let hash = "0x" + abi.soliditySHA3
      (["address", "uint256", "uint256", "address"],
        [check.recipient, check.amount, check.number, Contract.address]).toString("hex");

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

  getCurrentAccountAddress():string
  {
    return this.addressUser.value;
  }

  async accreedit(_check:ICheck):Promise<any>
  {
    if(!this.addressUser.value)
      return;
    window.ethereum.request({method:'eth_requestAccounts'});
    const contract = new this.web3.eth.Contract(contractAbi, Contract.address);
    let trans:any = undefined;
    let err:any = undefined;
    await contract.methods.accreditCheck(_check.amount,_check.number,_check.signature)
    .send({from:this.addressUser.value}, (error:any, transactionHash:any) =>
    {
      trans = transactionHash;
      err = error;
    });
    if(err)
      return Promise.reject(err);
    else
      return Promise.resolve(trans);
  }

}
