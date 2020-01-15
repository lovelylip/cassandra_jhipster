import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CassilkTestModule } from '../../../test.module';
import { DmCqbhUpdateComponent } from 'app/entities/dm-cqbh/dm-cqbh-update.component';
import { DmCqbhService } from 'app/entities/dm-cqbh/dm-cqbh.service';
import { DmCqbh } from 'app/shared/model/dm-cqbh.model';

describe('Component Tests', () => {
  describe('DmCqbh Management Update Component', () => {
    let comp: DmCqbhUpdateComponent;
    let fixture: ComponentFixture<DmCqbhUpdateComponent>;
    let service: DmCqbhService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CassilkTestModule],
        declarations: [DmCqbhUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DmCqbhUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DmCqbhUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DmCqbhService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DmCqbh('9fec3727-3421-4967-b213-ba36557ca194');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new DmCqbh();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
