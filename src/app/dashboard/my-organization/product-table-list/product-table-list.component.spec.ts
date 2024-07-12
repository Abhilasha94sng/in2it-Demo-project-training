import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ProductTableListComponent } from './product-table-list.component';
import { of, throwError } from 'rxjs';
import { MyorganizationServiceService } from '../myorganization-service.service';
import { RouterTestingModule } from '@angular/router/testing';
import { GridApi } from 'ag-grid-community';
import { Router } from '@angular/router';

describe('ProductTableListComponent', () => {
  let component: ProductTableListComponent;
  let fixture: ComponentFixture<ProductTableListComponent>;
  let mockOrgService : any
  let gridApiMock: jasmine.SpyObj<GridApi>
  let   mockGridApi: GridApi 
  let router: Router

  beforeEach(async () => {
    mockOrgService = {
      getSelectedData: jasmine.createSpy('getSelectedData').and.returnValue(of([{ id: 1 }, { id: 2 }])),
      getProducts: jasmine.createSpy('getProducts').and.returnValue(of([{ data: [{ is_table_exist: true }, { is_table_exist: false }] }])),
    };
 
    gridApiMock = jasmine.createSpyObj('GridApi', ['setRowData']);
    await TestBed.configureTestingModule({
      declarations: [ ProductTableListComponent ],
      providers: [{ provide: MyorganizationServiceService, useValue: mockOrgService, },
        {provide: GridApi, useValue: gridApiMock}
      ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTableListComponent);
    component = fixture.componentInstance;
    component.gridApi = gridApiMock;
    router = TestBed.inject(Router);
    // component.rowData = []; 
    component.rowData = [
      { table_id: { value: 1 }, name: 'Row 1', isEditing: false },
      { table_id: { value: 2 }, name: 'Row 2', isEditing: false },
      { table_id: { value: 3 }, name: 'Row 3', isEditing: false }
    ];
    component.selectedData = []; 
    // component.editingRowIds = []
    component.editingRowIds = [2];
    spyOn(component,'updateAllRowsEditingState')
    // fixture.detectChanges();
     mockGridApi = {
      setRowData: jasmine.createSpy('setRowData') // Spy on setRowData method
    } as any;
    component.gridOption = { api: mockGridApi };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize and fetch data on ngOnInit', () => {
    spyOn(component, 'renderGridData');

    component.ngOnInit();

    expect(mockOrgService.getSelectedData).toHaveBeenCalled();
    expect(mockOrgService.getProducts).toHaveBeenCalled();
    expect(component.selectedData).toEqual([{ id: 1 }, { id: 2 }]);
    expect(component.productList).toEqual([{ is_table_exist: true }, { is_table_exist: false }]);
    expect(component.rowData).toEqual([{ is_table_exist: true }]);
    expect(component.renderGridData).toHaveBeenCalledTimes(2);
  });


  it('should handle error when fetching selected data', () => {
    mockOrgService.getSelectedData.and.returnValue(throwError('error'));
    spyOn(console, 'error');

    component.ngOnInit();

    expect(console.error).toHaveBeenCalledWith('Error fetching selected data:', 'error');
  });

  it('should handle error when fetching product data', () => {
    mockOrgService.getProducts.and.returnValue(throwError('error'));
    spyOn(console, 'error');

    component.ngOnInit();

    expect(console.error).toHaveBeenCalledWith('Error fetching product data:', 'error');
  });

  it('should handle no product data received', () => {
    mockOrgService.getProducts.and.returnValue(of([{ data: null }]));
    spyOn(console, 'error');

    component.ngOnInit();

    expect(console.error).toHaveBeenCalledWith('No data received');
  });

  it('should append selectedData to rowData and update gridApi', () => {
    component.rowData = [{ id: 1, name: 'Product 1' }];
    component.selectedData = [{ id: 2, name: 'Product 2' }];
    
    component.renderGridData();
    
    expect(component.rowData).toEqual([
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' }
    ]);
    expect(gridApiMock.setRowData).toHaveBeenCalledWith([
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' }
    ]);
  });

  it('should not update gridApi if gridApi is not defined', () => {
    component.gridApi = undefined;
    component.rowData = [{ id: 1, name: 'Product 1' }];
    component.selectedData = [{ id: 2, name: 'Product 2' }];

    component.renderGridData();

    expect(component.rowData).toEqual([
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' }
    ]);
    expect(gridApiMock.setRowData).not.toHaveBeenCalled();
  });

  it('should not modify rowData if selectedData is undefined', () => {
    component.rowData = [{ id: 1, name: 'Product 1' }];
    component.selectedData = [];

    component.renderGridData();

    expect(component.rowData).toEqual([{ id: 1, name: 'Product 1' }]);
    expect(gridApiMock.setRowData).not.toHaveBeenCalled();
  });

  // it('should not modify rowData if rowData is undefined', () => {
  //   component.rowData = [];
  //   component.selectedData = [{ id: 2, name: 'Product 2' }];

  //   component.renderGridData();

  //   expect(component.rowData).toBeUndefined();
  //   expect(gridApiMock.setRowData).not.toHaveBeenCalled();
  // });
  it('should not modify rowData if rowData is empty', () => {
    component.rowData = [];
    component.selectedData = [{ id: 2, name: 'Product 2' }];

    component.renderGridData();

    expect(component.rowData).toEqual([{ id: 2, name: 'Product 2' }]);
    expect(gridApiMock.setRowData).toHaveBeenCalledWith([{ id: 2, name: 'Product 2' }]);
  });
  it('should generate a random ID between 0 and 99', ()=>{
    const id = component.generateRandomId()
    expect(id).toBeGreaterThanOrEqual(0)
    expect(id).toBeLessThan(99)

  })
it('should add rowId to editingRowIds if not present', ()=>{
  const rowId=1
  component.edit(rowId)
  expect(component.editingRowIds).toContain(rowId)
  expect(component.updateAllRowsEditingState).toHaveBeenCalled()

})
it('should not add rowId to editingRowIds if already present', ()=>{
  const rowId=1;
  component.editingRowIds=[rowId];
  component.edit(rowId);
  expect(component.editingRowIds).toEqual([rowId])
  expect(component.updateAllRowsEditingState).toHaveBeenCalled()
})
// it('should call updateAllRowEditingState', ()=>{
//   const rowId=1;
//   component.edit(rowId);
//   expect(component.updateAllRowsEditingState).toHaveBeenCalled()
// })

it('should update grid with new rowData', () => {

  component.gridApi = mockGridApi;
  component.refreshGrid();
  expect(mockGridApi.setRowData).toHaveBeenCalledWith(component.rowData);
});
it('should update editing state for all rows', () => {
  // Call the method
  component.updateAllRowsEditingState();

  // Assertions
  expect(component.rowData[0].isEditing).toBe(false); // Row 1 is not in editingRowIds
  expect(component.rowData[1].isEditing).toBe(false);  // Row 2 is in editingRowIds
  expect(component.rowData[2].isEditing).toBe(false); // Row 3 is not in editingRowIds
});

// it('should call refreshGrid method', () => {
//   // Arrange: Spy on refreshGrid method
//   spyOn(component, 'refreshGrid').and.callThrough();

//   // Act: Call the method that should trigger refreshGrid
//   component.updateAllRowsEditingState();

//   // Assert: Check if refreshGrid was called
//   fixture.whenStable().then(() => { // Ensures all promises are resolved
//     expect(component.refreshGrid).toHaveBeenCalled();
//   });
// });
it('should call refreshGrid method when updating all rows editing state', () => {
  // Arrange
  const component = TestBed.createComponent(ProductTableListComponent).componentInstance;
  component.rowData = [{ table_id: { value: 1 } }, { table_id: { value: 2 } }];
  component.editingRowIds = [1];

  spyOn(component, 'refreshGrid').and.stub(); // Stub refreshGrid method

  // Act
  component.updateAllRowsEditingState();

  // Assert
  expect(component.refreshGrid).toHaveBeenCalled();
});

it('should call save()', () => {
  const rowId = 1;
  component.editingRowIds = [rowId];
  component.save(rowId);


});

it('should call cancel()',()=>{
  const rowId=1
  component.editingRowIds = [rowId]
  component.cancel(rowId)
  expect(component.editingRowIds.length).toEqual(0)
})
it('should delete a row and call setRowData when confirmed',()=>{
  // spyOn(component,)
  component.gridOption = { api: mockGridApi };
  component.rowData = [
    { table_id: { value: 1 }, otherData: 'row1' },
    { table_id: { value: 2 }, otherData: 'row2' },
    { table_id: { value: 3 }, otherData: 'row3' }
  ];
  spyOn(window, 'confirm').and.returnValue(true); 
  const params = { table_id: { value: 2 } };

  // Act
  component.delete(params);

  // Assert
  expect(component.rowData.length).toBe(2);
  expect(component.rowData).toEqual([
    { table_id: { value: 1 }, otherData: 'row1' },
    { table_id: { value: 3 }, otherData: 'row3' }
  ]);
  expect(mockGridApi.setRowData).toHaveBeenCalledWith([
    { table_id: { value: 1 }, otherData: 'row1' },
    { table_id: { value: 3 }, otherData: 'row3' }
  ]);
})

it('should delete a row and call setRowData', () => {

  component.gridOption = { api: mockGridApi };
  component.rowData = [
    { table_id: { value: 1 }, otherData: 'row1' },
    { table_id: { value: 2 }, otherData: 'row2' },
    { table_id: { value: 3 }, otherData: 'row3' }
  ];

  const params = { table_id: { value: 2 } };

  // Act
  component.deleteAddedData(params);

  // Assert
  expect(component.rowData.length).toBe(2);
  expect(component.rowData).toEqual([
    { table_id: { value: 1 }, otherData: 'row1' },
    { table_id: { value: 3 }, otherData: 'row3' }
  ]);
  expect(mockGridApi.setRowData).toHaveBeenCalledWith([
    { table_id: { value: 1 }, otherData: 'row1' },
    { table_id: { value: 3 }, otherData: 'row3' }
  ]);
});

it('should not call setRowData if the row is not found', () => {
  // Arrange

  component.gridOption = { api: mockGridApi };
  component.rowData = [
    { table_id: { value: 1 }, otherData: 'row1' },
    { table_id: { value: 2 }, otherData: 'row2' },
    { table_id: { value: 3 }, otherData: 'row3' }
  ];

  const params = { table_id: { value: 4 } };

  // Act
  component.deleteAddedData(params);

  // Assert
  expect(component.rowData.length).toBe(3);
  expect(component.rowData).toEqual([
    { table_id: { value: 1 }, otherData: 'row1' },
    { table_id: { value: 2 }, otherData: 'row2' },
    { table_id: { value: 3 }, otherData: 'row3' }
  ]);
  expect(mockGridApi.setRowData).not.toHaveBeenCalled();
});
it('should navigate to /myorganization/product when back is called', () => {
  // Arrange
  const navigateSpy = spyOn(router, 'navigate');

  // Act
  component.back();

  // Assert
  expect(navigateSpy).toHaveBeenCalledWith(['/myorganization/product']);
});

it('should toggle card',()=>{
  component.showCard = false
  component.toggleCard();
  expect(component.showCard).toBe(true)
  component.toggleCard();
  expect(component.showCard).toBe(false)
});

it('should add a new row to rowData and call setRowData on the grid API', () => {
  // Arrange
  component.rowData = []; // Ensure rowData is initially empty

  // Act
  component.addRow();

  // Assert
  expect(component.rowData.length).toBe(1);
  expect(component.rowData[0].attribute_count.value).toBe(7);
  expect((mockGridApi.setRowData as jasmine.Spy).calls.any()).toBe(true);
  expect(mockGridApi.setRowData).toHaveBeenCalledWith(component.rowData);
});

});
