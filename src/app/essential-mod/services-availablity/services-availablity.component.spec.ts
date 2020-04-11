import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesAvailablityComponent } from './services-availablity.component';

describe('ServicesAvailablityComponent', () => {
  let component: ServicesAvailablityComponent;
  let fixture: ComponentFixture<ServicesAvailablityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesAvailablityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesAvailablityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
