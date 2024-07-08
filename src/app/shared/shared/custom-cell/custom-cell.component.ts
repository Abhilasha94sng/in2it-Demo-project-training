import { Component, OnInit } from '@angular/core';
// import { MyTaskComponent } from 'src/app/dashboard/my-menu/my-task/my-task.component';
import { ICellRendererAngularComp } from 'ag-grid-angular';
@Component({
  selector: 'app-custom-cell',
  templateUrl: './custom-cell.component.html',
  styleUrls: ['./custom-cell.component.css']
})
export class CustomCellComponent implements OnInit, ICellRendererAngularComp {
  icons = [{ name: 'edit' }, { name: 'trash2' }];
  fieldName: any
  orgNames:any
  constructor() { }

  ngOnInit(): void {
  }
  params: any;

  agInit(params: any): void {
    this.params = params;
    this.fieldName=params.colDef.field
  }

  refresh(params: any): boolean {
    this.params = params;

    return true;
  }

  // onActionClick(action: string) {
  //   console.log(this.params);
    
  //   this.myTaskComponent.EditGrid({
  //     action: action,
  //     data: this.params.data
  //   });
  // }
  edit() {
    this.params.context.parentComponent.edit(this.params.data);
  }

  delete() {
    this.params.context.parentComponent.delete(this.params.data);
  }
  openewTab(){
    this.params.context.parentComponent.add(this.params.data)
  }
  openCard(){
    this.params.context.parentComponent.openCard(this.params.data)
  }
  cellActions(){
     if(this.fieldName=='organizationName'){
      this.params.context.parentComponent.add(this.params.data,this.params.data.id)
     }else if(this.fieldName=='name'){
      this.params.context.parentComponent.openNameCard(this.params.data.contactIndex,this.params.data)
     }  
    
    
  }
}
