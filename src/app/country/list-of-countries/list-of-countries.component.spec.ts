import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfCountriesComponent } from './list-of-countries.component';

describe('ListOfCountriesComponent', () => {
  let component: ListOfCountriesComponent;
  let fixture: ComponentFixture<ListOfCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfCountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
