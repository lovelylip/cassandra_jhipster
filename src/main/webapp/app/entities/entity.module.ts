import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'dm-cqbh',
        loadChildren: () => import('./dm-cqbh/dm-cqbh.module').then(m => m.CassilkDmCqbhModule)
      },
      {
        path: 'dm-don-vi',
        loadChildren: () => import('./dm-don-vi/dm-don-vi.module').then(m => m.CassilkDmDonViModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class CassilkEntityModule {}
