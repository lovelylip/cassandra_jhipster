import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CassilkSharedModule } from 'app/shared/shared.module';
import { DmCqbhComponent } from './dm-cqbh.component';
import { DmCqbhDetailComponent } from './dm-cqbh-detail.component';
import { DmCqbhUpdateComponent } from './dm-cqbh-update.component';
import { DmCqbhDeletePopupComponent, DmCqbhDeleteDialogComponent } from './dm-cqbh-delete-dialog.component';
import { dmCqbhRoute, dmCqbhPopupRoute } from './dm-cqbh.route';

const ENTITY_STATES = [...dmCqbhRoute, ...dmCqbhPopupRoute];

@NgModule({
  imports: [CassilkSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [DmCqbhComponent, DmCqbhDetailComponent, DmCqbhUpdateComponent, DmCqbhDeleteDialogComponent, DmCqbhDeletePopupComponent],
  entryComponents: [DmCqbhDeleteDialogComponent]
})
export class CassilkDmCqbhModule {}
