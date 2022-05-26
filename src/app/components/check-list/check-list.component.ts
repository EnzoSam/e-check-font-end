import { Component, OnInit } from '@angular/core';
import { ICheck } from 'src/app/interfaces/icheck.interface';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.css']
})
export class CheckListComponent implements OnInit {

  public checks:ICheck[];
  displayedColumns: string[] = ['number', 'recipient', 'amount'];
  expandedElement: any | null;

  constructor(private _fireStoreService:FirestoreService) { 
    this.checks = [];
  }

  ngOnInit(): void {
  
     this._fireStoreService.getChecks().subscribe((data:any)=>
     {
       this.checks = data;
     });
  }

  getTotalChecks():number
  {
    return this.checks.reduce((sum, c) => sum + c.amount, 0);
  }
}
