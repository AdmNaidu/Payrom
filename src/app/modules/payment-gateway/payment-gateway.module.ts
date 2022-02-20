import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { PaymentGatewayComponent } from './payment-gateway.component';
import { GatwayMenusComponent } from './gatway-menus/gatway-menus.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  ChartAllModule,
  ColumnSeriesService,
  CategoryService,
  AccumulationChartAllModule, PieSeriesService,
  RangeNavigatorAllModule
} from '@syncfusion/ej2-angular-charts';
import { CommonModule } from "@angular/common";
import { GovtComponent } from './govt/govt.component';
import { ServiceTypeComponent } from './service-type/service-type.component';
import { GaywayUseridComponent } from './gayway-userid/gayway-userid.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ShortNumbersPipe } from 'src/app/pipes/short-number.pipe';
import { EnterpriseComponent } from './enterprise/enterprise.component';
import { SmbComponent } from './smb/smb.component';
import { CrossBorderComponent } from './cross-border/cross-border.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const routes: Routes = [
  { path: '', component: PaymentGatewayComponent, canActivate: [AuthGuard] },
  { path: 'govt', component: GovtComponent },
  { path: 'enterprise', component: EnterpriseComponent },
  { path: 'smb', component: SmbComponent },
  { path: 'cross-border', component: CrossBorderComponent },
  { path: 'service-types', component: ServiceTypeComponent },
  { path: 'user-id', component: GaywayUseridComponent }
];

@NgModule({
  declarations: [PaymentGatewayComponent, GatwayMenusComponent, GovtComponent, ServiceTypeComponent, ShortNumbersPipe, GaywayUseridComponent, EnterpriseComponent, SmbComponent, CrossBorderComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    ChartAllModule,
    AccumulationChartAllModule,
    RangeNavigatorAllModule,
    NgMultiSelectDropDownModule,
    Ng2SearchPipeModule,

    SharedModule,

  ],
  providers: [ColumnSeriesService, CategoryService, PieSeriesService]
})
export class PaymentGatewayModule { }
