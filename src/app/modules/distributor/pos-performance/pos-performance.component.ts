import { Component, OnInit } from '@angular/core';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import * as _ from 'lodash';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import {BarServiceService} from 'src/services/bar-service.service';


declare var jQuery: any;

@Component({
    selector: 'app-pos-performance',
    templateUrl: './pos-performance.component.html',
    styleUrls: ['./pos-performance.component.scss']
})
export class PosPerformanceComponent implements OnInit {

    constructor(
        private app: AppManagerService, private bar_service:BarServiceService
    ) {
        this.app.ShowReportDate = 'true';
    }
    searchText: any;
    sortType: string;
    sortReverse: boolean = false;
    public csvOptions: any = {};
    public csvData: any = [];
    finalData: any = [];
    report_title: string;
    selected:any;
    public month:any;
    tapToPayData: any = [];

    ngOnInit(): void {
        this.selected=new Date().toLocaleDateString(undefined, { month: 'short'});
        this.getPosData();
        this.loadjQueryScripts()
    }

    private loadjQueryScripts(): void {
        (function ($) {
            "use strict";
            $('.knob').knob();

            $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
            $('#side_menu_bar > ul > li.nav-item > a#li_distributor').addClass("active");
        })(jQuery);
    }

    sortOrders(prop: any) {
        this.sortType = prop;
        this.tapToPayData = this.sortReverse === false ?
            _.orderBy(this.tapToPayData, [prop], ['desc']) :
            _.orderBy(this.tapToPayData, [prop], ['asc']);
        this.sortReverse = !this.sortReverse;
    }

    downloadCSV() {
        this.csvData = [];
        if (this.finalData) {
            this.finalData.map((csv: any) => {
                let Obj: any = {};
                Obj['date'] = csv.date;
                Obj['time'] = csv.time;
                Obj['payment_type'] = csv.payment_type;
                Obj['posType'] = csv.posType;
                Obj['pos_id'] = csv.pos_id
                Obj['item'] = csv.item
                Obj['email_id'] = csv.email_id
                Obj['mobile'] = csv.mobile
                Obj['sequence_no'] = csv.sequence_no
                Obj['receipt_no'] = csv.receipt_no
                Obj['vat'] = csv.vat
                Obj['total_credit'] = csv.total_credit
                this.csvData = [...this.csvData, Obj];
            })
        }
        const options = {
            title: '', fieldSeparator: ',', quoteStrings: '"', decimalseparator: '.', showLabels: true, showTitle: true,
            headers: ['date', 'time', 'payment_type', 'user_id', 'pos_id', 'item', 'email_id', 'mobile', 'sequence_no', 'receipt_no', 'vat', 'total_credit']
        };
        this.csvOptions = options;
        this.report_title = 'tap to pay';

        new AngularCsv(this.csvData, this.report_title, this.csvOptions);

        this.loadjQueryScripts();
    }

    async getPosData(){
        await this.bar_service.getPosPerformanceData().then(data=>{
            this.tapToPayData = data;
        });
        this.getPosFData(this.selected)

    }
    onSelectMonth(event:any){
        this.selected = event.target.value;
        this.getPosFData(this.selected)
    }

    async getPosFData(month:any){
        this.finalData =[];
        await this.tapToPayData.map((mData:any)=>{
            if(month === mData.month){
                mData.data.map((fData:any)=>{
                    
                    this.finalData.push(fData);
                })
            }
        })
    }

}
