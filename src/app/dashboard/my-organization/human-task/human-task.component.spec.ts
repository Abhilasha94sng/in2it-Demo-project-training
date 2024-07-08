import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanTaskComponent } from './human-task.component';

describe('HumanTaskComponent', () => {
  let component: HumanTaskComponent;
  let fixture: ComponentFixture<HumanTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HumanTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HumanTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
