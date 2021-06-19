import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CompetitionsComponent} from "./competitions/competitions.component";

/**
 * routes of app
 */
const routes: Routes = [
  {path: '', component: CompetitionsComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
