import { Component, OnInit } from '@angular/core';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import * as _ from 'lodash';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { BarServiceService } from 'src/services/bar-service.service'
declare var jQuery: any;

@Component({
    selector: 'app-tap-to-pay',
    templateUrl: './tap-to-pay.component.html',
    styleUrls: ['./tap-to-pay.component.scss']
})
export class TapToPayComponent implements OnInit {

    constructor(
        private app: AppManagerService, private bar_service: BarServiceService
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
    selected: any;
    public month: any;
    public tapToPayData: any = []

    ngOnInit(): void {
        this.selected = new Date().toLocaleDateString(undefined, { month: 'short' });
        this.getTapTPData();
        this.loadScripts();

        // if(this.tapToPayData && this.tapToPayData.length>0){
        //     this.tapToPayData.map((x:any)=>{

        //         x.percent = Math.round(x.actual / x.target * 100);
        //         this.finalData.push(x);
        //     });
        // }
    }

    private loadScripts(): void {
        (function ($) {
            "use strict";

            $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
            $('#side_menu_bar > ul > li.nav-item > a#li_tap_to_pay').addClass("active");
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
                Obj['merchant_id'] = csv.merchant_id;
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
            headers: ['date', 'time', 'merchant_id', 'posType', 'pos_id', 'item', 'email_id', 'mobile', 'sequence_no', 'receipt_no', 'vat', 'total_credit']
        };
        this.csvOptions = options;
        this.report_title = 'tap to pay';

        new AngularCsv(this.csvData, this.report_title, this.csvOptions);
    }

    async getTapTPData() {
        console.log(this.tapToPayData, '11111111111')
        await this.bar_service.getPosPerformanceData().then(data => {
            this.tapToPayData = data;
            console.log(this.tapToPayData, '2222222222')
        });
        this.getfTapToPayData(this.selected)

    }
    onSelectMonth(event: any) {
        this.selected = event.target.value;
        this.getfTapToPayData(this.selected)
    }

    async getfTapToPayData(month: any) {
        this.finalData = [];
        await this.tapToPayData.map((mData: any) => {
            if (month === mData.month) {
                mData.data.map((fData: any) => {
                    this.finalData.push(fData);
                })
            }
        })
    }
}
