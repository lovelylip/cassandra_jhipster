import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDmCqbh } from 'app/shared/model/dm-cqbh.model';
import { DmCqbhService } from './dm-cqbh.service';

@Component({
  selector: 'jhi-dm-cqbh-delete-dialog',
  templateUrl: './dm-cqbh-delete-dialog.component.html'
})
export class DmCqbhDeleteDialogComponent {
  dmCqbh: IDmCqbh;

  constructor(protected dmCqbhService: DmCqbhService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.dmCqbhService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'dmCqbhListModification',
        content: 'Deleted an dmCqbh'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-dm-cqbh-delete-popup',
  template: ''
})
export class DmCqbhDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dmCqbh }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DmCqbhDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.dmCqbh = dmCqbh;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/dm-cqbh', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/dm-cqbh', { outlets: { popup: null } }]);
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
