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

  it('should create form controls based on configOrder', () => {
    const controls = service.formData.controls;
    expect(controls['showName']).toBeTruthy();
    expect(controls['requiredName']).toBeTruthy();
    expect(controls['showMobile']).toBeTruthy();
    expect(controls['requiredMobile']).toBeTruthy();
  });

  it('should return a configuration form group', () => {
    const configForm = service.getConfiguration();
    expect(configForm instanceof FormGroup).toBeTrue();
    expect(configForm.get('showName')).toBeTruthy();
    expect(configForm.get('requiredName')).toBeTruthy();
  });

  it('should set configuration form data', () => {
    const newForm = formBuilder.group({
      showName: false,
      requiredName: true
    });
    service.setConfiguration(newForm);
    expect(service.formData.get('showName')?.value).toBeFalse();
    expect(service.formData.get('requiredName')?.value).toBeTrue();
  });

  it('should set and get config element order', () => {
    const newOrder = [
      { label: 'test', show: 'showTest', required: 'requiredTest' }
    ];
    service.setConfigElementOrder(newOrder);
    expect(service.getConfigElementOrder()).toEqual(newOrder);
  });
});

