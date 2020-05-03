import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CassilkTestModule } from '../../../test.module';
import { DmDonViComponent } from 'app/entities/dm-don-vi/dm-don-vi.component';
import { DmDonViService } from 'app/entities/dm-don-vi/dm-don-vi.service';
import { DmDonVi } from 'app/shared/model/dm-don-vi.model';

describe('Component Tests', () => {
  describe('DmDonVi Management Component', () => {
    let comp: DmDonViComponent;
    let fixture: ComponentFixture<DmDonViComponent>;
    let service: DmDonViService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CassilkTestModule],
        declarations: [DmDonViComponent],
        providers: []
      })
        .overrideTemplate(DmDonViComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DmDonViComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DmDonViService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DmDonVi('9fec3727-3421-4967-b213-ba36557ca194')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.dmDonVis[0]).toEqual(jasmine.objectContaining({ id: '9fec3727-3421-4967-b213-ba36557ca194' }));
    });
  });
});
