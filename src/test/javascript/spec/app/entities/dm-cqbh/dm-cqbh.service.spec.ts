import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import { DmCqbhService } from 'app/entities/dm-cqbh/dm-cqbh.service';
import { IDmCqbh, DmCqbh } from 'app/shared/model/dm-cqbh.model';

describe('Service Tests', () => {
  describe('DmCqbh Service', () => {
    let injector: TestBed;
    let service: DmCqbhService;
    let httpMock: HttpTestingController;
    let elemDefault: IDmCqbh;
    let expectedResult;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(DmCqbhService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new DmCqbh('ID', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find('9fec3727-3421-4967-b213-ba36557ca194')
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a DmCqbh', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID'
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new DmCqbh(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a DmCqbh', () => {
        const returnedFromService = Object.assign(
          {
            ma: 'BBBBBB',
            ten: 'BBBBBB',
            maCha: 'BBBBBB',
            tenCha: 'BBBBBB',
            diaChi: 'BBBBBB',
            path: 'BBBBBB',
            maTinh: 'BBBBBB',
            maHuyen: 'BBBBBB',
            maXa: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of DmCqbh', () => {
        const returnedFromService = Object.assign(
          {
            ma: 'BBBBBB',
            ten: 'BBBBBB',
            maCha: 'BBBBBB',
            tenCha: 'BBBBBB',
            diaChi: 'BBBBBB',
            path: 'BBBBBB',
            maTinh: 'BBBBBB',
            maHuyen: 'BBBBBB',
            maXa: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a DmCqbh', () => {
        service.delete('9fec3727-3421-4967-b213-ba36557ca194').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
