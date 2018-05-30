import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacingResponsiveComponent } from './spacing-responsive.component';

describe('SpacingResponsiveComponent', () => {
  let component: SpacingResponsiveComponent;
  let fixture: ComponentFixture<SpacingResponsiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpacingResponsiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacingResponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
