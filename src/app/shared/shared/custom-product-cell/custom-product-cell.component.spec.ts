import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomProductCellComponent } from './custom-product-cell.component';

describe('CustonProductCellComponent', () => {
  let component: CustomProductCellComponent;
  let fixture: ComponentFixture<CustomProductCellComponent>;
  let mockParentComponent : any

  beforeEach(async () => {
    mockParentComponent = {
      edit: jasmine.createSpy('edit')
    }
    await TestBed.configureTestingModule({
      declarations: [ CustomProductCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
 
    fixture = TestBed.createComponent(CustomProductCellComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    component.params = {
      context: {
        parentComponent: mockParentComponent
      },
      data: { isEditing: false, isAdd: true, someOtherField: 'value', table_id: { value: 123 } }
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize params', ()=>{
    const params = {colDef: {field: 'testField'},  data: { isEditing: true, isAdd: true }}
    component.agInit(params)
    expect(component.params).toEqual(params)
    expect(component.isEditing).toBe(true)
    expect(component.isAdd).toBe(true)
  })
  it('should refresh params and return true', ()=>{
    const params = {
      colDef: { field: 'testField' },
      data: { isEditing: true, isAdd: true }
    };

    const result = component.refresh(params);

    expect(component.params).toEqual(params);
    expect(component.isEditing).toBe(true);
    expect(component.isAdd).toBe(true);
    expect(result).toBe(true);
  })
  it('should call parentComponent.edit with correct data', () => {
    component.edit();
    expect(component.isEditing).toBe(true);
    expect(component.params.data.isEditing).toBe(true);
    expect(component.originalData).toEqual(component.params.data);
    expect(mockParentComponent.edit).toHaveBeenCalledWith(123);
  });
  
});
