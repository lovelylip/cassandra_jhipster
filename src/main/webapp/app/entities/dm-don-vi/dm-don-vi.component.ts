import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable, Observer, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';
import { Router, NavigationEnd } from '@angular/router';
import { IDmDonVi } from 'app/shared/model/dm-don-vi.model';
import { IDmCqbh, DmCqbh } from 'app/shared/model/dm-cqbh.model';
import { AccountService } from 'app/core/auth/account.service';
import { DmDonViService } from './dm-don-vi.service';
import { JhiTrackerService } from 'app/core/tracker/tracker.service';
import { Location } from '@angular/common';
import { CSRFService } from 'app/core/auth/csrf.service';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'webstomp-client';

@Component({
  selector: 'jhi-dm-don-vi',
  templateUrl: './dm-don-vi.component.html'
})
export class DmDonViComponent implements OnInit, OnDestroy {
  dmDonVis: IDmDonVi[];
  dmCqbh: DmCqbh;
  dmCqbhs: IDmCqbh;
  currentAccount: any;
  eventSubscriber: Subscription;
  isSaving: boolean;
  stompClient = null;
  subscriber = null;
  connection: Promise<any>;
  connectedPromise: any;
  listener: Observable<any>;
  listenerObserver: Observer<any>;
  alreadyConnectedOnce = false;
  dmCqbhJson: any;

  constructor(
    protected dmDonViService: DmDonViService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService,
    private trackerService: JhiTrackerService,
    private location: Location,
    private csrfService: CSRFService,
    private router: Router
  ) {}

  loadAll() {
    this.dmDonViService
      .query()
      .pipe(
        filter((res: HttpResponse<IDmDonVi[]>) => res.ok),
        map((res: HttpResponse<IDmDonVi[]>) => res.body)
      )
      .subscribe((res: IDmDonVi[]) => {
        this.dmDonVis = res;
      });
  }

  ngOnInit() {
    this.loadAll();

    if (this.connectedPromise === null) {
      this.connection = this.createConnection();
    }
    let url = '/websocket/tracker';
    url = this.location.prepareExternalUrl(url);
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
    const headers = {};
    headers['X-XSRF-TOKEN'] = this.csrfService.getCSRF('XSRF-TOKEN');
    this.stompClient.connect(headers, () => {
      this.dmCqbhJson = this.trackerService.subscribeDmCqbh();
      this.listener = this.trackerService.receive();
    });

    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDmDonVis();
  }

  private createConnection(): Promise<any> {
    return new Promise((resolve, reject) => (this.connectedPromise = resolve));
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDmDonVi) {
    return item.id;
  }

  registerChangeInDmDonVis() {
    this.eventSubscriber = this.eventManager.subscribe('dmDonViListModification', response => this.loadAll());
  }
}
