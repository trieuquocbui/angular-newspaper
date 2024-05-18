import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../common/modal/modal.component';
import { ModalDirective } from 'src/app/directives/modal.directive';
import { PaginationComponent } from '../common/pagination/pagination.component';
import { ProfileComponent } from '../common/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports:[
    ModalComponent,
    ModalDirective,
    PaginationComponent,
    ProfileComponent,
  ],
  declarations: [
    ModalComponent,
    ModalDirective,
    PaginationComponent,
    ProfileComponent,
  ]
})
export class ShareModule { }
