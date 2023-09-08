import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastEmployersComponent } from './last-employers.component';

describe('LastEmployersComponent', () => {
  let component: LastEmployersComponent;
  let fixture: ComponentFixture<LastEmployersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastEmployersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastEmployersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
