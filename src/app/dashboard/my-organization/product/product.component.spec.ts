import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { MyorganizationServiceService } from '../myorganization-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let mockOrgService: Partial<MyorganizationServiceService>;
  beforeEach(async () => {
    mockOrgService = {
      getProducts: jasmine.createSpy().and.returnValue({
        subscribe: jasmine.createSpy().and.returnValue({
          data: [{ data: [ {
            "is_table_exist": true,
            "table_id": {
              "value": 821,
              "is_edit": false,
              "type": "integer"
            },
            "table_type": {
              "value": "is_standard",
              "is_edit": false,
              "type": "boolean"
            },
            "table_name": {
              "value": "Configuration Item",
              "is_edit": true,
              "type": "char"
            },
            "description": {
              "value": "Configuration Items",
              "is_edit": true,
              "type": "char"
            },
            "attribute_count": {
              "value": 7,
              "is_edit": false,
              "type": "integer"
            },
            "rows_count": {
              "value": 5,
              "is_edit": false,
              "type": "integer"
            },
            "created_on": {
              "value": "23/06/2023",
              "is_edit": false,
              "type": "datetime"
            },
            "created_by": {
              "value": "Shivank Tyagi",
              "is_edit": false,
              "type": "many2one"
            },
            "updated_on": {
              "value": "23/06/2023",
              "is_edit": false,
              "type": "datetime"
            },
            "updated_by": {
              "value": "Shivank Tyagi",
              "is_edit": false,
              "type": "many2one"
            },
            "is_standard": {
              "value": true,
              "is_edit": false,
              "type": "boolean"
            },
            "is_active": {
              "value": true,
              "is_edit": false,
              "type": "boolean"
            },
            "property": {
              "is_edit": true,
              "is_delete": true
            },
            "related_table": [
              {
                "id": 96,
                "name": "Users"
              },
              {
                "id": 96,
                "name": "Users"
              }
            ]
          }] }] 
        })
      })
    };
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent ],
      providers:[{ provide: MyorganizationServiceService, useValue: mockOrgService }],
      imports: [HttpClientTestingModule, NgbModule, RouterTestingModule],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
