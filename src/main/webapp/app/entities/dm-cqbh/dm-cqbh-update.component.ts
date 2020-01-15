import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IDmCqbh, DmCqbh } from 'app/shared/model/dm-cqbh.model';
import { DmCqbhService } from './dm-cqbh.service';

import { JhiTrackerService } from 'app/core/tracker/tracker.service';

@Component({
  selector: 'jhi-dm-cqbh-update',
  templateUrl: './dm-cqbh-update.component.html'
})
export class DmCqbhUpdateComponent implements OnInit {
  isSaving: boolean;

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
    private trackerService: JhiTrackerService
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
    window.console.log(JSON.stringify(dmCqbh));
    window.console.log(JSON.parse(JSON.stringify(dmCqbh)));
    this.trackerService.sendActivityDmCqbh(dmCqbh);
    if (dmCqbh.id !== undefined) {
      this.subscribeToSaveResponse(this.dmCqbhService.update(dmCqbh));
    } else {
      this.subscribeToSaveResponse(this.dmCqbhService.create(dmCqbh));
    }
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
