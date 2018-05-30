import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidthsResponsiveComponent } from './widths-responsive.component';

describe('WidthsResponsiveComponent', () => {
  let component: WidthsResponsiveComponent;
  let fixture: ComponentFixture<WidthsResponsiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidthsResponsiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidthsResponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
