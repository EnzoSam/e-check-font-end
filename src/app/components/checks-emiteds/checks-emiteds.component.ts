import { Component, OnInit } from '@angular/core';
import { CheckViewType } from 'src/app/enums/checks.enum';

@Component({
  selector: 'app-checks-emiteds',
  templateUrl: './checks-emiteds.component.html',
  styleUrls: ['./checks-emiteds.component.css']
})
export class ChecksEmitedsComponent implements OnInit {

  viewType = CheckViewType.Emmited;
  constructor() { }

  ngOnInit(): void {
  }

}
