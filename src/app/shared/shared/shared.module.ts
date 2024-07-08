import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { AgGridAngularComponent } from './ag-grid-angular/ag-grid-angular.component';
import { CustomCellComponent } from './custom-cell/custom-cell.component';
import { IconsModule } from '../icons/icons.module';
import { CustomProductCellComponent } from './custom-product-cell/custom-product-cell.component';
import { ProductListTablenameInputComponent } from './product-list-tablename-input/product-list-tablename-input.component';
import { ProductListTabledescriptionInputComponent } from './product-list-tabledescription-input/product-list-tabledescription-input.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AgGridAngularComponent,
    CustomCellComponent,
    CustomProductCellComponent,
    ProductListTablenameInputComponent,
    ProductListTabledescriptionInputComponent,
  ],
  imports: [
    CommonModule,
    AgGridModule,
    IconsModule,
    FormsModule
  ],
  exports:[
    AgGridAngularComponent,
  ]
})
export class SharedModule { }
