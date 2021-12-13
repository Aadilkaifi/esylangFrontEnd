import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../@core/services/auth.guard';
import { RoleGuard } from '../@core/services/role.guard';

import { CmnComponent } from './cmn.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'lesson',
    pathMatch: 'full',
  },
  {
    path: '', component: CmnComponent,
    children: [
      { path: 'lesson', loadChildren: () => import('./lesson/lesson.module').then(m => m.LessonModule) },
      { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
      {
        path: 'dashboard',
        loadChildren: () => import('../all-modules/dashboard/dashboard.module').then(m => m.DashboardModule),
      },

    ], canActivate: [AuthGuard],
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmnRoutingModule { }
