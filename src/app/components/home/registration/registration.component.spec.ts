import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { AppModule } from 'src/app/app.module';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { HttpClientModule } from '@angular/common/http';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let service: SharedServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule,AppModule],
      providers: [FormBuilder, SharedServiceService]
    }).compileComponents();

    service = TestBed.inject(SharedServiceService);
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty controls', () => {
    expect(component.registerForm).toBeDefined();
    expect(Object.keys(component.registerForm.controls).length).toBeGreaterThan(0);
  });

  it('should mark button as disabled if form is empty', () => {
    const isEmpty = component.isFormEmpty();
    expect(isEmpty).toBeTrue();
    expect(component.buttonDisabled).toBeFalse();
    component.registerUser();
    expect(component.buttonDisabled).toBeTrue();
  });

  it('should not post if form is invalid', () => {
    spyOn(component['http'], 'post').and.returnValue(of({}));
    component.registerForm.patchValue({ name: '   ' }); // only spaces
    component.registerUser();
    expect(component['http'].post).not.toHaveBeenCalled();
  });

  it('should post data if form is valid', () => {
    spyOn(component['http'], 'post').and.returnValue(of({}));
    component.registerForm.patchValue({ name: 'John Doe', mobile: '9876543210', email: 'john@example.com' });
    component.registerUser();
    expect(component['http'].post).toHaveBeenCalled();
  });

  it('should validate noOnlySpacesValidator', () => {
    const control = component.registerForm.get('name');
    control?.setValue('   ');
    const errors = component.noOnlySpacesValidator(control!);
    expect(errors).toEqual({ onlySpaces: true });
  });

  it('should navigate to success on successful registration', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    spyOn(component['http'], 'post').and.returnValue(of({}));
    component.registerForm.patchValue({ name: 'John Doe', mobile: '9876543210', email: 'john@example.com' });
    component.registerUser();
    expect(routerSpy).toHaveBeenCalledWith(['/success']);
  });
});
