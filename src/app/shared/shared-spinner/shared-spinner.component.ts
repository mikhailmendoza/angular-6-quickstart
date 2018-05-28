import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'my-shared-spinner',
  templateUrl: './shared-spinner.component.html',
  styleUrls: ['./shared-spinner.component.css']
})
export class SharedSpinnerComponent implements OnInit ,OnChanges {
  @Input() showSpinner:boolean;

  constructor() { }

  ngOnChanges(){
    this.showSpinner= (!this.showSpinner) ? true:false;
  }

  ngOnInit() {
  }

}
