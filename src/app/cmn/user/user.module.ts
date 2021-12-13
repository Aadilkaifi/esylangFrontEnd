import { BreadcrumModule } from './../breadcrum/breadcrum.module';
// import { FormsRoutingModule } from './../../all-modules/forms/forms-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamUsersComponent } from './team-users/team-users.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';


export const component = [
  UserComponent,
  UserListComponent,
  TeamListComponent,
  TeamUsersComponent,
  AddEditUserComponent];
@NgModule({
  declarations: [...component],
  imports: [
    CommonModule,
    UserRoutingModule,
    DataTablesModule,
    FormsModule,
    //FormsRoutingModule,
    BreadcrumModule,
    NgxPaginationModule,
    NgxIntlTelInputModule

  ]
})
export class UserModule { }
