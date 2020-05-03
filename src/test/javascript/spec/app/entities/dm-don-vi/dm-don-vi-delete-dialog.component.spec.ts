import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CassilkTestModule } from '../../../test.module';
import { DmDonViDeleteDialogComponent } from 'app/entities/dm-don-vi/dm-don-vi-delete-dialog.component';
import { DmDonViService } from 'app/entities/dm-don-vi/dm-don-vi.service';

describe('Component Tests', () => {
  describe('DmDonVi Management Delete Component', () => {
    let comp: DmDonViDeleteDialogComponent;
    let fixture: ComponentFixture<DmDonViDeleteDialogComponent>;
    let service: DmDonViService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CassilkTestModule],
        declarations: [DmDonViDeleteDialogComponent]
      })
        .overrideTemplate(DmDonViDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DmDonViDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DmDonViService);
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
