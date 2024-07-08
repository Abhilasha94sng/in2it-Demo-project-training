import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyTaskComponent } from './my-task.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconsModule } from 'src/app/shared/icons/icons.module';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('MyTaskComponent', () => {
  let component: MyTaskComponent;
  let fixture: ComponentFixture<MyTaskComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyTaskComponent],
      providers: [FormBuilder],
      imports: [
        IconsModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule,
        SharedModule,
        MatInputModule,
        MatFormFieldModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTaskComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    // fixture.detectChanges();
    component.taskForm = formBuilder.group({
      id: [''],
      solution_area: [''],
      workflow: [''],
      taskId: [''],
      task: [''],
      status: [''],
      start_date: [''],
      due_date: [''],
      priority: [''],
    });
  });

  it('should initialize rowData as an empty array', () => {
    const initialComponent = TestBed.createComponent(MyTaskComponent).componentInstance;
    expect(initialComponent.rowData).toEqual([]);
  });

  it('should load data from local storage and set formData and rowData', () => {
    const storedData = JSON.stringify([
      {
        id: '1',
        solution_area: 'Solution Area 1',
        workflow: 'Workflow 1',
        taskId: 123,
        task: 'Task 1',
        status: 'Status 1',
        start_date: '2023-06-01',
        due_date: '2023-06-30',
        priority: 'High',
      },
    ]);

    spyOn(localStorage, 'getItem').and.returnValue(storedData);

    component.ngOnInit();

    expect(localStorage.getItem).toHaveBeenCalledWith('data');
    expect(component.formData).toEqual(JSON.parse(storedData));
    expect(component.rowData).toEqual(JSON.parse(storedData));
  });

  it('should set gridOption context correctly', () => {
    component.ngOnInit();
    expect(component.gridOption).toBeDefined();
    expect(component.gridOption.context).toBeDefined();
    expect(component.gridOption.context.parentComponent).toBe(component);
    expect(component.gridOption.context.parent).toBe('task');
  });
  it('should toggle showCard property', () => {
    expect(component.showCard).toBeFalse();
    component.toggleCard();
    expect(component.showCard).toBeTrue();
    component.toggleCard();
    expect(component.showCard).toBeFalse();
  });
  it('should mark all controls as touched and not submit if form is invalid', () => {
    // spyOn(console, 'log');
    component.taskForm = new FormGroup({
      solution_area: new FormBuilder().control('', Validators.required),
      workflow: new FormBuilder().control('', Validators.required),
      taskId: new FormBuilder().control('', Validators.required),
      task: new FormBuilder().control('', Validators.required),
      status: new FormBuilder().control('', Validators.required),
      start_date: new FormBuilder().control('', Validators.required),
      due_date: new FormBuilder().control('', Validators.required),
      priority: new FormBuilder().control('', Validators.required)
    });
    component.onSubmit();
    Object.values(component.taskForm.controls).forEach((control) => {
      expect(control.touched).toBeTrue(); // Check if all controls are marked as touched
    });
  });

  it('should not submit form if not confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(localStorage, 'setItem');
    component.taskForm.controls['solution_area'].setValue('Test Solution');
    component.taskForm.controls['workflow'].setValue('Test Workflow');
    component.taskForm.controls['taskId'].setValue('Test Task ID');
    component.taskForm.controls['task'].setValue('Test Task');
    component.taskForm.controls['status'].setValue('Test Status');
    component.taskForm.controls['start_date'].setValue('2023-01-01');
    component.taskForm.controls['due_date'].setValue('2023-12-31');
    component.taskForm.controls['priority'].setValue('High');
    component.onSubmit();
    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(component.rowData.length).toBe(0); // Ensure rowData is not updated
  });

  it('should update existing formData if editModeIndex is not null', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(localStorage, 'setItem');
    spyOn(component, 'toggleCard');
    spyOn(component.taskForm, 'reset'); // Spy on the reset method

    component.editModeIndex = 0;
    component.formData = [{
      id: '1', solution_area: 'Existing Solution', workflow: 'Existing Workflow',
      taskId: 'Existing Task ID', task: 'Existing Task', status: 'Existing Status',
      start_date: '2023-01-01', due_date: '2023-12-31', priority: 'Medium'
    }];
    
    component.taskForm.controls['solution_area'].setValue('Updated Solution');
    component.taskForm.controls['workflow'].setValue('Updated Workflow');
    component.taskForm.controls['taskId'].setValue('Updated Task ID');
    component.taskForm.controls['task'].setValue('Updated Task');
    component.taskForm.controls['status'].setValue('Updated Status');
    component.taskForm.controls['start_date'].setValue('2023-02-01');
    component.taskForm.controls['due_date'].setValue('2023-11-30');
    component.taskForm.controls['priority'].setValue('High');
    const formDataValue = {
      solution_area: 'New Solution',
      workflow: 'New Workflow',
      taskId: 'New Task ID',
      task: 'New Task',
      status: 'New Status',
      start_date: '2023-03-01',
      due_date: '2023-10-31',
      priority: 'Low'
    };
     component.taskForm.patchValue(formDataValue)
    component.onSubmit();

    expect(component.formData[0]).toEqual(component.taskForm.value);
    expect(localStorage.setItem).toHaveBeenCalledWith('data', JSON.stringify(component.formData));
    expect(component.taskForm.reset).toHaveBeenCalled(); // Check that reset was called
    expect(component.editModeIndex).toBeNull();
    expect(component.toggleCard).toHaveBeenCalled();
    expect(component.rowData.length).toBe(1); // Ensure rowData is updated correctly
    expect(component.rowData[0]).toEqual(component.taskForm.value); // Check the content of rowData
  });
  it('should not clear data from taskForm if not confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(component.taskForm, 'reset');

    component.clear();

    expect(component.taskForm.reset).not.toHaveBeenCalled();
  });

  it('should clear data from taskForm if confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(component.taskForm, 'reset');

    component.clear();

    expect(component.taskForm.reset).toHaveBeenCalled();
  });

  it('should not delete data from formData if not confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(localStorage, 'setItem');
    const initialFormData = [{ id: '1', task: 'Test Task' }];
    component.formData = [...initialFormData];
    component.rowData = [...initialFormData];
    component.delete(0);
    expect(component.formData).toEqual(initialFormData);
    expect(component.rowData).toEqual(initialFormData);
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
  it('should delete data from formData and update localStorage if confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(localStorage, 'setItem');
    const initialFormData = [{ id: '1', task: 'Test Task' }, { id: '2', task: 'Another Task' }];
    const expectedFormData = [{ id: '2', task: 'Another Task' }];    
    component.formData = [...initialFormData];
    component.rowData = [...initialFormData];
    component.delete(0);
    expect(component.formData).toEqual(expectedFormData);
    expect(component.rowData).toEqual(expectedFormData);
    expect(localStorage.setItem).toHaveBeenCalledWith('data', JSON.stringify(expectedFormData));
  });
  it('should patch the form with given data and set editModeIndex and showCard', () => {
    const data = {
      id: '1',
      solution_area: 'Test Solution',
      workflow: 'Test Workflow',
      taskId: 'Test Task ID',
      task: 'Test Task',
      status: 'Test Status',
      start_date: '2023-01-01',
      due_date: '2023-12-31',
      priority: 'High'
    };    
    component.formData = [data];
    component.edit(data);
    expect(component.taskForm.value).toEqual(data);
    expect(component.editModeIndex).toBe(0);
    expect(component.showCard).toBeTrue();
  });

  it('should toggle showCard to false if it was true', () => {
    component.showCard = true;

    const data = {
      id: '1',
      solution_area: 'Test Solution',
      workflow: 'Test Workflow',
      taskId: 'Test Task ID',
      task: 'Test Task',
      status: 'Test Status',
      start_date: '2023-01-01',
      due_date: '2023-12-31',
      priority: 'High'
    };

    component.formData = [data];

    component.edit(data);

    expect(component.showCard).toBeFalse();
  });

  it('should toggle showCard to true if it was false', () => {
    component.showCard = false;

    const data = {
      id: '1',
      solution_area: 'Test Solution',
      workflow: 'Test Workflow',
      taskId: 'Test Task ID',
      task: 'Test Task',
      status: 'Test Status',
      start_date: '2023-01-01',
      due_date: '2023-12-31',
      priority: 'High'
    };

    component.formData = [data];

    component.edit(data);

    expect(component.showCard).toBeTrue();
  });
  it('should set showCard to false and reset the taskForm', () => {
    // Set initial state
    component.showCard = true;
    component.taskForm.patchValue({
      id: '1',
      solution_area: 'Test Solution',
      workflow: 'Test Workflow',
      taskId: 'Test Task ID',
      task: 'Test Task',
      status: 'Test Status',
      start_date: '2023-01-01',
      due_date: '2023-12-31',
      priority: 'High'
    });

    // Spy on taskForm.reset method
    spyOn(component.taskForm, 'reset').and.callThrough();

    // Call the close method
    component.close();

    // Assertions
    expect(component.showCard).toBeFalse();
    expect(component.taskForm.reset).toHaveBeenCalled();
    expect(component.taskForm.value).toEqual({
      id: null,
      solution_area: null,
      workflow: null,
      taskId: null,
      task: null,
      status: null,
      start_date: null,
      due_date: null,
      priority: null
    });
  });
});
