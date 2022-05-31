import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { states } from '../constants/checks';
import { ICheck } from '../interfaces/icheck.interface';
import { Check } from '../models/check.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) {
  }

  async createNewCheck():Promise<ICheck>
  {
    let icheck:ICheck = {
      id:'',
      number: 0,
      amount:0,
      signature:'',
      signer: '',
      recipient: '',
      state: ''};

    await this.getMaxCheckNumber().then((max:number)=>
    {
      icheck.number = max + 1;
    });

    return Promise.resolve(icheck);
  }

  async insertCheck(check:ICheck) {
    check.id = await this.firestore.createId();
    check.state = states.pending;
    return this.firestore.collection<ICheck>('Checks').doc(check.id).set(check);
  }

  getEmitedCheck(_addressSigner:any) {
    return this.firestore.collection<ICheck>('Checks').ref.orderBy('number','desc')
    .where('signer','==',_addressSigner).get();
  }

  getPorfolioChecks(_addressRecipient:any) {
    return this.firestore.collection<ICheck>('Checks').ref
    .orderBy('number','desc').where('recipient','==',_addressRecipient).get();
  }

  updateCheck(check:ICheck){
    this.firestore.collection<ICheck>('Checks').doc(check.id).update({state:check.state});
  }

  getCheck(id:any){
    return this.firestore.doc<ICheck>('Checks/' + id).get();
  }

  deleteCheck(check:ICheck) {
    this.firestore.doc('Checks/' + check.id).delete();
  }

  async getMaxCheckNumber():Promise<number>
  {
    let max:number = 0;
    await this.firestore.collection<ICheck>('Checks').ref
    .orderBy('number', 'desc').limit(1).get().then((value:any)=>
    {
      if(value && value.docs && value.docs.length > 0)
      {
        max = +value.docs[0].data().number;        
      }
    })

    return Promise.resolve(max);
  }
}
