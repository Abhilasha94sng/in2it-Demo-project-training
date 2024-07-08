import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCellComponent } from './custom-cell.component';

describe('CustomCellComponent', () => {
  let component: CustomCellComponent;
  let fixture: ComponentFixture<CustomCellComponent>;
  let mockParentComponent: any;
  beforeEach(async () => {
    mockParentComponent = {
      edit: jasmine.createSpy('edit'),
      delete: jasmine.createSpy('delete'),
      add:jasmine.createSpy('add'),
      openCard: jasmine.createSpy('openCard'),
      openNameCard: jasmine.createSpy('openNameCard')
    };

    await TestBed.configureTestingModule({
      declarations: [ CustomCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCellComponent);
    component = fixture.componentInstance;
    component.params = {
      context: {
        parentComponent: mockParentComponent
      },
      data: { id: 1, name: 'test' }
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize params and fieldName', () => {
    const params = { colDef: { field: 'testField' } };

    component.agInit(params);

    expect(component.params).toEqual(params);
    expect(component.fieldName).toBe('testField');
  });
  it('should refresh params and return true', () => {
    const params = { someKey: 'someValue' };

    const result = component.refresh(params);

    expect(component.params).toEqual(params);
    expect(result).toBe(true);
  });
  it('should call parentComponent.edit with the correct data', () => {
    component.edit();
    expect(mockParentComponent.edit).toHaveBeenCalledWith({ id: 1, name: 'test' });
  });

  it('should call parentComponent.delete with the correct data', () => {
    component.delete();
    expect(mockParentComponent.delete).toHaveBeenCalledWith({ id: 1, name: 'test' });
  });
  it('should call parentComponent.add with the correct data', ()=>{
    component.openewTab();
    expect(mockParentComponent.add).toHaveBeenCalledWith({ id: 1, name: 'test' })
  })
  it('should call parentComponent.openCard with the correct data ', ()=>{
    component.openCard()
    expect(mockParentComponent.openCard).toHaveBeenCalledWith({id:1, name:'test'})
  })
  it('should call parentComponent.add with the correct data and id when fieldName is organizationName', ()=>{
    component.fieldName = 'organizationName'
    component.cellActions()
    expect(mockParentComponent.add).toHaveBeenCalledWith(component.params.data,component.params.data.id)
  });
  it('should call parentComponent.openNameCard with the correct data and id when fieldName is name', ()=>{
    component.fieldName = 'name'
    component.cellActions()
    expect(mockParentComponent.openNameCard).toHaveBeenCalledWith(component.params.data.contactIndex, component.params.data)
  })
});
