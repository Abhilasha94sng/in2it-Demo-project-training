import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-product-list-tabledescription-input',
  templateUrl: './product-list-tabledescription-input.component.html',
  styleUrls: ['./product-list-tabledescription-input.component.css']
})
export class ProductListTabledescriptionInputComponent implements OnInit, ICellRendererAngularComp {
params:any
  constructor() { }

  ngOnInit(): void {
  }
  agInit(params: ICellRendererParams<any, any>): void {
    this.params=params
    
  }
  refresh(_params: ICellRendererParams<any, any>): boolean {
    // this.params=params
    return true
  }

}
