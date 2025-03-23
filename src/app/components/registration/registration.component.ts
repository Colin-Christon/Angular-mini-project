import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent implements OnInit {
    registerForm!:FormGroup;
    fields:any[] = [];
    buttonDisabled = false;
    
    constructor(
      private fb:FormBuilder,
      private service:SharedServiceService,
      private router:Router
    ){}

    ngOnInit(): void {
      this.fields = this.service.getConfigElementOrder();
      this.createRegistrationFormControls();
    }

    private createRegistrationFormControls(): void {
      this.registerForm = this.fb.group({});
      this.fields.forEach(field => {
        const validations = [];
        if (field.required) {
          validations.push(Validators.required);
          validations.push(Validators.pattern(/^(?!\s*$).+/));
        }
        if (field.pattern) {
          validations.push(Validators.pattern(field.pattern));
        }
        this.registerForm.addControl(field.label, this.fb.control('', validations));
      })
    }

    formatMobileNumber(event: any): void {
      let value = event.target.value.replace(/\s/g, '');
      if (value.length > 2) {
        value = value.substring(0, 2) + ' ' + value.substring(2); 
      }
      event.target.value = value;
    }

    onSubmitRegisterationForm(){
        if(this.registerForm.invalid || this.isFormEmpty()){
          this.buttonDisabled = true
          console.log(this.registerForm.invalid);
        }
        else{
          this.service.registerUser(this.registerForm.value).subscribe({
            next: (res) => {
              console.log('response', res);
              this.router.navigate(['/success']);
            },
            error: (err) => {
              console.error('Error:', err);
            }
          });
          this.buttonDisabled = false;
        }
      }

    public isFormEmpty(): boolean {
      const values = this.registerForm.value;
      return Object.values(values).every(value => !value || value.toString().trim() === '');
    }
}
