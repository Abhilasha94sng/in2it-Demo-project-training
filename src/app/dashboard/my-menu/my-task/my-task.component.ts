import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColDef, GridOptions } from 'ag-grid-community';
import { CustomCellComponent } from 'src/app/shared/shared/custom-cell/custom-cell.component';
@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css'],
})
export class MyTaskComponent implements OnInit {
  taskForm!: FormGroup;
  formData: any[] = [];
  editModeIndex: number | null = null;
  icons = [{ name: 'edit' }, { name: 'trash2' }];
  showOffcanvas: boolean = false;
  showCard: boolean = false;
  rowData: any[] = []
  gridOption!: GridOptions;
  public orgData: any[] = [];
  public colDefs: ColDef[] = [
    {
      field: 'id',
      minWidth: 170,
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    {
      field: 'solution_area',
    },
    { field: 'workflow' },
    { field: 'taskId' },
    { field: 'task' },
    { field: 'status' },
    { field: 'start_date' },
    { field: 'due_date' },
    { field: 'priority' },
    {
      field: 'action',
      // cellRendererFramework: CustomCellComponent,
      // width: 150,
      // cellRendererParams: {
      //   context: { MyTaskComponent: this , parent: 'task'}
      // }
      cellRenderer: CustomCellComponent,
    },
  ];
  constructor(private fb: FormBuilder) {
    // this.formData = [];
  }

  ngOnInit(): void {
    this.rowData=[]    
    this.taskForm = this.fb.group({
      id: ['', Validators.required],
      solution_area: ['', Validators.required],
      workflow: ['', Validators.required],
      taskId: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      task: ['', Validators.required],
      status: ['', Validators.required],
      start_date: ['', Validators.required],
      due_date: ['', Validators.required],
      priority: ['', Validators.required],
    });
    localStorage.getItem('data')

    this.loadFromLocalStorage();
    this.gridOption={
      context:{
        parentComponent:this,
        parent:'task'
      }
    }
  }

  loadFromLocalStorage(): void {
    const savedData = localStorage.getItem('data');
    if (savedData) {
      this.formData = JSON.parse(savedData);
      this.rowData = [...this.formData];
    }
  }
  // loadFromLocalStorage() {
  //   const savedData = localStorage.getItem('data');
  //   if (savedData) {
  //     this.formData = JSON.parse(savedData);
  //     this.rowData = [...this.formData];
  //   }
  // }

  // saveToLocalStorage() {
  //   localStorage.setItem('tasks', JSON.stringify(this.formData));
  // }
  onSubmit(): void {
    Object.values(this.taskForm.controls).forEach((control) => {
      control.markAsTouched();
    });

    if (this.taskForm.valid) {
      if (confirm('Are you sure you want to submit the form.')) {
        const formDataValue = this.taskForm.value;
        if (this.editModeIndex !== null) {
          this.formData[this.editModeIndex] = formDataValue;
        } else {
          this.formData.push(formDataValue);;
        }
        this.rowData = [...this.formData];
        localStorage.setItem('data', JSON.stringify(this.rowData));
        console.log(this.formData);
        console.log(this.rowData);
        
        
        this.taskForm.reset();
        console.log(this.taskForm);
        
        this.editModeIndex = null;
        this.toggleCard();
        // this.loadFromLocalStorage();

      }
    } else {
      console.log(this.rowData);
      
      console.log('Form has validation errors.');
    }
  }

  clear() {
    if (confirm('Are you sure you want to clear the data')) {
      this.taskForm.reset();
    }
  }
  delete(index: number): void {
    if (confirm('Are you sure you want to delete the data?')) {
      this.formData.splice(index, 1);
      this.rowData = [...this.formData];
      localStorage.setItem('data', JSON.stringify(this.formData));
    }
  }
  edit(data: any): void {
    this.taskForm.patchValue(data);
    this.editModeIndex = this.formData.indexOf(data);
    this.showCard = !this.showCard;
  }

  toggleCard() {
    this.showCard = !this.showCard;
  }
  close() {
    this.showCard = false;
    this.taskForm.reset();
  }

}
