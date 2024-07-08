import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MyorganizationServiceService } from './myorganization-service.service';

describe('MyorganizationServiceService', () => {
  let service: MyorganizationServiceService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MyorganizationServiceService]
    });
    service = TestBed.inject(MyorganizationServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return expected products (HttpClient called once)', () => {
    const expectedProducts = [
      { id: 1, name: 'Product1' },
      { id: 2, name: 'Product2' }
    ];

    service.getProducts().subscribe(products => {
      expect(products).toEqual(expectedProducts);
    });

    const req = httpTestingController.expectOne('/assets/product-data.json');
    expect(req.request.method).toEqual('GET');

    req.flush(expectedProducts);
  });

  it('should return an empty array when the server returns a 404', (done) => {
    service.getProducts().subscribe(products => {
      expect(products.length).toBe(0);
      expect(products).toEqual([]);
      done();
    });

    const req = httpTestingController.expectOne('/assets/product-data.json');
    expect(req.request.method).toEqual('GET');
    req.flush('404 error', { status: 404, statusText: 'Not Found' });
  });
  it('should return an observable for selected data', (done) => {
    const mockData = [{ id: 1, name: 'item1' }, { id: 2, name: 'item2' }];
    service.setSelectedData(mockData);
    service.getSelectedData().subscribe(data => {
      expect(data).toEqual(mockData);
      done();
    });
  });

  it('should return an empty array initially', (done) => {
    service.getSelectedData().subscribe(data => {
      expect(data).toEqual([]);
      done();
    });
  });

});
