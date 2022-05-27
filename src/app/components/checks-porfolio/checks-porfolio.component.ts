import { Component, OnInit } from '@angular/core';
import { CheckViewType } from 'src/app/enums/checks.enum';

@Component({
  selector: 'app-checks-porfolio',
  templateUrl: './checks-porfolio.component.html',
  styleUrls: ['./checks-porfolio.component.css']
})
export class ChecksPorfolioComponent implements OnInit {

  viewType = CheckViewType.Pendings;
  constructor() { }

  ngOnInit(): void {
  }

}
