import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildOrganizationComponent } from './child-organization.component';

describe('ChildOrganizationComponent', () => {
  let component: ChildOrganizationComponent;
  let fixture: ComponentFixture<ChildOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildOrganizationComponent ],
      imports: []
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildOrganizationComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
