import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterComponentComponent } from './cluster-component.component';

describe('ClusterComponentComponent', () => {
  let component: ClusterComponentComponent;
  let fixture: ComponentFixture<ClusterComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusterComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
