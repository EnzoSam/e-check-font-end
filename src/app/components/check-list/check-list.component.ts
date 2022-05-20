import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.css']
})
export class CheckListComponent implements OnInit {

  public checks:any[];
  displayedColumns: string[] = ['numero', 'beneficiario', 'total'];
  expandedElement: any | null;

  constructor() { 
    this.checks = [];
    this.checks.push({numero:1,beneficiario:'ffsadfsadfdsf', total:0.15});
  }

  ngOnInit(): void {
  }

  getTotalChecks():number
  {
    return this.checks.reduce((sum, c) => sum + c.total, 0);
  }
}
