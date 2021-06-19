import {NgModule} from '@angular/core';
import {CompetitionsComponent} from '../competitions/competitions.component';
import {CommonModule} from "@angular/common";
import {MaterialModule} from "./material.module";


@NgModule({
  declarations: [CompetitionsComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CompetitionsComponent
  ]
})
export class ViewsModule {
}
