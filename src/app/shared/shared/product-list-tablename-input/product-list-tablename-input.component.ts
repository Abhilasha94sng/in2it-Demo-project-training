import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-product-list-tablename-input',
  templateUrl: './product-list-tablename-input.component.html',
  styleUrls: ['./product-list-tablename-input.component.css']
})
export class ProductListTablenameInputComponent implements OnInit, ICellRendererAngularComp {
params:any
  constructor() { }

  ngOnInit(): void {
  }
  agInit(params: any): void {
    this.params=params
    
    
  }

  refresh(params: ICellRendererParams<any, any>): boolean {
    this.params=params
    return true
  }


}
