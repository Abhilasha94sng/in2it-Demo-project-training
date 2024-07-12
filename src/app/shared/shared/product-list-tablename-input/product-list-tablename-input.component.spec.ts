import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListTablenameInputComponent } from './product-list-tablename-input.component';

describe('ProductListTablenameInputComponent', () => {
  let component: ProductListTablenameInputComponent;
  let fixture: ComponentFixture<ProductListTablenameInputComponent>;
  let mockParams:any
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListTablenameInputComponent ]
    })
    .compileComponents();
    mockParams = {
      data:   {
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
      }
    };
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListTablenameInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize parameters in agInit', () => {
    // Arrange
   

    // Act
    component.agInit(mockParams);

    // Assert
    expect(component.params).toEqual(mockParams);
  });

  it('should return true from refresh', () => {
    // Arrange


    // Act
    const result = component.refresh(mockParams);

    // Assert
    expect(result).toBeTrue();
  });
  it('should call ngOnInit()',()=>{
    component.ngOnInit()
  })
});
