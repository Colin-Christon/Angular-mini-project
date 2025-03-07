import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  formData : FormGroup;
  private configOrder = [
    {label:'name', show:'showName', required:'requiredName'},
    {label:'mobile', show:'showMobile', required:'requiredMobile'},
    {label:'email', show:'showEmail', required:'requiredEmail'},
    {label:'address', show:'showAddress', required:'requiredAddress'},
    // {label:'name2', show:'showName2', required:'requiredName2'},
  ]
  
  constructor(private fb:FormBuilder) {
      this.formData = this.fb.group({});
      this.createFormControls();
  }

  private createFormControls() {
    this.configOrder.forEach(config => {
      this.formData.addControl(config.show, this.fb.control(true));
      this.formData.addControl(config.required, this.fb.control({ value: false, disabled: false }));
    });
  }

  getConfiguration():FormGroup{
    return this.fb.group(this.formData.getRawValue())
  }

  setConfiguration(form:FormGroup){
    this.formData = form;
  }

  setConfigElementOrder(configElementOrder: any){
    this.configOrder = configElementOrder;
  }

  getConfigElementOrder(){
    return this.configOrder;
  }
}
