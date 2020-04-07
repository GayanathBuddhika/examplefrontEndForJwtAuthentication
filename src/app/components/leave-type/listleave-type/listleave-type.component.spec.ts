import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListleaveTypeComponent } from './listleave-type.component';

describe('ListleaveTypeComponent', () => {
  let component: ListleaveTypeComponent;
  let fixture: ComponentFixture<ListleaveTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListleaveTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListleaveTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
