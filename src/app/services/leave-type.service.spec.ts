import { TestBed } from '@angular/core/testing';

import { LeaveTypeService } from './leave-type.service';

describe('LeaveTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeaveTypeService = TestBed.get(LeaveTypeService);
    expect(service).toBeTruthy();
  });
});
