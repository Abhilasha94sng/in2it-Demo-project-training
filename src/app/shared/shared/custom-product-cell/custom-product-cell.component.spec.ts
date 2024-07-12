import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomProductCellComponent } from './custom-product-cell.component';

describe('CustonProductCellComponent', () => {
  let component: CustomProductCellComponent;
  let fixture: ComponentFixture<CustomProductCellComponent>;
  let mockParentComponent : any

  beforeEach(async () => {
    mockParentComponent = {
      edit: jasmine.createSpy('edit'),
      save: jasmine.createSpy('save'),
      delete: jasmine.createSpy('delete'),
      deleteAddedData: jasmine.createSpy('deleteAddedData'),
      cancel: jasmine.createSpy('cancel')
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
      data: { isEditing: false, isAdd: true, someOtherField: 'value', table_id: { value: 123 },
     }
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

  it('should call parentComponent.save and update localStorage when save is called', () => {
    spyOn(localStorage, 'setItem');
    component.save();
    expect(component.params.data.is_add).toBeUndefined();
    expect(mockParentComponent.save).toHaveBeenCalledWith(123);
    expect(component.isEditing).toBe(false);
    expect(component.params.data.isEditing).toBe(false);
    expect(localStorage.setItem).toHaveBeenCalledWith('editedData', JSON.stringify(component.params.data));
  });

  it('should call parentComponent.delete and set isDelete to true when delete is called', () => {
    component.delete();
    expect(mockParentComponent.delete).toHaveBeenCalledWith(component.params.data);
    expect(component.isDelete).toBe(true);
  });
  it('should call parentComponent.deleteAddedData and reset is_add when cancel is called and is_add is true', () => {
    component.params.data.is_add = true;
    component.cancel();
    expect(component.params.data.is_add).toBeUndefined();
    expect(component.isEditing).toBe(false);
    expect(mockParentComponent.deleteAddedData).toHaveBeenCalledWith(component.params.data);
  });
  
  // it('should call parentComponent.cancel and reset data when cancel is called and is_add is undefined', () => {
  //   component.params.data.is_add = undefined;
  //   component.originalData = { someOtherField: 'originalValue', table_id: { value: 123 } };
  //   component.cancel();
  //   expect(component.isEditing).toBe(false);
  //   expect(component.params.data).toEqual(component.originalData);
  //   expect(mockParentComponent.cancel).toHaveBeenCalledWith(123);
  // });
});
