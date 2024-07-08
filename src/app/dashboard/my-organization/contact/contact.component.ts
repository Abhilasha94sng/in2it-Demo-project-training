import { Component, OnInit } from '@angular/core';
import { MyorganizationServiceService } from '../myorganization-service.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColDef, GridOptions } from 'ag-grid-community';
import { CustomCellComponent } from 'src/app/shared/shared/custom-cell/custom-cell.component';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  active: number = 1;
  contactType: string = 'All';
  showTable: any;
  flag: boolean = false;
  totalLength: number = 0;
  contactForm!: FormGroup;
  showCard: boolean = false;
  formData: any;
  selectedOrganization!: string;
  showEditButton: boolean = false;
  showFormCard: boolean = false;
  viewCard: boolean = false;
  viewForm: boolean = false;
  count: number = 0;
  checkedContact: any;
  checkedDataArray: any[] = [];
  arrayData: any;
  editMode: boolean = false;
  editIndex!: number;
  gridOption!: GridOptions;

  navs = [
    {
      id: 0,
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
      name: '',
      mobileno: '',
      contact: [
        {
          name: '',
          role: '',
          email: '',
          phone: '',
        },
      ],
    },
  ];
  rowData!: any[];

  public orgData: any[] = [];
  public colDefs: ColDef[] = [
    {
      field: 'organizationName',
      minWidth: 170,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      // cellRenderer: (params: any) => {
      //   return `<a href="javascript:void(0);" class="name-link">${params.value}</a>`;
      // },
      cellRenderer: CustomCellComponent,
    },
    {
      field: 'name',
      // cellRenderer: (params: any) => {
      //   return `<a href="javascript:void(0);" class="name-link">${params.value}</a>`;
      // },
      cellRenderer: CustomCellComponent,
    },
    { field: 'role' },
    { field: 'email' },
    { field: 'phone' },
  ];
  constructor(
    public orgService: MyorganizationServiceService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  tableData!: any;

  globalContactIndex = 0;
  ngOnInit(): void {
    this.count = this.calculateTotalContacts();
    // this.orgService.orgData.forEach(org => {
    //   org.contact.forEach(contact => {
    //     const contactWithOrgName = {
    //       id: org.id,
    //       organizationName: org.organizationName,
    //       ...contact
    //     };

    //     this.rowData.push(contactWithOrgName);
    //   });
    // });

    this.rowData = [];

    this.orgService.orgData.forEach((org) => {
      org.contact.forEach((contact) => {
        const contactWithOrgName = {
          ...contact,
          contactIndex: this.globalContactIndex,
          organizationName: org.organizationName,
          id: org.id,
        };
        // console.log(contactWithOrgName)
        this.rowData.push(contactWithOrgName);

        this.globalContactIndex++;
      });
    });

    this.filteredTable = this.orgService.orgData;
    this.showTable = this.orgService.orgData;
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(12)]],
      lastName: ['', Validators.required],
      organizationName: ['', Validators.required],
      mediums: this.fb.array([this.createMedium()]),
      role: ['', Validators.required],
      additionalRole: [''],
      remarks: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.calculateTotalContacts();
    this.initializeUniqueRoles();
    this.gridOption = {
      context: {
        parentComponent: this,
        parent: 'contact',
      },
    };
  }
  // style: any
  // setWidthAndHeight(width: string, height: string) {
  //   this.style = {
  //     width: width,
  //     height: height,
  //   };
  // }
  // fillMedium() {
  //   this.setWidthAndHeight("60%", "100%");
  // }
  calculateTotalContacts() {
    let totalContacts = 0;
    for (const org of this.orgService.orgData) {
      totalContacts += org.contact.length;
    }
    return totalContacts;
  }
  close(event: MouseEvent, toRemove: number) {
    this.navs.splice(toRemove, 1);
    this.active = 0;
    event.preventDefault();
    event.stopImmediatePropagation();
  }
  selectedContact: any;
  organizationName: string = 'All';
  selectedContactIndex: number | null = null;
  // filterOrgData(filter: any) {
  //   this.organizationName = filter;
  //   if (filter === 'All') {
  //     this.showTable = this.orgService.orgData;
  //   } else {
  //     this.showTable = this.orgService.orgData.filter(
  //       (data) => data.organizationName === filter
  //     );
  //   }
  // }
  filterOrgData(orgName: string): void {
    this.organizationName = orgName;
    this.rowData = [];

    this.orgService.orgData.forEach((org, orgIndex) => {
      if (orgName === 'All' || org.organizationName === orgName) {
        org.contact.forEach((contact, contactIndex) => {
          const contactWithOrgName = {
            ...contact,
            contactIndex,
            orgIndex,
            organizationName: org.organizationName,
            id: org.id,
          };
          this.rowData.push(contactWithOrgName);
        });
      }
    });
  }
  checkExisitingTab(id: number) {
    this.flag = false;
    this.navs.some((data) => {
      if (data.id === id) {
        this.flag = true;
        return true;
      }
      return false;
    });
  }
  add(data: any, id: any) {
    this.router.navigate(['/myorganization/organization'], {
      state: { data, id },
    });
  }
  createMedium(): FormGroup {
    return this.fb.group({
      country_code: ['', Validators.required],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
      address: this.fb.array([]),
    });
  }
  get mediumsArray(): FormArray {
    return this.contactForm.get('mediums') as FormArray;
  }
  addMedium() {
    this.mediumsArray.push(this.createMedium());
  }
  removeMedium(index: number) {
    this.mediumsArray.removeAt(index);
  }
  cancel() {
    this.showCard = false;
  }
 

  save() {
    Object.values(this.contactForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  
    if (this.contactForm.valid) {
      this.formData = this.contactForm.value;
      console.log(this.formData);
  
      // Create the new contact object
      const newContact = {
        name: this.formData.firstName + ' ' + this.formData.lastName,
        role: this.formData.role,
        email: this.formData.email,
        phone: this.formData.mediums[0].phone,
        organizationName: this.formData.organizationName
      };
  
      // Find the organization in the rowData
      const organization = this.orgService.orgData.find(
        (org: any) => org.organizationName === this.formData.organizationName
      );
  
      if (organization) {
        // Add the new contact to the organization
        if (!Array.isArray(organization.contact)) {
          organization.contact = [];
        }
        organization.contact.push(newContact);
        
        // Refresh the rowData array
        this.rowData = [];
        this.orgService.orgData.forEach((org) => {
          org.contact.forEach((contact) => {
            const contactWithOrgName = {
              ...contact,
              organizationName: org.organizationName,
              id: org.id
            };
            this.rowData.push(contactWithOrgName);
          });
        });
  
        // Hide the form card
        this.showCard = false;
      } else {
        console.log('Organization not found');
      }
    } else {
      console.log('Form is invalid');
    }
  }
  
  openCard() {
    this.contactForm.reset();
    this.contactForm.enable();
    this.showCard = true;
    this.viewForm = true;
    this.viewCard = false;
    this.editMode = false;
  }
  clearInfo() {
    Object.keys(this.contactForm.controls).forEach((controlName) => {
      const control = this.contactForm.get(controlName);
      if (control && control.enabled) {
        control.reset();
      }
    });
  }
  openNameCard(index: number, contactDetail: any) {
    this.editMode = true;
    this.editIndex = index;
    this.selectedContact = contactDetail;
    this.viewCard = true;
    this.showCard = true;
    this.viewForm = false;
  }

  editContact() {
    this.selectedContact = this.selectedRows;
    console.log(this.selectedContact);
    if (this.selectedContact) {
      const nameParts = this.selectedContact[0].name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts[1] || '';

      this.contactForm.patchValue({
        firstName: firstName,
        lastName: lastName,
        organizationName: this.selectedContact[0].organizationName,
        role: this.selectedContact[0].role,
        email: this.selectedContact[0].email,
      });
      const mediumsArray = this.contactForm.get('mediums') as FormArray;
      if (mediumsArray.length > 0) {
        const firstMediumGroup = mediumsArray.at(0) as FormGroup;
        const phoneNumber = this.selectedContact[0].phone;
        firstMediumGroup.patchValue({
          phone: phoneNumber,
        });
      }

      this.contactForm.get('organizationName')?.disable();
      this.viewForm = true;

      this.editMode = true;
      this.viewCard = false;
      this.showCard = true;
    }
  }
  checkboxData!: any;
  checkboxContact!: any;
  closeCard() {
    this.viewCard = false;
    this.showCard = false;
  }
  editForm() {
    console.log('gsg');
    console.log(this.contactForm);
    const mediumsArray = this.contactForm.get('mediums') as FormArray;
    const phone = mediumsArray.at(0).get('phone')?.value;
    if (this.contactForm.valid && this.selectedRows) {
      console.log(this.contactForm);

      const updatedContact = {
        ...this.selectedRows[0],
        organizationName: this.selectedRows[0].organizationName || this.contactForm.value.organizationName,
        name: `${this.contactForm.value.firstName} ${this.contactForm.value.lastName}`,
        role: this.contactForm.value.role,
        email: this.contactForm.value.email,
        phone: phone,
      };
      console.log(this.selectedContact);
      this.contactForm.reset();
      this.contactForm.enable();
      // this.showCard = false;
      // this.viewForm = false;

      const index = this.rowData.findIndex(
        (contact) => contact.contactIndex === this.selectedRows[0].contactIndex
      );
      console.log('Index:', index);

      if (index > -1) {
        this.rowData[index] = updatedContact;
        console.log(updatedContact);

        this.selectedRows = updatedContact;
        console.log('Selected Contact:', this.selectedRows);
        this.rowData = [...this.rowData];
      }
    }
    this.viewForm = false;
    this.viewCard = false;
    this.showCard = false;
  }
  employeeAddress(index: number): FormArray {
    return this.mediumsArray.at(index).get('address') as FormArray;
  }
  removeEmployeeAddress(phoneIndex: number, addressIndex: number) {
    this.employeeAddress(phoneIndex).removeAt(addressIndex);
  }
  addEmployeeAddress(index: number) {
    this.employeeAddress(index).push(this.newAddress());
  }
  newAddress() {
    return this.fb.group({
      address: '',
    });
  }
  // openViewCard(contact: any) {
  //   this.selectedContact = contact;
  //   this.showCard = true;
  //   this.viewCard = true;
  //   this.viewForm = false;
  // }
  selectCheckbox(org: any, index: number) {
    this.checkboxData = org;
    this.checkboxContact = index;
    org.contact[index].selected = !org.contact[index].selected;
    if (org.contact[index].selected) {
      this.checkedContact = org.contact[index];
      this.checkedContact.organizationName = org.organizationName;
      this.checkedDataArray.push(this.checkedContact);
      this.arrayData = this.checkedDataArray[0];
    } else {
      const uncheckedIndex = this.checkedDataArray.findIndex(
        (contact) => contact === org.contact[index]
      );
      if (uncheckedIndex !== -1) {
        this.checkedDataArray.splice(uncheckedIndex, 1);
      }
      this.arrayData = this.checkedDataArray[0];
    }
    this.updateCount();
  }
  updateCount() {
    this.rowData = this.rowData.filter(
      (row) => !this.selectedRows.includes(row)
    );
    this.count = this.rowData.length;
    console.log(this.count);

    console.log('Count of selected contacts:', this.count);
  }
  updateOrgContactCount(): void {
    this.orgService.orgData.forEach((org) => {
      const matchedRows = this.rowData.filter((row) => row.id === org.id);
      console.log(matchedRows);

      if (matchedRows.length > 0) {
        org.contact.length = matchedRows.reduce((total) => total + 1, 0);
      } else {
        org.contact.length = 0;
      }
    });
  }
  selectedRows: any;
  deleteSelectedContacts(_event: any): void {
    this.rowData = this.rowData.filter(
      (row) => !this.selectedRows.includes(row)
    );
    console.log('Updated rowData:', this.rowData);
    this.updateCount();
    // this.updateOrgContactCount()
  }
  selectCount: any;
  selectedRow(event: any) {
    console.log(event.length);
    this.selectCount = event.length;
    this.selectedRows = event;
    //  this.editContact();
  }
  uniqueRoles: string[] = [];

  initializeUniqueRoles(): void {
    const roles: string[] = [];
    this.showTable.forEach((org: any) => {
      org.contact.forEach((contact: any) => {
        roles.push(contact.role);
      });
    });
    this.uniqueRoles = Array.from(new Set(roles));
  }
  filteredTable: any[] = [];
  searchText: string = '';
  search(): void {
    const searchTextLower = this.searchText.toLowerCase().trim();
    if (searchTextLower === '') {
      this.rowData = this.orgService.orgData;
    } else {
      this.rowData = [];
      this.orgService.orgData.forEach((org: any) => {
        const matchedContact = org.contact.find(
          (contact: any) =>
            contact.name.toLowerCase().includes(searchTextLower) ||
            contact.role.toLowerCase().includes(searchTextLower)
        );
        if (matchedContact) {
          this.rowData.push({
            ...org,
            contact: [matchedContact],
          });
        }
      });
    }
  }

  onCellClicked(event: any) {
    console.log('fve');

    const clickedContact = event.data;
    const contactIndex = clickedContact.contactIndex;
    console.log(contactIndex);
    if (event.colDef.field === 'organizationName') {
      this.add(event.data, event.data.id);
    } else if (event.colDef.field === 'name') {
      console.log('fgh');
      this.openNameCard(contactIndex, clickedContact);
    }
  }
}
