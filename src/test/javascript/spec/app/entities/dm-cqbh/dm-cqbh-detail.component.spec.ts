import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CassilkTestModule } from '../../../test.module';
import { DmCqbhDetailComponent } from 'app/entities/dm-cqbh/dm-cqbh-detail.component';
import { DmCqbh } from 'app/shared/model/dm-cqbh.model';

describe('Component Tests', () => {
  describe('DmCqbh Management Detail Component', () => {
    let comp: DmCqbhDetailComponent;
    let fixture: ComponentFixture<DmCqbhDetailComponent>;
    const route = ({ data: of({ dmCqbh: new DmCqbh('9fec3727-3421-4967-b213-ba36557ca194') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CassilkTestModule],
        declarations: [DmCqbhDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DmCqbhDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DmCqbhDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.dmCqbh).toEqual(jasmine.objectContaining({ id: '9fec3727-3421-4967-b213-ba36557ca194' }));
      });
    });
  });
});
