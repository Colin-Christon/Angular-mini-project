import {  Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    configForm! : FormGroup
    fields : any[] = []
    validConfiguration : boolean = true;
  
    constructor(
      private router:Router,
      private service : SharedServiceService,
      private fb : FormBuilder
    ) { }

    ngOnInit():void{ 
      this.fields = this.service.getConfigElementOrder()  
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
      const movedItem = this.fields[fromIndex];
      this.fields.splice(fromIndex, 1); 
      this.fields.splice(toIndex, 0, movedItem);
    }

    isConfigurationInvalid():boolean{
      let count = 0;
      this.fields.forEach(element=>{
        if(!element.show){
          count+=1;
        }
      })
      return count==this.fields.length;
    }

    saveConfiguration(){
      if(this.isConfigurationInvalid()){
        this.validConfiguration = false;
      }
      else{
        alert("Configuration saved successfully");
        this.service.setConfigElementOrder(this.fields)
        this.router.navigate(['/register']);
      }  
    }
}
