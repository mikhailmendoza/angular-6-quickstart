import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { SharedUtils } from '../../shared/utils';
import * as _ from "lodash";

@Component({
  selector: 'my-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.css']
})
export class CountryEditComponent implements OnChanges {

  @Input() mdlEditRecord: boolean;
  @Input() selectedData: any;
  @Output() editRecord: EventEmitter<any> = new EventEmitter();
  @Output() exitModal: EventEmitter<any> = new EventEmitter();
  disableSave: boolean = true;
  countryName: string;
  capital: string;

  constructor(private sharedUtils: SharedUtils) { }


  ngOnChanges(simpleChanges: SimpleChanges) {
    if (this.selectedData) {
      this.countryName = this.selectedData.name;
      this.capital = this.selectedData.capital;
    }
  }

  editData() {
    let editCountry = { name: this.countryName, capital: this.capital };
    this.editRecord.emit(editCountry);
  }

  closeModal() {
    this.mdlEditRecord = false;
    this.exitModal.emit("edit");
  }

  validateInput() {
    if (!this.sharedUtils.isStringNullOrEmpty(this.countryName) && (!this.sharedUtils.isStringNullOrEmpty(this.capital))) {
      this.disableSave = false;
    } else {
      this.disableSave = true;
    }
  }
}



