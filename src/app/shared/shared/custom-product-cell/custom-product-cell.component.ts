import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-product-cell',
  templateUrl: './custom-product-cell.component.html',
  styleUrls: ['./custom-product-cell.component.css'],
})
export class CustomProductCellComponent implements OnInit {
  icons = [{ name: 'x-circle' }];
  params: any;
  isEditing: boolean = false;
  isAdd: boolean = false;
  isDelete: boolean = false;
  constructor() {}

  ngOnInit(): void {}
  agInit(params: any): void {
    this.params = params;
    this.isEditing = this.params.data.isEditing || false;
    this.isAdd = this.params.data.isAdd || false;
  }

  refresh(params: any): boolean {
    this.params = params;
    this.isEditing = this.params.data.isEditing || false;
    this.isAdd = this.params.data.isAdd || false;

    return true;
  }
  originalData: any;
  edit() {
    this.isEditing = true;
    this.params.data.isEditing = true;
    // this.originalData = { ...this.params.data };
    this.originalData = JSON.parse(JSON.stringify(this.params.data));
    this.params.context.parentComponent.edit(this.params.data.table_id.value);
  }
  save() {
    delete this.params.data.is_add
    this.params.context.parentComponent.save(this.params.data.table_id.value);
    let editedData = this.params.data;
    this.isEditing = false;
    this.params.data.isEditing = false;
    localStorage.setItem('editedData', JSON.stringify(editedData));
  }
  delete() {
    this.params.context.parentComponent.delete(this.params.data);
    this.isDelete = true;
  }
  cancel() {
    if ((this.params.data?.is_add)) {      
      this.params.data.is_add = undefined;
      this.isEditing = false;
      this.params.context.parentComponent.deleteAddedData(this.params.data)
    }else if(this.params.data?.is_add === undefined){
         this.isEditing = false;
      Object.assign(this.params.data, this.originalData);
      this.params.context.parentComponent.cancel(
        this.params.data.table_id.value
      );
    }
  }
}
