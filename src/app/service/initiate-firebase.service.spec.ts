import { TestBed } from '@angular/core/testing';

import { InitiateFirebaseService } from './initiate-firebase.service';

describe('InitiateFirebaseService', () => {
  let service: InitiateFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitiateFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
