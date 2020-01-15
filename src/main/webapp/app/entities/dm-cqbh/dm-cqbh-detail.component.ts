import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDmCqbh } from 'app/shared/model/dm-cqbh.model';

@Component({
  selector: 'jhi-dm-cqbh-detail',
  templateUrl: './dm-cqbh-detail.component.html'
})
export class DmCqbhDetailComponent implements OnInit {
  dmCqbh: IDmCqbh;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dmCqbh }) => {
      this.dmCqbh = dmCqbh;
    });
  }

  previousState() {
    window.history.back();
  }
}
