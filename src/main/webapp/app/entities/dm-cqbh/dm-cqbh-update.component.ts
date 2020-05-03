import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IDmCqbh, DmCqbh } from 'app/shared/model/dm-cqbh.model';
import { DmCqbhService } from './dm-cqbh.service';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Observer, Subscription } from 'rxjs';
import { JhiTrackerService } from 'app/core/tracker/tracker.service';
import { Location } from '@angular/common';
import { CSRFService } from 'app/core/auth/csrf.service';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'webstomp-client';

@Component({
  selector: 'jhi-dm-cqbh-update',
  templateUrl: './dm-cqbh-update.component.html'
})
export class DmCqbhUpdateComponent implements OnInit {
  isSaving: boolean;
  stompClient = null;
  subscriber = null;
  connection: Promise<any>;
  connectedPromise: any;
  listener: Observable<any>;
  listenerObserver: Observer<any>;
  alreadyConnectedOnce = false;
  private subscription: Subscription;

  editForm = this.fb.group({
    id: [],
    ma: [null, [Validators.required]],
    ten: [null, [Validators.required]],
    maCha: [],
    tenCha: [],
    diaChi: [],
    path: [],
    maTinh: [],
    maHuyen: [],
    maXa: []
  });

  constructor(
    protected dmCqbhService: DmCqbhService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private trackerService: JhiTrackerService,
    private location: Location,
    private csrfService: CSRFService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ dmCqbh }) => {
      this.updateForm(dmCqbh);
    });
  }

  updateForm(dmCqbh: IDmCqbh) {
    this.editForm.patchValue({
      id: dmCqbh.id,
      ma: dmCqbh.ma,
      ten: dmCqbh.ten,
      maCha: dmCqbh.maCha,
      tenCha: dmCqbh.tenCha,
      diaChi: dmCqbh.diaChi,
      path: dmCqbh.path,
      maTinh: dmCqbh.maTinh,
      maHuyen: dmCqbh.maHuyen,
      maXa: dmCqbh.maXa
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const dmCqbh = this.createFromForm();

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
      // this.connectedPromise('success');
      // this.connectedPromise = null;
      this.trackerService.sendActivityDmCqbh(dmCqbh);
      if (!this.alreadyConnectedOnce) {
        this.subscription = this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
            this.trackerService.sendActivityDmCqbh(dmCqbh);
          }
        });
        this.alreadyConnectedOnce = true;
      }
    });

    if (dmCqbh.id !== undefined) {
      this.subscribeToSaveResponse(this.dmCqbhService.update(dmCqbh));
    } else {
      this.subscribeToSaveResponse(this.dmCqbhService.create(dmCqbh));
    }
  }

  private createConnection(): Promise<any> {
    return new Promise((resolve, reject) => (this.connectedPromise = resolve));
  }

  private createFromForm(): IDmCqbh {
    return {
      ...new DmCqbh(),
      id: this.editForm.get(['id']).value,
      ma: this.editForm.get(['ma']).value,
      ten: this.editForm.get(['ten']).value,
      maCha: this.editForm.get(['maCha']).value,
      tenCha: this.editForm.get(['tenCha']).value,
      diaChi: this.editForm.get(['diaChi']).value,
      path: this.editForm.get(['path']).value,
      maTinh: this.editForm.get(['maTinh']).value,
      maHuyen: this.editForm.get(['maHuyen']).value,
      maXa: this.editForm.get(['maXa']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDmCqbh>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
