import { PosPerformanceComponent } from './pos-performance/pos-performance.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule, Routes } from '@angular/router';
import { DistributorComponent } from '../distributor/distributor.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { DistributorMenusComponent } from './distributor-menus/distributor-menus.component';
import { UserIdComponent } from './user-id/user-id.component';
import { BusinessTypesComponent } from './business-types/business-types.component';
import { SalesComponent } from './sales/sales.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ChartAllModule, 
  ColumnSeriesService,
  CategoryService,
  AccumulationChartAllModule, PieSeriesService,
  RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { MerchantLocationComponent } from './merchant-location/merchant-location.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import {ShortNumbersPipe} from './short-number.pipe';
import {SharedModule} from 'src/app/shared/shared.module';



const routes: Routes = [
  { path: '', component: DistributorComponent, canActivate: [AuthGuard],pathMatch: 'full'},
  {path:'user-id', component: UserIdComponent},
  {path:'sales', component: SalesComponent},
  {path:'business-types', component:BusinessTypesComponent},
  {path:'merchant-location',component:MerchantLocationComponent},
  {path:'pos-performance',component:PosPerformanceComponent},

];

@NgModule({
  declarations: [DistributorComponent, DistributorMenusComponent, UserIdComponent, BusinessTypesComponent, SalesComponent, MerchantLocationComponent, ComplaintsComponent, PosPerformanceComponent,ShortNumbersPipe],
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    ChartAllModule,
    RangeNavigatorAllModule,
    AccumulationChartAllModule,
    RangeNavigatorAllModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers:[ColumnSeriesService,CategoryService,PieSeriesService]
})
export class DistributorModule { }
