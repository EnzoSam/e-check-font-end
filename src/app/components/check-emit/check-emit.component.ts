import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { Web3Service } from '../../services/web3.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { routesPaths } from '../../constants/routes';
import { ICheck } from 'src/app/interfaces/icheck.interface';

@Component({
  selector: 'app-check-emit',
  templateUrl: './check-emit.component.html',
  styleUrls: ['./check-emit.component.css']
})
export class CheckEmitComponent implements OnInit {

  check: ICheck;

  constructor(private _web3Service: Web3Service,
    private _firestoreService: FirestoreService,
    private _route: Router) {
    this.check = _firestoreService.createNewCheck();
  }

  ngOnInit(): void {


  }

  async signClick() {
    if (this.check) {
      await this._web3Service.signCheck(this.check);

      if (this.check.signature) {
        this._firestoreService.insertCheck(this.check).then((check: any) => {
          this._route.navigate([routesPaths.dashboard + '/' + routesPaths.detail, check.id])
        })
          .catch((reason: any) => {
            alert(reason);
          });
      }
      else
      {
        alert('No se ha firmado.');
      }
    }
  }


}
