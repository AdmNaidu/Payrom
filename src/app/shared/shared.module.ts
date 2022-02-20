import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartAllModule,
    AccumulationChartAllModule,
    ColumnSeriesService,
    CategoryService,
    PieSeriesService,
    RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { BarChartsComponent } from './bar-charts/bar-charts.component';

@NgModule({
    declarations: [DonutChartComponent, BarChartsComponent],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        ChartAllModule,
    AccumulationChartAllModule,
    RangeNavigatorAllModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        DonutChartComponent,
        BarChartsComponent
        
        
    ],
    providers:[ColumnSeriesService,CategoryService,PieSeriesService],
    schemas:[
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SharedModule { }
