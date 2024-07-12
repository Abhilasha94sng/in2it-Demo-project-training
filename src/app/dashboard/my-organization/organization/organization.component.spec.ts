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
        { id: '1', organizationName: 'Org1', type: 'Customer', contact: [] },
        { id: '2', organizationName: 'Org2', type: 'Non-Customer', contact: [] },
        { id: '3', organizationName: 'Org3', type: 'Customer', contact: [] }
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
  it('should set flag to true when matching id exists in navs', () => {
    // Arrange
    component.navs = [
      {
        id: 1,
        organizationName: 'Teachmint',
        type: 'Customer',
        industry: 'Software',
        onboarding: '	Onboarded',
        relatedOrgs: '2',
        products: '2',
        email: 'teachmin@teachmin.com',
        phone: '887890678',
        registrationNo: 'T-076',
        description: 'We are Software Compony',
        tier: 'Private Company',
        spoc: 'Aniket Ganguli',
        mobileno: '+916546789034',

       
          },
      { id: 2,       
        organizationName: 'Google',
        type: 'Customer',
        industry: 'Software',
        onboarding: '	Onboarded',
        relatedOrgs: '3',
        products: '0',
        email: 'google@google.com',
        phone: '887890678',
  
        registrationNo: 'G-4567',
        description: 'We are Software Compony',
        tier: 'Private Company',
        spoc: 'Shivani Rana',
        mobileno: '+918976342121',
        },
      { id: 3, 
        organizationName: 'Capgemini',
        type: 'Customer',
        industry: 'Software',
        onboarding: '	Onboarded',
        relatedOrgs: '9',
        products: '6',
        email: 'capgemini@capgemini.com',
        phone: '887890678',
  
        registrationNo: 'CAP-6789',
        description: 'We are Software Compony',
        tier: 'Private Company',
        spoc: 'Varun Dhavan',
        mobileno: '+910987678954',
       }
    ];

    // Act
    component.checkExisitingTab(2); // Assuming id 2 exists in navs

    // Assert
    expect(component.flag).toBe(true);
  });

  it('should not set flag to true when matching id does not exist in navs', () => {
    // Arrange
    component.navs = [
      {
        id: 1,
        organizationName: 'Teachmint',
        type: 'Customer',
        industry: 'Software',
        onboarding: '	Onboarded',
        relatedOrgs: '2',
        products: '2',
        email: 'teachmin@teachmin.com',
        phone: '887890678',
        registrationNo: 'T-076',
        description: 'We are Software Compony',
        tier: 'Private Company',
        spoc: 'Aniket Ganguli',
        mobileno: '+916546789034',

       
          },
      { id: 2,       
        organizationName: 'Google',
        type: 'Customer',
        industry: 'Software',
        onboarding: '	Onboarded',
        relatedOrgs: '3',
        products: '0',
        email: 'google@google.com',
        phone: '887890678',
  
        registrationNo: 'G-4567',
        description: 'We are Software Compony',
        tier: 'Private Company',
        spoc: 'Shivani Rana',
        mobileno: '+918976342121',
        },
      { id: 3, 
        organizationName: 'Capgemini',
        type: 'Customer',
        industry: 'Software',
        onboarding: '	Onboarded',
        relatedOrgs: '9',
        products: '6',
        email: 'capgemini@capgemini.com',
        phone: '887890678',
  
        registrationNo: 'CAP-6789',
        description: 'We are Software Compony',
        tier: 'Private Company',
        spoc: 'Varun Dhavan',
        mobileno: '+910987678954',
       }
    ];
    component.checkExisitingTab(4);
    expect(component.flag).toBe(false);
  });
  it('should add organization to navs if it does not exist', () => {
    // Arrange
    component.navs = [
      {
        id: 1,
        organizationName: 'Teachmint',
        type: 'Customer',
        industry: 'Software',
        onboarding: '	Onboarded',
        relatedOrgs: '2',
        products: '2',
        email: 'teachmin@teachmin.com',
        phone: '887890678',
        registrationNo: 'T-076',
        description: 'We are Software Compony',
        tier: 'Private Company',
        spoc: 'Aniket Ganguli',
        mobileno: '+916546789034',

       
          },
      { id: 2,       
        organizationName: 'Google',
        type: 'Customer',
        industry: 'Software',
        onboarding: '	Onboarded',
        relatedOrgs: '3',
        products: '0',
        email: 'google@google.com',
        phone: '887890678',
  
        registrationNo: 'G-4567',
        description: 'We are Software Compony',
        tier: 'Private Company',
        spoc: 'Shivani Rana',
        mobileno: '+918976342121',
        }
    ];
    const orgToAdd  = {
      id:3,
    organizationName: 'Capgemini',
    type: 'Customer',
    industry: 'Software',
    onboarding: '	Onboarded',
    relatedOrgs: '9',
    products: '6',
    email: 'capgemini@capgemini.com',
    phone: '887890678',

    registrationNo: 'CAP-6789',
    description: 'We are Software Compony',
    tier: 'Private Company',
    spoc: 'Varun Dhavan',
    mobileno: '+910987678954',
   }

    // Act
    component.add(orgToAdd);

    // Assert
    expect(component.navs.length).toBe(3); // Check if the organization was added
    expect(component.navs).toContain(orgToAdd); // Check if the added organization exists in navs
  });

  it('should not add organization to navs if it already exists', () => {
    // Arrange
    component.navs = [
      {
        id: 1,
        organizationName: 'Teachmint',
        type: 'Customer',
        industry: 'Software',
        onboarding: '	Onboarded',
        relatedOrgs: '2',
        products: '2',
        email: 'teachmin@teachmin.com',
        phone: '887890678',
        registrationNo: 'T-076',
        description: 'We are Software Compony',
        tier: 'Private Company',
        spoc: 'Aniket Ganguli',
        mobileno: '+916546789034',

       
          },
      { id: 2,       
        organizationName: 'Google',
        type: 'Customer',
        industry: 'Software',
        onboarding: '	Onboarded',
        relatedOrgs: '3',
        products: '0',
        email: 'google@google.com',
        phone: '887890678',
  
        registrationNo: 'G-4567',
        description: 'We are Software Compony',
        tier: 'Private Company',
        spoc: 'Shivani Rana',
        mobileno: '+918976342121',
        }
    ];
    const existingOrg =       { id: 2,       
      organizationName: 'Google',
      type: 'Customer',
      industry: 'Software',
      onboarding: '	Onboarded',
      relatedOrgs: '3',
      products: '0',
      email: 'google@google.com',
      phone: '887890678',

      registrationNo: 'G-4567',
      description: 'We are Software Compony',
      tier: 'Private Company',
      spoc: 'Shivani Rana',
      mobileno: '+918976342121',
      }
    component.add(existingOrg);
    expect(component.navs.length).toBe(2);
  });

  it('should set rowData to all data when filter is "All"', () => {
    component.filterOrgData('All');
    expect(component.rowData.length).toBe(3);
    expect(component.rowData).toEqual(orgServiceMock.orgData);
  });

  it('should filter rowData by organization type', () => {
    component.filterOrgData('Customer');
    const expectedData = orgServiceMock.orgData.filter((data:any) => data.type === 'Customer');
    expect(component.rowData.length).toBe(expectedData.length); 
    expect(component.rowData).toEqual(expectedData);
  });

  it('should filter rowData by non-existing type', () => {
    component.filterOrgData('Non-Existent Type');
    expect(component.rowData.length).toBe(0); 
  });

  it('should call add method with correct organization data when organizationName field is clicked', () => {
    const event = {
      colDef: { field: 'organizationName' },
      data: { id: '1', organizationName: 'Org1' }
    };

    component.onCellClicked(event);

    expect(component.add).toHaveBeenCalledWith({ id: '1', organizationName: 'Org1' });
  });

  it('should not call add method when a field other than organizationName is clicked', () => {
    const event = {
      colDef: { field: 'type' },
      data: { id: '1', organizationName: 'Org1' }
    };

    component.onCellClicked(event);

    expect(component.add).not.toHaveBeenCalled();
  });

});
