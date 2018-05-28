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
    this.enableSpinner()
    if (!_.some(this.countryList, { value }) || !_.some(this.tempCountryList, { value })) {
      this.countryList.push(value);
    }
    this.tempCountryList = this.countryList;
    this.exitModal("add");
    this.hideSpinner();
  }

  editRecord(value) {
    this.enableSpinner()
    let updateObj = _.find(this.countryList, this.selectedData)
    if (updateObj) {
      updateObj.name = value.name;
      updateObj.capital = value.capital;
    }
    this.exitModal("edit");
    this.hideSpinner();
  }

  deleteRecord(value) {
    this.enableSpinner()
    this.countryList = _.reject(this.countryList, this.selectedData);
    this.hideSpinner();
  }

  addCountryCapital() {
    this.mdlAddRecord = true;
    this.addCountry = (this.addCountry) ? false : true;
  }

  editCountryCapital() {
    this.mdlEditRecord = true;
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
