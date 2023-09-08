import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplierRegistrationComponent } from './applier-registration.component';

describe('ApplierRegistrationComponent', () => {
  let component: ApplierRegistrationComponent;
  let fixture: ComponentFixture<ApplierRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplierRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplierRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
