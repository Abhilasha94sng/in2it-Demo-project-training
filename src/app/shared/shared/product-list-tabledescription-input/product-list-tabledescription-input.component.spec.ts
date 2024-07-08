import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListTabledescriptionInputComponent } from './product-list-tabledescription-input.component';

describe('ProductListTabledescriptionInputComponent', () => {
  let component: ProductListTabledescriptionInputComponent;
  let fixture: ComponentFixture<ProductListTabledescriptionInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListTabledescriptionInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListTabledescriptionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
