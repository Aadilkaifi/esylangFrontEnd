import { BreadcrumModule } from './breadcrum/breadcrum.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmnRoutingModule } from './cmn-routing.module';
import { CmnComponent } from './cmn.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { AllModulesData } from 'src/assets/all-modules-data/all-modules-data';




const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  declarations: [CmnComponent, HeaderComponent, SidebarComponent,
      ],
  imports: [
    CommonModule,
    CmnRoutingModule,
    PerfectScrollbarModule,
    HttpClientModule,
    BreadcrumModule,
    FormsModule,
    HttpClientInMemoryWebApiModule.forRoot(AllModulesData),
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
  exports:  [FormsModule],
})
export class CmnModule { }
