import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationComponent } from './organization.component';
import { MyorganizationServiceService } from '../myorganization-service.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('OrganizationComponent', () => {
  let component: OrganizationComponent;
  let fixture: ComponentFixture<OrganizationComponent>;
  let orgServiceMock: any;

  beforeEach(async () => {
    orgServiceMock = {
      orgData: [
        { id: 1, name: 'Org1' },
        { id: 2, name: 'Org2' },
      ]
    };
  // component.navs = [{ id: 1, name: 'Org1' }, { id: 2, name: 'Org2' }];
    await TestBed.configureTestingModule({
      declarations: [ OrganizationComponent ],
      imports: [NgbModule],
      providers: [
        { provide: MyorganizationServiceService, useValue: orgServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationComponent);
    component = fixture.componentInstance;
    spyOn(component, 'getAllTable').and.callThrough();
    spyOn(component, 'add').and.callThrough();
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize gridOption and rowData in ngOnInit', () => {
    component.ngOnInit();

    expect(component.gridOption).toEqual({
      context: {
        parentComponent: component,
        parent: 'organization'
      }
    });

    expect(component.rowData).toEqual(orgServiceMock.orgData);
    expect(component.getAllTable).toHaveBeenCalled();
  });

  // it('should handle navigation state in ngOnInit', () => {
  //   const navigationState = {
  //     data: { id: 3, name: 'Org3' },
  //     id: 3
  //   };

  //   spyOn(history, 'state').and.returnValue(navigationState);

  //   component.ngOnInit();

  //   expect(component.datasource).toEqual(navigationState.data);
  //   expect(component.add).toHaveBeenCalledWith(navigationState.data);
  // });

  it('should remove the item from navs, reset active, and call event methods in close', () => {
    const mockEvent = new MouseEvent('click');
    spyOn(mockEvent, 'preventDefault');
    spyOn(mockEvent, 'stopImmediatePropagation');

    component.close(mockEvent, 1);

    expect(component.navs.length).toBe(1);
    expect(component.navs).toEqual( [{       id: 0,
      organizationName: 'Organization',
      type: '',
      industry: '',
      onboarding: '',
      relatedOrgs: '',
      products: '',
      email: '',
      phone: '',
      registrationNo: '',
      description: '',
      tier: '',
      spoc: '',
      mobileno: '',}]);
    expect(component.active).toBe(0);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockEvent.stopImmediatePropagation).toHaveBeenCalled();
  });
});
