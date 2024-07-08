import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {
  contactForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      contactInfo: this.formBuilder.array([
        this.createContact()
      ])
    });
  }
  createContact(): FormGroup {
    return this.formBuilder.group({
      email: '',
      phone: ''
    });
  }

  get contactInfoArray(): FormArray {
    return this.contactForm.get('contactInfo') as FormArray;
  }

  addContact() {
    this.contactInfoArray.push(this.createContact());
  }

  removeContact(index: number) {
    this.contactInfoArray.removeAt(index);
  }

//   selectedRow: { orgName: string, contact: any } | null = null;
// isSelected(orgName: string, contact: any): boolean {
//   return this.selectedOrg === orgName && this.selectedContact === contact;
// }
// selectedOrg: string | null = null;
// updateSelected(checked: boolean, orgName: string, contact: any) {
//   if (checked) {
//     this.showCard = true;
//     this.showContactForm = false;
//     this.selectedOrg = orgName;
//     this.selectedContact = contact; 
//   } else {
//     this.showCard = false;
//     this.selectedOrg = null;
//     this.selectedContact = null;
//   }
// }

}
