import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildOrganizationComponent } from './child-organization.component';
import { MyorganizationServiceService } from '../../myorganization-service.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

describe('ChildOrganizationComponent', () => {
  let component: ChildOrganizationComponent;
  let fixture: ComponentFixture<ChildOrganizationComponent>;
  let mockOrgService: Partial<MyorganizationServiceService >; 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildOrganizationComponent ],
      providers:[ { provide: MyorganizationServiceService, useValue: mockOrgService }],
      imports: [NgbModule, HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildOrganizationComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    mockOrgService = {
      orgData: [
        {
          id: '1',
          organizationName: 'In2it Technologies',
          type: 'Customer',
          industry: 'Software',
          onboarding: '	Onboarded',
          relatedOrgs: '3',
          products: '0',
          email: 'in2it@in2ittech.com',
          phone: '887890678',
          registrationNo: 'CD-12345',
          description: 'We are Software Compony',
          tier: 'Private Company',
          name: 'Abhishek Singh',
          mobileno: '+91789065678',
          role:'Data Science Engineer',
          contact: [
            {
              "name": "Alice Smith",
              "role": "Software Engineer",
              "email": "alice.smith@example.com",
              "phone": "1234567"
            },
            {
              "name": "Bob Johnson",
              "role": "Project Manager",
              "email": "bob.johnson@example.com",
              "phone": "9876543"
            },
          ]
        },
        {
          id: '2',
          organizationName: 'TCS',
          type: 'Non Customer',
          industry: 'Software',
          onboarding: 'Onboarded',
          relatedOrgs: '3',
          products: '0',
          email: 'tcs@tcs.com',
          phone: '887890678',
    
          registrationNo: 'AB-12345',
          description: 'We are Software Compony',
          tier: 'Private Company',
          name: 'Gautam Yadav',
          mobileno: '+917890656547',
          role:'Data Science Engineer',
          contact: [
            {
              "name": "Shikha Gupta",
              "role": "Software Engineer",
              "email": "shikha.g@ymail.com",
              "phone": "8906543278"
            },
            {
              "name": "Riya Patel",
              "role": "Project Manager",
              "email": "r.patel@yahoo.com",
              "phone": "6578945321"
            },
          ]
        }
      ]
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize rowData with contacts matching organizationName', () => {
    // Arrange
    component.organization = { organizationName: 'TCS' }; // Choose an existing organizationName
  
    // Act (call ngOnInit explicitly)
    component.ngOnInit();
  
    // Assert
    expect(component.rowData.length).toBe(2); // Check if two contacts are pushed to rowData
    expect(component.rowData[0].name).toBe('Shikha Gupta'); // Check if the first contact name is correct
    expect(component.rowData[1].role).toBe('Project Manager'); // Check if the second contact role is correct
  });

  // it('should initialize gridOption and rowData in ngOnInit', () => {
  //   component.ngOnInit();

  //   expect(component.gridOption).toEqual({
  //     context: {
  //       parentComponent: component,
  //       parent: 'child'
  //     }
  //   });
  // })

  // it('should set gridOption with context', () => {
  //   // Arrange and Act (ngOnInit is already called in beforeEach)
  
  //   // Assert
  //   expect(component.gridOption).toBeDefined(); // Check if gridOption is defined
  //   expect(component.gridOption.context.parent).toBe('child'); // Check if context is correctly set
  //   // Add more assertions based on your specific needs for gridOption
  // });
  it('should toggle card visibility and set selected contact',()=>{
    const contact={email: "alice.smith@example.com",name: "Alice Smith",phone:"1234567",role: "Software Engineer"}
    component.toggleCard(contact)

    expect(component.selectedContact).toEqual(contact)
    expect(component.showCard).toBe(true)
  })
  it('should toggle card visibility off when called again', () => {
    const contact = {
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      phone: '9876543'
    };
    component.toggleCard(contact); 
    component.toggleCard(contact); 
    expect(component.selectedContact).toEqual(contact);
    expect(component.showCard).toBe(false);
  })

  it('should open card  and set selected contact',()=>{
    const contact={email: "alice.smith@example.com",name: "Alice Smith",phone:"1234567",role: "Software Engineer"}
    component.openCard(contact)

    expect(component.selectedContact).toEqual(contact)
    expect(component.showCard).toBe(true)
  })

  it('should call close()',()=>{
    component.close()
    expect(component.showCard).toBe(false)
  })

  it('should set isActive correctly based on tab parameter', () => {
    // Arrange
    const tab = 'contacts';
  
    // Act
    component.showDiv(tab);
  
    // Assert
    expect(component.isActive).toBe(tab);
  });
});
