import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { TeamListComponent } from './team-list/team-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: '', component: UserComponent,
    children: [
      { path: 'users', component: UserListComponent },
      { path: 'teams', component: TeamListComponent },
      { path: 'add-user', component: AddEditUserComponent },
      { path: 'edit-user/:id', component: AddEditUserComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
