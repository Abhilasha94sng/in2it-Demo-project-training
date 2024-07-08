import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgGridAngularComponent } from './ag-grid-angular.component';
import { GridApi } from 'ag-grid-community';

describe('AgGridAngularComponent', () => {
  let component: AgGridAngularComponent;
  let fixture: ComponentFixture<AgGridAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgGridAngularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridAngularComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set gridApi and call sizeColumnsToFit on grid ready', () => {
    const mockGridApi = {
      sizeColumnsToFit: jasmine.createSpy('sizeColumnsToFit'),
      addEventListener: jasmine.createSpy('addEventListener')
    } as Partial<GridApi> as GridApi;

    const mockParams = {
      api: mockGridApi
    };

    component.onGridReady(mockParams);
    expect(component.gridApi).toBe(mockParams.api);
    expect(mockParams.api.sizeColumnsToFit).toHaveBeenCalled();
    expect(mockParams.api.addEventListener).toHaveBeenCalledWith('cellClicked', jasmine.any(Function));
  });

  it('should set gridApi and call sizeColumnsToFit on grid ready', () => {
    const mockGridApi = {
      sizeColumnsToFit: jasmine.createSpy('sizeColumnsToFit'),
      addEventListener: jasmine.createSpy('addEventListener')
    } as Partial<GridApi> as GridApi;

    const mockParams = {
      api: mockGridApi
    };

    component.onGridReady(mockParams);

    expect(component.gridApi).toBe(mockParams.api);
    expect(mockGridApi.sizeColumnsToFit).toHaveBeenCalled();
    expect(mockGridApi.addEventListener).toHaveBeenCalledWith('cellClicked', jasmine.any(Function));
  });

  it('should bind onCellClicked correctly', () => {
    spyOn(component, 'onCellClicked');

    const mockGridApi = {
      sizeColumnsToFit: jasmine.createSpy('sizeColumnsToFit'),
      addEventListener: (eventName: string, callback: Function) => {
        // Simulate a cell click event to test the binding
        if (eventName === 'cellClicked') {
          callback({});
        }
      }
    } as Partial<GridApi> as GridApi;

    const mockParams = {
      api: mockGridApi
    };

    component.onGridReady(mockParams);

    expect(component.gridApi).toBe(mockParams.api);
    expect(mockGridApi.sizeColumnsToFit).toHaveBeenCalled();
    expect(component.onCellClicked).toHaveBeenCalled();
  });

  it('should emit cellClicked event when onCellClicked is called', () => {
    spyOn(component.cellClicked, 'emit');

    const event = { data: 'test data' };
    component.onCellClicked(event);

    expect(component.cellClicked.emit).toHaveBeenCalledWith(event);
  });

  it('should emit deleteRow event with selected rows when deleteSelectedRow is called', () => {
    const mockSelectedRows = [{ id: 1, name: 'Row1' }, { id: 2, name: 'Row2' }];
    const mockGridApi = {
      getSelectedRows: jasmine.createSpy('getSelectedRows').and.returnValue(mockSelectedRows)
    } as Partial<GridApi> as GridApi;

    component.gridApi = mockGridApi;
    spyOn(component.deleteRow, 'emit');

    component.deleteSelectedRow();

    expect(mockGridApi.getSelectedRows).toHaveBeenCalled();
    expect(component.deleteRow.emit).toHaveBeenCalledWith(mockSelectedRows);
  });

  it('should toggle showCard property from true to false and then back to true', () => {
    component.showCard = true;

    component.toggleCardVisibility();
    expect(component.showCard).toBe(false);

    component.toggleCardVisibility();
    expect(component.showCard).toBe(true);
  });

  it('should toggle column hide property back to false and update columnDefs', () => {
    const mockColumn: any = { headerName: 'Column 2', field: 'col2', hide: true };
    component.gridApi = {
      setColumnDefs: jasmine.createSpy('setColumnDefs')
    } as unknown as GridApi;

    component.toggleColumn(mockColumn)

    expect(mockColumn.hide).toBe(false);
    expect(component.gridApi?.setColumnDefs).toHaveBeenCalledWith(component.columnDefs);
  });

  it('should return "eye" when column.hide is false', () => {
    const mockColumn: any = { headerName: 'Column 1', field: 'col1', hide: false };

    const iconName = component.getIconName(mockColumn);

    expect(iconName).toBe('eye');
  });

  it('should return "eye-off" when column.hide is true', () => {
    const mockColumn: any = { headerName: 'Column 2', field: 'col2', hide: true };

    const iconName = component.getIconName(mockColumn);

    expect(iconName).toBe('eye-off');
  });
});
