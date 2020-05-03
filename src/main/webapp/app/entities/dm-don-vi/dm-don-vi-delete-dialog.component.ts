import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDmDonVi } from 'app/shared/model/dm-don-vi.model';
import { DmDonViService } from './dm-don-vi.service';

@Component({
  selector: 'jhi-dm-don-vi-delete-dialog',
  templateUrl: './dm-don-vi-delete-dialog.component.html'
})
export class DmDonViDeleteDialogComponent {
  dmDonVi: IDmDonVi;

  constructor(protected dmDonViService: DmDonViService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.dmDonViService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'dmDonViListModification',
        content: 'Deleted an dmDonVi'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-dm-don-vi-delete-popup',
  template: ''
})
export class DmDonViDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dmDonVi }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DmDonViDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.dmDonVi = dmDonVi;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/dm-don-vi', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/dm-don-vi', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
