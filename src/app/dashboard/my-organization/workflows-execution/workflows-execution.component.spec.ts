import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowsExecutionComponent } from './workflows-execution.component';

describe('WorkflowsExecutionComponent', () => {
  let component: WorkflowsExecutionComponent;
  let fixture: ComponentFixture<WorkflowsExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowsExecutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowsExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
