import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDmDonVi } from 'app/shared/model/dm-don-vi.model';

@Component({
  selector: 'jhi-dm-don-vi-detail',
  templateUrl: './dm-don-vi-detail.component.html'
})
export class DmDonViDetailComponent implements OnInit {
  dmDonVi: IDmDonVi;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dmDonVi }) => {
      this.dmDonVi = dmDonVi;
    });
  }

  previousState() {
    window.history.back();
  }
}
