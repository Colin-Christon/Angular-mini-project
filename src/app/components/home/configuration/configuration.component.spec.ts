import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationComponent } from './configuration.component';
import { AppModule } from 'src/app/app.module';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/services/shared-service.service';

describe('ConfigurationComponent', () => {
  let component: ConfigurationComponent;
  let fixture: ComponentFixture<ConfigurationComponent>;
  let mockService: jasmine.SpyObj<SharedServiceService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockService = jasmine.createSpyObj('SharedServiceService', ['getConfiguration', 'getConfigElementOrder', 'setConfiguration', 'setConfigElementOrder']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    mockService.getConfiguration.and.returnValue(new FormBuilder().group({
      showName: [true],
      requiredName: [false]
    }));
    mockService.getConfigElementOrder.and.returnValue([
      { label: 'name', show: 'showName', required: 'requiredName' }
    ]);

    TestBed.configureTestingModule({
      declarations: [ConfigurationComponent],
      providers: [
        { provide: SharedServiceService, useValue: mockService },
        { provide: Router, useValue: mockRouter }
      ],
      imports: [ReactiveFormsModule,AppModule]
    });

    fixture = TestBed.createComponent(ConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable required field if show field is false', () => {
    component.configForm.get('showName')?.setValue(false);
    expect(component.configForm.get('requiredName')?.disabled).toBeTrue();
  });

  it('should enable required field if show field is true', () => {
    component.configForm.get('showName')?.setValue(true);
    expect(component.configForm.get('requiredName')?.enabled).toBeTrue();
  });

  it('should call setConfiguration and setConfigElementOrder on valid save', () => {
    component.saveConfiguration();
    expect(mockService.setConfiguration).toHaveBeenCalledWith(component.configForm);
    expect(mockService.setConfigElementOrder).toHaveBeenCalledWith(component.fields);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home/register']);
  });

  it('should not save configuration if all fields are hidden', () => {
    component.fields.forEach(field => component.configForm.get(field.show)?.setValue(false));
    component.saveConfiguration();
    expect(component.validConfiguration).toBeFalse();
    expect(mockService.setConfiguration).not.toHaveBeenCalled();
  });
});
