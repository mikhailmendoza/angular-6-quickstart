import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MockDataCountryList } from '../mock-data/country-list';
import * as _ from "lodash";
import { CountryModel } from '../country-model/country';
import { CountryService } from '../country-service/country.service';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SharedUtils } from '../../shared/utils';

import {
  animate,
  keyframes,
  query,
  stagger,
  style,
  transition,
  trigger
} from '@angular/animations';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';

@Component({
  selector: 'my-country-main',
  templateUrl: './country-main.component.html',
  styleUrls: ['./country-main.component.css']
})
export class CountryMainComponent implements OnInit {
  countryList: CountryModel[];
  tempCountryList: CountryModel[];
  addCountry = false;
  countryModel: CountryModel = new CountryModel;
  mdlAddRecord = false;
  showSpinner = true;
  title = "Country & Capital List";
  selectedData: any;
  editCountry = true;
  deleteCountry = true;
  mdlEditRecord = false;
  modalTitle: string;
  modalBody: string;
  mode: string;
  showModal = false;
  newObj: any;

  constructor(private countryService: CountryService, private sharedUtils: SharedUtils) { }

  ngOnInit() {
    this.initializeData();
  }

  /*TODO create modal for confirmation during saving edit and  delete */

  initializeData(): void {
    if (_.isEmpty(this.countryList)) {
      this.getCountryList();
    }
    this.tempCountryList = this.countryList;
  }

  getCountryList(): void {
    this.enableSpinner()
    this.countryService.getCountries().subscribe((res: CountryModel[]) => {
      this.countryList = res;
      this.hideSpinner();
    });
  }

  addRecord(value) {
    this.newObj = value;
    this.mode = 'add';
    this.confirmModal();
  }

  editRecord(value) {
    this.newObj = value;
    this.mode = 'edit';
    this.confirmModal();
  }

  deleteRecord() {
    this.mode = 'delete';
    this.confirmModal();
  }

  saveRecord() {
    if (!_.find(this.countryList, { name: this.newObj.name })) {
      this.countryList.push(this.newObj);
    }
    this.tempCountryList = this.countryList;
    this.exitModal("add");
  }

  updateRecord() {
    let updateObj = _.find(this.countryList, this.selectedData)
    if (updateObj) {
      updateObj.name = this.newObj.name;
      updateObj.capital = this.newObj.capital;
    }
    this.exitModal("edit");
  }

  addCountryCapital() {
    this.mdlAddRecord = true;
    this.addCountry = (this.addCountry) ? false : true;
  }

  editCountryCapital() {
    this.mdlEditRecord = true;
  }

  proceedTransaction() {
    this.enableSpinner()
    switch (this.mode) {
      case "delete":
        this.deleteRecordFromArray();
        break;
      case "add":
        this.saveRecord();
        break;
      case "edit":
        this.updateRecord();
        break;

      default:
        break;
    }
    this.hideSpinner();
    this.exitSharedModal();
  }

  exitSharedModal() {
    this.showModal = false;
    // this.exitModal(this.mode);
  }

  deleteRecordFromArray() {
    this.countryList = _.reject(this.countryList, this.selectedData);
  }

  confirmModal() {
    this.showModal = true;
    switch (this.mode) {
      case 'add':
        this.modalTitle = 'Add Record';
        this.modalBody = 'Are you sure you want to Add a record?';
        break;
      case 'edit':
        this.modalTitle = 'Edit Record';
        this.modalBody = 'Are you sure you want to Update the Record?';
        break;
      case 'delete':
        this.modalTitle = 'Delete Record';
        this.modalBody = 'Are you sure you want to Delete the Record?';
        break;
      default:
        break;
    }
  }

  exitModal(mode) {
    switch (mode) {
      case "add":
        this.mdlAddRecord = false;
        this.addCountry = false;
        break;
      case "edit":
        this.mdlEditRecord = false;
        this.editCountry = false;
        break;
    }
  }

  searchResult(result) {
    if (!_.isEmpty(result)) {
      this.countryList = result;
    } else {
      this.countryList = this.tempCountryList;
    }
  }

  selectRecord(value) {
    this.selectedData = value;
    let flag = (this.selectedData) ? false : true;
    this.enableDisableEditDeleteBtn(flag)
  }

  enableDisableEditDeleteBtn(flag) {
    this.editCountry = flag;
    this.deleteCountry = flag;
  }

  enableSpinner() {
    this.showSpinner = true;
  }

  hideSpinner() {
    setTimeout(() => {
      this.showSpinner = false;
    }, 1000);
  }

}
