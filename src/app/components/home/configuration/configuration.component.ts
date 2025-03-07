import {  Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DragTargetDragEndEvent, DragTargetDragEvent, DropTargetEvent } from '@progress/kendo-angular-utils/drag-and-drop/events';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import '@angular/localize/init';


@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
    configForm : FormGroup
    fields : any[]
    validConfiguration : boolean = true;
  
    constructor(
      private router:Router,
      private service : SharedServiceService
    ) {
        this.configForm = this.service.getConfiguration()   
        this.fields = JSON.parse(JSON.stringify(this.service.getConfigElementOrder())); 
     }

    ngOnInit():void{
      for(let field of this.fields){
        if(!this.configForm.get(field.show)?.value){
          this.configForm.get(field.required)?.disable();
        }
        this.configForm.get(field.show)?.valueChanges.subscribe(value => {
          if (value) {
            this.configForm.get(field.required)?.enable();
          } else {
            // this.configForm.get('requiredName')?.setValue(false);
            this.configForm.get(field.required)?.disable();
          }
        });
      }
    }

    dragData = ({ dragTarget }: any) => {
      return Number(dragTarget.getAttribute("data-index"));
    };

    onPointerMove(e:PointerEvent):void{
      e.target instanceof HTMLElement && (e.target.style.cursor = "pointer");
    }

    onDrag(e:DragTargetDragEvent):void{
      e.dragTarget.style.transition = "background-color 0.3s ease-in-out";
      e.dragTarget.style.background = "rgb(226, 219, 219)";
    }

    onDragEnd(e: DragTargetDragEndEvent):void{
      e.dragTarget.style.background="white";
    }

    onDrop(e: DropTargetEvent): void {
      const fromIndex = e.dragData;
      const toIndex = Number(e.dropTarget.getAttribute("data-index"));
    
      if (fromIndex === toIndex) {  
        e.dropTarget.style.background="white";
        return; 
      }
      const movedItem = this.fields[fromIndex];
      this.fields.splice(fromIndex, 1); 
      this.fields.splice(toIndex, 0, movedItem);

      // e.dragTarget.style.background = "white"; 
    }

    saveConfiguration(){
      let count = 0; 
      this.fields.forEach(element=>{
        if(!this.configForm.get(element.show)?.value){
          count= count+1;
        }
      })

      if(count==this.fields.length){
        this.validConfiguration = false
      }
      else{

        this.service.setConfiguration(this.configForm)
        this.service.setConfigElementOrder(this.fields)
        this.router.navigate(['/home/register']);
      }
      
    }
}
