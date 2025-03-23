import { TestBed } from '@angular/core/testing';

import { SharedServiceService } from './shared-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';

describe('SharedServiceService', () => {
  let service: SharedServiceService;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormBuilder]
    });
    formBuilder = TestBed.inject(FormBuilder);
    service = TestBed.inject(SharedServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
