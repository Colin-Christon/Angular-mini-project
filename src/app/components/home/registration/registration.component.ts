import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent implements OnInit {
    registerForm:FormGroup;
    configData:FormGroup;
    fields ;
    buttonDisabled = false;
    apiUrl = "http://localhost:3000/data"

    constructor(
      private fb:FormBuilder,
      private service:SharedServiceService,
      private http:HttpClient,
      private router:Router
    ){
  
      this.registerForm = this.fb.group({});
      this.configData = this.service.getConfiguration();
      this.fields = JSON.parse(JSON.stringify(this.service.getConfigElementOrder()));
      this.createRegistrationFormControls();
    }

    ngOnInit(): void {
      this.applyConfig()
    }

    private createRegistrationFormControls() {
      this.fields.forEach( (field: { label: any; })  => {
        this.registerForm.addControl(field.label, this.fb.control(''));
      });
    }

    applyConfig() {

      for(let field of this.fields){
        this.updateFieldValidator(
          field.label,
          this.configData.get(field.show)?.value,
          this.configData.get(field.required)?.value,
          field.label === 'mobile' ? Validators.pattern("^(\\s*|\\s*((\\+91-?)|0)?[0-9]{10}\\s*$)") :
          field.label === 'email' ? Validators.email :
          field.label === 'name'? Validators.pattern("^(\\s*|\\s*[a-zA-z]*)"):
          null
        );
      }
    }

    noOnlySpacesValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
      if (control.value?.trim().length === 0 && control.value.length > 0) {
        return { onlySpaces: true };
      }
      return null;
    };
    
    updateFieldValidator(field: string, isVisible: boolean, isRequired: boolean, extraValidator: any = null) {
      if (isVisible) {
        const validators = isRequired
      ? [Validators.required, this.noOnlySpacesValidator] // For required fields
      : [];
        if (extraValidator) validators.push(extraValidator);
        this.registerForm.get(field)?.setValidators(validators);
      } else {
        if (extraValidator){
          this.registerForm.get(field)?.setValidators([extraValidator])
        } 
        else{ 
          this.registerForm.get(field)?.setValidators([]);
        }
      }
      this.registerForm.get(field)?.updateValueAndValidity();
    }

    async registerUser(){
      console.log(this.isFormEmpty(),this.registerForm.invalid);
      if(this.registerForm.invalid || this.isFormEmpty()){
        this.buttonDisabled = true
        console.log('this is working');
      }
      else{
        this.http.post(this.apiUrl,this.registerForm.value).subscribe(
          res =>{
            console.log("response",res);
          }
        );
      this.router.navigate(['/success'])
      }
    }

    public isFormEmpty(): boolean {
      const values = this.registerForm.value;
      return Object.values(values).every(value => !value || value.toString().trim() === '');
    }
}
