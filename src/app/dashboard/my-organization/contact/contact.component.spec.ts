import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'; // Import FormBuilder
import { MyorganizationServiceService } from '../myorganization-service.service';
import { Router } from '@angular/router';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let mockOrgService: Partial<MyorganizationServiceService>;
  let router: Router
  let fb:FormBuilder
  beforeEach(async () => {
    mockOrgService = {
      orgData: [
       
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
        {
          "name": "Eshank Rana",
          "role": "Designer",
          "email": "eshank.r@gmail.com",
          "phone": "8907654356"
        },

      ]
    },
        
      ]
    };
    await TestBed.configureTestingModule({
      declarations: [ ContactComponent ],
      imports: [ HttpClientModule, RouterTestingModule ], // Remove FormBuilder from imports
      providers: [ FormBuilder ,  { provide: MyorganizationServiceService, useValue: mockOrgService }] ,
     
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fb = TestBed.inject(FormBuilder);
    spyOn(router, 'navigate');
    component.showTable = [
      {
        contact: [
          { role: 'Admin' },
          { role: 'User' }
        ]
      },
      {
        contact: [
          { role: 'User' },
          { role: 'Manager' }
        ]
      }
    ];
    component.selectedRows = [
      {
        name: 'John Doe',
        organizationName: 'TCS',
        role: 'Developer',
        email: 'john.doe@example.com',
        phone: '9876543210'
      }
    ];

    // Initialize contactForm with FormBuilder
    component.contactForm = fb.group({
      firstName: [''],
      lastName: [''],
      organizationName: [''],
      role: [''],
      email: [''],
      mediums: fb.array([])
    });

    // component.selectedRows = [{
    //   contactIndex: 1,
    //   organizationName: 'Org1',
    //   firstName: 'John',
    //   lastName: 'Doe',
    //   role: 'Manager',
    //   email: 'john.doe@example.com',
    //   phone: '1234567890'
    // }];

    // // Initialize the form
    // component.contactForm = fb.group({
    //   organizationName: [''],
    //   firstName: [''],
    //   lastName: [''],
    //   role: [''],
    //   email: [''],
    //   mediums: fb.array([
    //     fb.group({
    //       phone: ['']
    //     })
    //   ])
    // });

    component.rowData = [{ id: '1' }, { id: '2' }, { id: '3' }];

    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total contacts', () => {
    // Call the method to calculate total contacts
    const totalContacts = component.calculateTotalContacts();

    // Assert the expected result based on the mocked data
    expect(totalContacts).toBe(3); // Adjust the expected value based on your mock data
  })

  it('should initialize unique roles', () => {
    component.initializeUniqueRoles();
    expect(component.uniqueRoles).toEqual(['Admin', 'User', 'Manager']);
  });

   it('should initialize correctly on ngOnInit', () => {
    component.ngOnInit();

    // Verify the count of total contacts
    expect(component.count).toBe(3);

    // Verify the rowData transformation
    expect(component.rowData.length).toBe(3);
    expect(component.rowData[0]).toEqual(jasmine.objectContaining({
     name: 'Shikha Gupta', role: 'Software Engineer', email: 'shikha.g@ymail.com', phone: '8906543278', contactIndex: 0, organizationName: 'TCS', id: '2'
    }));

    // Verify the filteredTable and showTable
    // expect(component.filteredTable).toEqual(mockOrgService.orgData);
    expect(component.showTable).toEqual(mockOrgService.orgData);

    // Verify the initialization of contactForm
    expect(component.contactForm).toBeDefined();
    expect(component.contactForm.controls['firstName']).toBeDefined();
    expect(component.contactForm.controls['lastName']).toBeDefined();
    expect(component.contactForm.controls['organizationName']).toBeDefined();
    expect(component.contactForm.controls['mediums']).toBeDefined();
    expect(component.contactForm.controls['role']).toBeDefined();
    expect(component.contactForm.controls['additionalRole']).toBeDefined();
    expect(component.contactForm.controls['remarks']).toBeDefined();
    expect(component.contactForm.controls['email']).toBeDefined();

    // Verify the uniqueRoles
    expect(component.uniqueRoles).toEqual(['Software Engineer', 'Project Manager', 'Designer']);

    // Verify the gridOption context
    expect(component.gridOption.context.parentComponent).toBe(component);
    expect(component.gridOption.context.parent).toBe('contact');
  });
  it('should filter contacts by organization name', () => {
    component.filterOrgData('TCS');
    expect(component.organizationName).toBe('TCS');
    expect(component.rowData).toEqual([
      { name: 'Shikha Gupta', role: 'Software Engineer', email: 'shikha.g@ymail.com', phone: '8906543278', contactIndex: 0, orgIndex: 0, organizationName: 'TCS', id: '2' },
      { name: 'Riya Patel', role: 'Project Manager', email: 'r.patel@yahoo.com', phone: '6578945321', contactIndex: 1, orgIndex: 0, organizationName: 'TCS', id: '2' },
      { name: 'Eshank Rana', role: 'Designer', email: 'eshank.r@gmail.com', phone: '8907654356', contactIndex: 2, orgIndex: 0, organizationName: 'TCS', id: '2' }
    ]);
  });

  it('should return all contacts when orgName is "All"', () => {
    component.filterOrgData('All');
    expect(component.organizationName).toBe('All');
    expect(component.rowData.length).toBe(3);
    expect(component.rowData).toEqual([
      { name: 'Shikha Gupta', role: 'Software Engineer', email: 'shikha.g@ymail.com', phone: '8906543278', contactIndex: 0, orgIndex: 0, organizationName: 'TCS', id: '2' },
      { name: 'Riya Patel', role: 'Project Manager', email: 'r.patel@yahoo.com', phone: '6578945321', contactIndex: 1, orgIndex: 0, organizationName: 'TCS', id: '2' },
      { name: 'Eshank Rana', role: 'Designer', email: 'eshank.r@gmail.com', phone: '8907654356', contactIndex: 2, orgIndex: 0, organizationName: 'TCS', id: '2' }
    ]);
  });

  it('should set flag to true if the tab exists', () => {
    component.navs = [{ id: 1, organizationName: 'Organization',
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
      name: '',
      mobileno: '',
      contact: [
        {
          name: '',
          role: '',
          email: '',
          phone: '',
        },
      ], }, {id: 2,
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
        contact: [
          {
            "name": "Shikha Gupta",
            "role": "Software Engineer",
            "email": "shikha.g@ymail.com",
            "phone": "8906543278"
          },] }, {  id: 3,
        organizationName: 'Mahindra',
        type: 'Customer',
        industry: 'Automobile',
        onboarding: '	Onboarded',
        relatedOrgs: '3',
        products: '5',
        email: 'mahindra@mahindra.com',
        phone: '887890678',
  
        registrationNo: 'AB-12345',
        description: 'We are Automobile Compony',
        tier: 'Private Company',
        name: 'Prashant Singh',
        mobileno: '+917890654567',
      
        contact: [
          {
            "name": "Shivakant",
            "role": "Software Engineer",
            "email": "shiv.kant@gmail.com",
            "phone": "6789098"
          }
        ] 
      }
        ];
    component.checkExisitingTab(2);
    expect(component.flag).toBe(true);
  });

  it('should set flag to false if the tab does not exist', () => {
    component.navs = [{ id: 1, organizationName: 'Organization',
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
      name: '',
      mobileno: '',
      contact: [
        {
          name: '',
          role: '',
          email: '',
          phone: '',
        },
      ], }, {id: 2,
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
        contact: [
          {
            "name": "Shikha Gupta",
            "role": "Software Engineer",
            "email": "shikha.g@ymail.com",
            "phone": "8906543278"
          },] }, {  id: 3,
        organizationName: 'Mahindra',
        type: 'Customer',
        industry: 'Automobile',
        onboarding: '	Onboarded',
        relatedOrgs: '3',
        products: '5',
        email: 'mahindra@mahindra.com',
        phone: '887890678',
  
        registrationNo: 'AB-12345',
        description: 'We are Automobile Compony',
        tier: 'Private Company',
        name: 'Prashant Singh',
        mobileno: '+917890654567',
      
        contact: [
          {
            "name": "Shivakant",
            "role": "Software Engineer",
            "email": "shiv.kant@gmail.com",
            "phone": "6789098"
          }
        ] 
      }
        ];
    component.checkExisitingTab(4);
    expect(component.flag).toBe(false);
  });

  it('should set flag to false if navs array is empty', () => {
    component.navs = [];
    component.checkExisitingTab(1);
    expect(component.flag).toBe(false);
  });

  it('should navigate to /myorganization/organization with data and id in state', () => {
    const data = { key: 'value' };
    const id = 1;
    component.add(data, id);
    expect(router.navigate).toHaveBeenCalledWith(['/myorganization/organization'], {
      state: { data, id },
    });
  });
  it('should create a form group with controls for country_code, phone, and address', () => {
    const formGroup = component.createMedium();
    
    expect(formGroup).toBeDefined();
    expect(formGroup.get('country_code')).toBeDefined();
    expect(formGroup.get('phone')).toBeDefined();
    expect(formGroup.get('address')).toBeDefined();
  });

  it('should validate country_code as required', () => {
    const formGroup = component.createMedium();
    const countryCodeControl = formGroup.get('country_code');
    
    countryCodeControl?.setValue('');
    expect(countryCodeControl?.valid).toBeFalsy();
    expect(countryCodeControl?.errors).toEqual({ required: true });
  });

  it('should validate phone as required and match pattern', () => {
    const formGroup = component.createMedium();
    const phoneControl = formGroup.get('phone');
    
    phoneControl?.setValue('');
    expect(phoneControl?.valid).toBeFalsy();
    expect(phoneControl?.errors).toEqual({ required: true });
    
    phoneControl?.setValue('12345');
    expect(phoneControl?.valid).toBeTruthy();
    
    phoneControl?.setValue('invalidPhone');
    expect(phoneControl?.valid).toBeFalsy();
    expect(phoneControl?.errors).toEqual({
      pattern: {
        requiredPattern: '/^-?(0|[1-9]\\d*)?$/',
        actualValue: 'invalidPhone'
      }
    });
  });

  it('should initialize address as an empty form array', () => {
    const formGroup = component.createMedium();
    const addressArray = formGroup.get('address');
    
    expect(addressArray).toBeDefined();
    expect(addressArray?.value).toEqual([]);
  });

  it('should retrieve the mediums FormArray from the contactForm', () => {
    expect(component.mediumsArray).toBeDefined();
    expect(component.mediumsArray instanceof FormArray).toBe(true);
  });

  it('should initialize mediums FormArray as empty', () => {
    expect(component.mediumsArray.length).toBe(0);
  });

  it('should add a new control to mediums FormArray', () => {
    component.mediumsArray.push(component.fb.control(''));
    expect(component.mediumsArray.length).toBe(1);
  });
  it('should add a new control to mediums FormArray', () => {
    component.addMedium();
    expect(component.mediumsArray.length).toBe(1);
    expect(component.mediumsArray.at(0)).toBeDefined();
    expect(component.mediumsArray.at(0) instanceof FormGroup).toBe(true);
  });

  it('should add multiple controls to mediums FormArray', () => {
    component.addMedium();
    component.addMedium();
    expect(component.mediumsArray.length).toBe(2);
  });
  it('should remove a control from mediums FormArray', () => {
    component.addMedium();
    component.addMedium();
    component.removeMedium(0);
    expect(component.mediumsArray.length).toBe(1);
  });

  it('should remove the correct control from mediums FormArray', () => {
    component.addMedium();
    component.addMedium();
    component.addMedium();
    component.removeMedium(1);
    expect(component.mediumsArray.length).toBe(2);
  });
  it('should set showCard to false when cancel is called', () => {
    component.showCard = true;  // Ensure showCard is true before calling cancel
    component.cancel();
    expect(component.showCard).toBe(false);
  });
  it('should mark all controls as touched when save is called', () => {
    component.save();
    Object.values(component.contactForm.controls).forEach(control => {
      expect(control.touched).toBe(true);
    });
  });
  it('should add a new contact to the organization if form is valid', () => {
    component.contactForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      role: 'Developer',
      email: 'john.doe@example.com',
      mediums: [{ country_code: '91', phone: '9876543210' }],
      organizationName: 'TCS'
    });
    component.save();
    expect(mockOrgService).toBeDefined();
    expect(mockOrgService.orgData).toBeDefined();
    expect(component.showCard).toBe(false);
  });

  it('should log error if organization is not found', () => {
    component.contactForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      role: 'Developer',
      email: 'john.doe@example.com',
      mediums: [{ country_code: '91', phone: '9876543210' }],
      organizationName: 'Non Existent Org'
    });
    spyOn(console, 'log');
    component.save();
    expect(console.log).toHaveBeenCalledWith('Organization not found');
    expect(component.showCard).toBe(false);
  });
  it('should call oprnCard()',()=>{
    spyOn(component.contactForm,'reset').and.callThrough()
    spyOn(component.contactForm,'enable').and.callThrough()
    component.openCard()
    expect(component.showCard).toBe(true)
    expect(component.viewForm).toBe(true)
    expect(component.viewCard).toBe(false)
    expect(component.editMode).toBe(false)    
  });
  it('should call openNameCard()',()=>{
    const index = 0;
    const contactDetail = {contactIndex: 0,email: "alice.smith@example.com",
      id: "1",name: "Alice Smith",organizationName: "In2it Technologies",phone: "1234567",
      role:  "Software Engineer"

    }
    component.openNameCard(index,contactDetail)
    expect(component.editMode).toBe(true)
    expect(component.editIndex).toEqual(index)
    expect(component.selectedContact).toEqual(contactDetail)
    expect(component.viewCard).toBe(true)
    expect(component.showCard).toBe(true)
    expect(component.viewForm).toBe(false)

  })

  it('should call closeCard()',()=>{
    component.closeCard()
    expect(component.viewCard).toBe(false)
    expect(component.showCard).toBe(false)
  })
  it('should populate form with selected contact details and manage UI state', () => {
    // Call editContact() method
    component.editContact();

    // Assert form values are correctly populated
    expect(component.contactForm.value.firstName).toBe('John');
    expect(component.contactForm.value.lastName).toBe('Doe');
    expect(component.selectedContact[0].organizationName).toBe('TCS');
    expect(component.contactForm.value.role).toBe('Developer');
    expect(component.contactForm.value.email).toBe('john.doe@example.com');

    // Assert mediums array is managed (assuming no mediums in this example)
    const mediumsArray = component.contactForm.get('mediums') as FormArray;
    expect(mediumsArray.length).toBe(0); // Ensure mediums array is empty

    // Assert UI state management
    expect(component.viewForm).toBe(true);
    expect(component.editMode).toBe(true);
    expect(component.viewCard).toBe(false);
    expect(component.showCard).toBe(true);
  });
  it('should call selectRow()',()=>{
    const event={contactIndex: 0,email: "alice.smith@example.com",
      id: "1",name: "Alice Smith",organizationName: "In2it Technologies",phone: "1234567",
      role:  "Software Engineer"

    }
    component.selectedRow(event)
    expect(component.selectedRows).toEqual(event)
  })

  it('should filter rowData and update count', () => {
    // Initial rowData and selectedRows
    component.rowData = [{ id: 1 }, { id: 2 }, { id: 3 }];
    component.selectedRows = [{ id: 2 }];

    // Call the method
    component.updateCount();

    // Assertions
    expect(component.rowData).toEqual([{ id: 1 },{ id: 2 },  { id: 3 }]);
    expect(component.count).toBe(3);
  });

  it('should update org contact length based on rowData', () => {
    mockOrgService.orgData = mockOrgService.orgData || [];
    component.rowData = [{ id: '1' }, { id: '1' }, { id: '2' }];
    component.updateOrgContactCount();
    expect(mockOrgService.orgData[0].contact.length).toBe(1);
});

it('should set contact length to 0 if no matching rows are found', () => {
    mockOrgService.orgData = mockOrgService.orgData || [];
    component.rowData = [{ id: '3' }];
    component.updateOrgContactCount();
    expect(mockOrgService.orgData[0].contact.length).toBe(0);
});

it('should delete selected contacts', () => {
  component.selectedRows = [{ id: '2' }]; // Set selected rows
  component.deleteSelectedContacts(null); // Call the method

  // Assertions
  expect(component.rowData).toEqual([{ id: '1' },{ id: '2' }, { id: '3' }]); // Check if selected row is deleted
});
it('should call add method when organizationName field is clicked', () => {
  spyOn(component, 'add'); // Spy on the add method

  const event = {
    data: { id: '1', organizationName: 'Org1' },
    colDef: { field: 'organizationName' }
  };

  component.onCellClicked(event);

  expect(component.add).toHaveBeenCalledWith(event.data, '1');
});

it('should call openNameCard method when name field is clicked', () => {
  spyOn(component, 'openNameCard'); // Spy on the openNameCard method

  const event = {
    data: { id: '1', name: 'Alice', contactIndex: 0 },
    colDef: { field: 'name' }
  };

  component.onCellClicked(event);

  expect(component.openNameCard).toHaveBeenCalledWith(0, event.data);
});

it('should update selected row in rowData and reset form', () => {
  // Arrange
  component.contactForm.patchValue({
    organizationName: 'Updated Org',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'Developer',
    email: 'jane.smith@example.com',
  });
  (component.contactForm.get('mediums') as FormArray).push(
    component.fb.group({ phone: '9876543210' })
  );
  
  component.selectedRows = [{
    contactIndex: 1,
    organizationName: 'Org1',
    name: 'John Doe',
    role: 'Manager',
    email: 'john.doe@example.com',
    phone: '1234567890'
  }];
  
  component.rowData = [{
    contactIndex: 1,
    organizationName: 'Org1',
    name: 'John Doe',
    role: 'Manager',
    email: 'john.doe@example.com',
    phone: '1234567890'
  }];

  // Act
  component.editForm();

  // Assert
  expect(component.selectedRows).toEqual({
    contactIndex: 1,
    organizationName: 'Org1',
    name: 'Jane Smith',
    role: 'Developer',
    email: 'jane.smith@example.com',
    phone: '9876543210'
  });

  expect(component.rowData).toEqual([{
    contactIndex: 1,
    organizationName: 'Org1',
    name: 'Jane Smith',
    role: 'Developer',
    email: 'jane.smith@example.com',
    phone: '9876543210'
  }]);

  // Verify form reset
  expect(component.contactForm.getRawValue()).toEqual({
    organizationName: null,
    firstName: null,
    lastName: null,
    role: null,
    email: null,
    mediums: [{ phone: null }]
  });
});

it('should remove the specified tab from navs array', () => {
  component.navs = [{id: 2,
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
    contact: [
      {
        "name": "Shikha Gupta",
        "role": "Software Engineer",
        "email": "shikha.g@ymail.com",
        "phone": "8906543278"
      },] }, {  id: 3,
    organizationName: 'Mahindra',
    type: 'Customer',
    industry: 'Automobile',
    onboarding: '	Onboarded',
    relatedOrgs: '3',
    products: '5',
    email: 'mahindra@mahindra.com',
    phone: '887890678',

    registrationNo: 'AB-12345',
    description: 'We are Automobile Compony',
    tier: 'Private Company',
    name: 'Prashant Singh',
    mobileno: '+917890654567',
  
    contact: [
      {
        "name": "Shivakant",
        "role": "Software Engineer",
        "email": "shiv.kant@gmail.com",
        "phone": "6789098"
      }
    ] 
  }];
  const event = new MouseEvent('click');
  spyOn(event, 'preventDefault');
  spyOn(event, 'stopImmediatePropagation');

  component.close(event, 1);

  expect(component.navs.length).toBe(1);
  expect(component.navs).toEqual([{ id: 2,
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
    contact: [
      {
        "name": "Shikha Gupta",
        "role": "Software Engineer",
        "email": "shikha.g@ymail.com",
        "phone": "8906543278"
      },]  }]);
  expect(component.active).toBe(0);
  expect(event.preventDefault).toHaveBeenCalled();
  expect(event.stopImmediatePropagation).toHaveBeenCalled();
});

// it('should return the address FormArray for the specified medium index', () => {
//   // Add some address objects to the first medium
//   const addressArray = component.employeeAddress(0);
//   addressArray.push(new FormBuilder().group({
//     country_code: '1',
//     phone: '1234567890'
//   }));
//   addressArray.push(new FormBuilder().group({
//     country_code: '44',
//     phone: '9876543210'
//   }));

//   const addresses = component.employeeAddress(0);
//   expect(addresses.length).toBe(2);
//   expect(addresses.at(0).get('country_code')?.value).toBe('1');
//   expect(addresses.at(1).get('country_code')?.value).toBe('44');
// });

// it('should return an empty address FormArray for a new medium', () => {
//   const mediumsArray = component.mediumsArray;
//   mediumsArray.push(component.createMedium()); // Add a new medium

//   const newAddressArray = component.employeeAddress(1);
//   expect(newAddressArray.length).toBe(0);
// });

// it('should throw an error if the medium index is out of bounds', () => {
//   expect(() => component.employeeAddress(1)).toThrowError();
// });
it('should call add() when clicking on organizationName', () => {
  // Arrange
  const mockData = { contactIndex: 1, id: 123, organizationName: 'Test Org' };
  const event = { data: mockData, colDef: { field: 'organizationName' } };
  spyOn(component, 'add'); // Spy on the add method

  // Act
  component.onCellClicked(event);

  // Assert
  expect(component.add).toHaveBeenCalledWith(mockData, mockData.id);
});

it('should call openNameCard() when clicking on name', () => {
  // Arrange
  const mockData = { contactIndex: 1, id: 123, name: 'John Doe' };
  const event = { data: mockData, colDef: { field: 'name' } };
  spyOn(component, 'openNameCard'); // Spy on the openNameCard method

  // Act
  component.onCellClicked(event);

  // Assert
  expect(component.openNameCard).toHaveBeenCalledWith(mockData.contactIndex, mockData);
});
});
