import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeplfulLinksComponent } from './heplful-links.component';

describe('HeplfulLinksComponent', () => {
  let component: HeplfulLinksComponent;
  let fixture: ComponentFixture<HeplfulLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeplfulLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeplfulLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
