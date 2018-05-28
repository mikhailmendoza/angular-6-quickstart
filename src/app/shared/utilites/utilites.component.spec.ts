import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilitesComponent } from './utilites.component';

describe('UtilitesComponent', () => {
  let component: UtilitesComponent;
  let fixture: ComponentFixture<UtilitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
