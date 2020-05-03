import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CassilkTestModule } from '../../../test.module';
import { DmDonViDetailComponent } from 'app/entities/dm-don-vi/dm-don-vi-detail.component';
import { DmDonVi } from 'app/shared/model/dm-don-vi.model';

describe('Component Tests', () => {
  describe('DmDonVi Management Detail Component', () => {
    let comp: DmDonViDetailComponent;
    let fixture: ComponentFixture<DmDonViDetailComponent>;
    const route = ({ data: of({ dmDonVi: new DmDonVi('9fec3727-3421-4967-b213-ba36557ca194') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CassilkTestModule],
        declarations: [DmDonViDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DmDonViDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DmDonViDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.dmDonVi).toEqual(jasmine.objectContaining({ id: '9fec3727-3421-4967-b213-ba36557ca194' }));
      });
    });
  });
});
