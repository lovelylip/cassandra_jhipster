import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IDmCqbh } from 'app/shared/model/dm-cqbh.model';
import { AccountService } from 'app/core/auth/account.service';
import { DmCqbhService } from './dm-cqbh.service';

@Component({
  selector: 'jhi-dm-cqbh',
  templateUrl: './dm-cqbh.component.html'
})
export class DmCqbhComponent implements OnInit, OnDestroy {
  dmCqbhs: IDmCqbh[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(protected dmCqbhService: DmCqbhService, protected eventManager: JhiEventManager, protected accountService: AccountService) {}

  loadAll() {
    this.dmCqbhService
      .query()
      .pipe(
        filter((res: HttpResponse<IDmCqbh[]>) => res.ok),
        map((res: HttpResponse<IDmCqbh[]>) => res.body)
      )
      .subscribe((res: IDmCqbh[]) => {
        this.dmCqbhs = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDmCqbhs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDmCqbh) {
    return item.id;
  }

  registerChangeInDmCqbhs() {
    this.eventSubscriber = this.eventManager.subscribe('dmCqbhListModification', response => this.loadAll());
  }
}
