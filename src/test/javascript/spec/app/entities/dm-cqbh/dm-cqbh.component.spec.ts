import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CassilkTestModule } from '../../../test.module';
import { DmCqbhComponent } from 'app/entities/dm-cqbh/dm-cqbh.component';
import { DmCqbhService } from 'app/entities/dm-cqbh/dm-cqbh.service';
import { DmCqbh } from 'app/shared/model/dm-cqbh.model';

describe('Component Tests', () => {
  describe('DmCqbh Management Component', () => {
    let comp: DmCqbhComponent;
    let fixture: ComponentFixture<DmCqbhComponent>;
    let service: DmCqbhService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CassilkTestModule],
        declarations: [DmCqbhComponent],
        providers: []
      })
        .overrideTemplate(DmCqbhComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DmCqbhComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DmCqbhService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DmCqbh('9fec3727-3421-4967-b213-ba36557ca194')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.dmCqbhs[0]).toEqual(jasmine.objectContaining({ id: '9fec3727-3421-4967-b213-ba36557ca194' }));
    });
  });
});
