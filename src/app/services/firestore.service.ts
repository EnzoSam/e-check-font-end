import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ICheck } from '../interfaces/icheck.interface';
import { Check } from '../models/check.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) {
  }

  createNewCheck():ICheck
  {
    return {
      id:'',
      number: 0,
      amount:0,
      signature:'',
      signer: '',
      recipient: '',
      state: ''};
  }

  insertCheck(check:ICheck) {
    check.id = this.firestore.createId();
    console.log(check);
    return this.firestore.collection<ICheck>('Checks').add(check);
  }

  getChecks() {
    return this.firestore.collection<ICheck>('Checks').valueChanges();
  }

  updateCheck(check:ICheck){
    this.firestore.doc('Checks/' + check.id).update(check);
  }

  getCheck(id:any){
    return this.firestore.doc<ICheck>('Checks/' + id).get();
  }

  deleteCheck(check:ICheck) {
    this.firestore.doc('Checks/' + check.id).delete();
  }
}
