import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import * as _ from "lodash";


@Component({
  selector: 'my-country-add',
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.css'],

})
export class CountryAddComponent {
  @Input() countryList: any;
  @Input() mdlSampleIsOpen: boolean;
  @Output() addRecord: EventEmitter<any> = new EventEmitter();
  @Output() exitModal: EventEmitter<any> = new EventEmitter();
  message: string;
  name: string;
  capital: string;
  constructor() { }

  ngOnInit() {
  }

  addData() {
    if (this.name && this.capital) {
      let addCountry = { name: this.name, capital: this.capital };
      this.addRecord.emit(addCountry)
      this.name = '';
      this.capital = '';
    }
  }

  closeModal(){
    this.mdlSampleIsOpen=false; 
    this.exitModal.emit();
  }
  
}

