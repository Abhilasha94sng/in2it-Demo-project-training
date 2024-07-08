import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListTablenameInputComponent } from './product-list-tablename-input.component';

describe('ProductListTablenameInputComponent', () => {
  let component: ProductListTablenameInputComponent;
  let fixture: ComponentFixture<ProductListTablenameInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListTablenameInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListTablenameInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
