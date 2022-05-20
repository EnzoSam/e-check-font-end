import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { ICheck } from '../interfaces/icheck';
import { Contract } from '../constants/global';
import { BehaviorSubject } from 'rxjs';
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
      if(this.chainIds.includes(res))
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

    window.ethereum.on('accountChanged',(accounts:string[])=>
      {
        this.addressUser.next(accounts[0]);
        console.log(this.addressUser.value);
      });
  }



  async initWeb311111() {
    /*
    try {
      if (typeof window.ethereum !== undefined) {

        console.log('window.ethereum !== undefined');
        this.web3 = new Web3(window.ethereum);
        console.log(window.ethereum);
        await window.ethereum.enable();
        console.log(this.web3.eth.accounts);
        if(this.web3.eth.accounts.length > 0)
        {
          this.defaultAccount =this.web3.eth.accounts[0];
          console.log(this.defaultAccount);
        }
      }      
      else if(typeof window.web3 !== undefined){
        console.log('window.ethereum == undefined');
        this.web3Provider = window.web3.currentProvider;
        this.web3 = new Web3( window.web3.currentProvider);
        if(this.web3.eth.accounts.length > 0)
        {
          this.defaultAccount =this.web3.eth.accounts[0];
          console.log(this.defaultAccount);
        }
      }
      else
      {
        //no esta metamask
      }

      
    }
    catch (e) {
      console.log(e);
    }

    */
  }

  generateHash(check: ICheck) {
    let hash = "0x" + abi.soliditySHA3
      (["address", "uint256", "uint256", "address"],
        [check.address, check.amount, check.number, Contract.address]);

    console.log(hash);
    return hash;
  }

  async signCheck(check: ICheck) {
    //0xf9EFE64C0d8E11536BF4a903e80De48dAB9b13F1
    let hash = await this.generateHash(check);
    if (this.addressUser && this.addressUser.value) {
      this.web3.eth.personal.sign(hash, this.addressUser.value, (err: any, signature: any) => {
        console.log(signature);
        return signature;
      });
    }
  }
}
