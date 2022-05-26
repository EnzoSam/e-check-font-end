import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routesParams } from 'src/app/constants/routes';
import { ICheck } from 'src/app/interfaces/icheck.interface';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-check-detail',
  templateUrl: './check-detail.component.html',
  styleUrls: ['./check-detail.component.css']
})
export class CheckDetailComponent implements OnInit {

  check: ICheck | undefined;
  constructor(private _route: ActivatedRoute, private fireStoreService: FirestoreService) { }

  ngOnInit(): void {
    this.loadCheck();
  }

  loadCheck(): void {
    this._route.params.subscribe(params => {
      this.fireStoreService.getCheck(params[routesParams.detail_id]).subscribe((value:any) => {
        this.check = value.data();
      });
    });
  }  
}
