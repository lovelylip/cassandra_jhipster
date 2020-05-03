import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IDmDonVi, DmDonVi } from 'app/shared/model/dm-don-vi.model';
import { DmDonViService } from './dm-don-vi.service';

@Component({
  selector: 'jhi-dm-don-vi-update',
  templateUrl: './dm-don-vi-update.component.html'
})
export class DmDonViUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    ma: [null, [Validators.required]],
    ten: [null, [Validators.required]],
    maTinh: [],
    maHuyen: [],
    maXa: []
  });

  constructor(protected dmDonViService: DmDonViService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ dmDonVi }) => {
      this.updateForm(dmDonVi);
    });
  }

  updateForm(dmDonVi: IDmDonVi) {
    this.editForm.patchValue({
      id: dmDonVi.id,
      ma: dmDonVi.ma,
      ten: dmDonVi.ten,
      maTinh: dmDonVi.maTinh,
      maHuyen: dmDonVi.maHuyen,
      maXa: dmDonVi.maXa
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const dmDonVi = this.createFromForm();
    if (dmDonVi.id !== undefined) {
      this.subscribeToSaveResponse(this.dmDonViService.update(dmDonVi));
    } else {
      this.subscribeToSaveResponse(this.dmDonViService.create(dmDonVi));
    }
  }

  private createFromForm(): IDmDonVi {
    return {
      ...new DmDonVi(),
      id: this.editForm.get(['id']).value,
      ma: this.editForm.get(['ma']).value,
      ten: this.editForm.get(['ten']).value,
      maTinh: this.editForm.get(['maTinh']).value,
      maHuyen: this.editForm.get(['maHuyen']).value,
      maXa: this.editForm.get(['maXa']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDmDonVi>>) {
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
