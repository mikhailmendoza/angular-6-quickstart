import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-country-search',
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.css']
})
export class CountrySearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  filterMode(){
    // this.globalSearchFunction();
  }

}
