import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CassilkTestModule } from '../../../test.module';
import { DmCqbhDeleteDialogComponent } from 'app/entities/dm-cqbh/dm-cqbh-delete-dialog.component';
import { DmCqbhService } from 'app/entities/dm-cqbh/dm-cqbh.service';

describe('Component Tests', () => {
  describe('DmCqbh Management Delete Component', () => {
    let comp: DmCqbhDeleteDialogComponent;
    let fixture: ComponentFixture<DmCqbhDeleteDialogComponent>;
    let service: DmCqbhService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CassilkTestModule],
        declarations: [DmCqbhDeleteDialogComponent]
      })
        .overrideTemplate(DmCqbhDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DmCqbhDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DmCqbhService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete('9fec3727-3421-4967-b213-ba36557ca194');
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith('9fec3727-3421-4967-b213-ba36557ca194');
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
