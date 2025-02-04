import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionAreaComponent } from './solution-area.component';

describe('SolutionAreaComponent', () => {
  let component: SolutionAreaComponent;
  let fixture: ComponentFixture<SolutionAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolutionAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
