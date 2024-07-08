import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyorganizationServiceService {
  // getProductData() {
  //   throw new Error('Method not implemented.');
  // }
  selectedOrganization:any
  private organizationTypeSubject = new Subject<string>();
  organizationType$ = this.organizationTypeSubject.asObservable();
  orgData = [
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
        {
          "name": "Emily Davis",
          "role": "OrgSPOC",
          "email": "emily.davis@example.com",
          "phone": "555-5555"
        },
        {
          "name": "David Lee",
          "role": "System Administrator",
          "email": "david.lee@example.com",
          "phone": " 321-0987"
        },
        {
          "name": "Grace Wang",
          "role": "Marketing Specialist",
          "email": "grace.wang@example.com",
          "phone": "234-5678"
        }
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
        {
          "name": "Eshank Rana",
          "role": "Designer",
          "email": "eshank.r@gmail.com",
          "phone": "8907654356"
        },
        {
          "name": "Varun Dhavan",
          "role": "System Administrator",
          "email": "v.dhavan@yopmail.com",
          "phone": "7890909087"
        },
        {
          "name": "Gargi Gulati",
          "role": "Marketing Specialist",
          "email": "gargi.gulati@gmail.com",
          "phone": "6574890934"
        }
      ]
    },
    {
      id: '3',
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
      role:'Data Science Engineer',
      contact: [
        {
          "name": "Shivakant",
          "role": "Software Engineer",
          "email": "shiv.kant@gmail.com",
          "phone": "6789098"
        },
        {
          "name": "Micheal JaCKSON",
          "role": "Project Manager",
          "email": "micheal.jackson@ymail.com",
          "phone": "789034"
        },
        {
          "name": "Saurabh Ganguli",
          "role": "Designer",
          "email": "saurabh.g@gmail.com",
          "phone": "5678904536"
        },
        {
          "name": "Himmat Rajput",
          "role": "System Administrator",
          "email": "himmat.r@yahoo.com",
          "phone": " 6578900098"
        },
        {
          "name": "Shivraj Singh",
          "role": "Marketing Specialist",
          "email": "shivraj.s@gmail.com",
          "phone": "234-5678"
        }
      ]
    },
    {
      id: '4',
      organizationName: 'Infosys',
      type: 'Non Customer',
      industry: 'Software',
      onboarding: 'In process',
      relatedOrgs: '4',
      products: '0',
      email: 'infosys@iinfosys.com',
      phone: '887890678',

      registrationNo: 'IN-987',
      description: 'We are Software Compony',
      tier: 'Private Company',
      name: 'Kriti Gupta',
      mobileno: '+917895463456',
      role:'Data Science Engineer',
      contact: [
        {
          "name": "Anjali Sharma",
          "role": "Software Developer",
          "email": "anjali.sharma@example.com",
          "phone": "9876543210"
        },
        {
          "name": "Rahul Verma",
          "role": "Project Coordinator",
          "email": "rahul.verma@example.com",
          "phone": "8765432109"
        },
        {
          "name": "Priya Patel",
          "role": "UX/UI Designer",
          "email": "priya.patel@example.com",
          "phone": "7654321098"
        },
        {
          "name": "Kiran Kumar",
          "role": "System Analyst",
          "email": "kiran.kumar@example.com",
          "phone": "6543210987"
        },
        {
          "name": "Emma Smith",
          "role": "Marketing Manager",
          "email": "emma.smith@example.com",
          "phone": "345-6789"
        }
      ]
    },
    {
      id: '5',
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
      name: 'Varun Dhavan',
      mobileno: '+910987678954',
      role:'Data Science Engineer',
      contact: [
        {
          "name": "Rajesh Patel",
          "role": "Software Developer",
          "email": "rajesh.p@example.com",
          "phone": "+91 9876543210"
        },
        {
          "name": "Priya Singh",
          "role": "Project Coordinator",
          "email": "priya.s@example.com",
          "phone": "+91 8765432109"
        },
        {
          "name": "Amit Kumar",
          "role": "UX/UI Designer",
          "email": "amit.k@example.com",
          "phone": "+91 7654321098"
        },
        {
          "name": "Sneha Sharma",
          "role": "System Analyst",
          "email": "sneha.s@example.com",
          "phone": "+91 6543210987"
        },
        {
          "name": "John Doe",
          "role": "Marketing Manager",
          "email": "john.doe@example.com",
          "phone": "+1 (555) 345-6789"
        },
      ]
    },
    {
      id: '6',
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
      name: 'Shivani Rana',
      mobileno: '+918976342121',
      role:'Data Science Engineer',
      contact: [
        {
          "name": "Neha Gupta",
          "role": "Software Engineer",
          "email": "neha.g@example.com",
          "phone": "+91 9876543210"
        },
        {
          "name": "Arun Kumar",
          "role": "Project Manager",
          "email": "arun.k@example.com",
          "phone": "+91 8765432109"
        },
        {
          "name": "Deepika Verma",
          "role": "Designer",
          "email": "deepika.v@example.com",
          "phone": "+91 7654321098"
        },
        {
          "name": "Vikas Singh",
          "role": "System Administrator",
          "email": "vikas.s@example.com",
          "phone": "+91 6543210987"
        },
        {
          "name": "Aarti Sharma",
          "role": "Marketing Specialist",
          "email": "aarti.s@example.com",
          "phone": "+1 (555) 345-6789"
        },
        {
          "name": "Mohit Gupta",
          "role": "Software Developer",
          "email": "mohit.g@example.com",
          "phone": "+91 9876543210"
        },
      ]
    },
    {
      id: '7',
      organizationName: 'Microsoft',
      type: 'Non Customer',
      industry: 'Software',
      onboarding: '	Onboarded',
      relatedOrgs: '3',
      products: '10',
      email: 'microsoft@microsoft.com',
      phone: '887890678',

      registrationNo: 'M-7654',
      description: 'We are SoftwareCompony',
      tier: 'Private Company',
      name: 'Ankita Sharma',
      mobileno: '+919654321234',
      role:'Data Science Engineer',
      contact: [
        {
          "name": "Sonam Singh",
          "role": "Project Coordinator",
          "email": "sonam.s@example.com",
          "phone": "+91 8765432109"
        },
        {
          "name": "Sachin Kumar",
          "role": "UX/UI Designer",
          "email": "sachin.k@example.com",
          "phone": "+91 7654321098"
        },
        {
          "name": "Riya Sharma",
          "role": "System Analyst",
          "email": "riya.s@example.com",
          "phone": "+91 6543210987"
        },
        {
          "name": "Peter Smith",
          "role": "Marketing Manager",
          "email": "peter.s@example.com",
          "phone": "+1 (555) 345-6789"
        }
      ]
    },
    {
      id: '8',
      organizationName: 'Amazon',
      type: 'Non Customer',
      industry: 'Software',
      onboarding: '	Onboarded',
      relatedOrgs: '3',
      products: '0',
      email: 'amazon@amazon.com',
      phone: '887890678',

      registrationNo: 'Amazon-09',
      description: 'We are Software Compony',
      tier: 'Private Company',
      name: 'Viajy Singh',
      mobileno: '+918809767890',
      role:'Data Science Engineer',
      contact: [
        {
          "name": "Sara Khan",
          "role": "Software Developer",
          "email": "sara.k@example.com",
          "phone": "+91 9876543210"
        },
        {
          "name": "Rahul Sharma",
          "role": "Project Coordinator",
          "email": "rahul.s@example.com",
          "phone": "+91 8765432109"
        },
        {
          "name": "Priyanka Patel",
          "role": "UX/UI Designer",
          "email": "priyanka.p@example.com",
          "phone": "+91 7654321098"
        },
        {
          "name": "Rohit Kumar",
          "role": "System Analyst",
          "email": "rohit.k@example.com",
          "phone": "+91 6543210987"
        },
      ]
    },
    {
      id: '9',
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
      name: 'Aniket Ganguli',
      mobileno: '+916546789034',
      role:'Data Science Engineer',
      contact: [
        {
          "name": "Jessica Lee",
          "role": "Marketing Manager",
          "email": "jessica.l@example.com",
          "phone": "+1 (555) 345-6789"
        },
        {
          "name": "Vivek Verma",
          "role": "Software Developer",
          "email": "vivek.v@example.com",
          "phone": "+91 9876543210"
        },
        {
          "name": "Nisha Singh",
          "role": "Project Coordinator",
          "email": "nisha.s@example.com",
          "phone": "+91 8765432109"
        },
        {
          "name": "Aryan Gupta",
          "role": "UX/UI Designer",
          "email": "aryan.g@example.com",
          "phone": "+91 7654321098"
        },
        {
          "name": "Neeraj Sharma",
          "role": "System Analyst",
          "email": "neeraj.s@example.com",
          "phone": "+91 6543210987"
        },
        {
          "name": "Sophia Smith",
          "role": "Marketing Manager",
          "email": "sophia.s@example.com",
          "phone": "+1 (555) 345-6789"
        }
      ]
    },
  ];


  private selectedDataSubject = new BehaviorSubject<any[]>([]);
  selectedData$ = this.selectedDataSubject.asObservable();
  constructor(private http: HttpClient) { }
  // getProducts(): Observable<any[]> {
  //   return this.http.get<any[]>('/assets/product-data.json');
  // }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>('/assets/product-data.json').pipe(
      catchError(() => of([])) // Return an empty array on error
    );
  }
  setSelectedData(data: any[]): void {
    this.selectedDataSubject.next(data);
  }

  getSelectedData(): Observable<any[]> {
    return this.selectedData$;
  }
}
