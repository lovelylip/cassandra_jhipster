import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CassilkSharedModule } from 'app/shared/shared.module';
import { DmDonViComponent } from './dm-don-vi.component';
import { DmDonViDetailComponent } from './dm-don-vi-detail.component';
import { DmDonViUpdateComponent } from './dm-don-vi-update.component';
import { DmDonViDeletePopupComponent, DmDonViDeleteDialogComponent } from './dm-don-vi-delete-dialog.component';
import { dmDonViRoute, dmDonViPopupRoute } from './dm-don-vi.route';

const ENTITY_STATES = [...dmDonViRoute, ...dmDonViPopupRoute];

@NgModule({
  imports: [CassilkSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DmDonViComponent,
    DmDonViDetailComponent,
    DmDonViUpdateComponent,
    DmDonViDeleteDialogComponent,
    DmDonViDeletePopupComponent
  ],
  entryComponents: [DmDonViDeleteDialogComponent]
})
export class CassilkDmDonViModule {}
