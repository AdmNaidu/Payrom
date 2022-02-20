import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import {BarServiceService} from 'src/services/bar-service.service';
declare var jQuery: any;

@Component({
  selector: 'app-consolidated',
  templateUrl: './consolidated.component.html',
  styleUrls: ['./consolidated.component.scss']
})
export class ConsolidatedComponent implements OnInit {
    @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;
    finalData:any=[];
    report_title:string ;
    public month:any;
    public csvData:any=[];
    public allDonutData:any=[];
    choose:string ="report";
    donutDFinal:any=[];
    uniqueData:any=[]
    selected:any

    public csvOptions:any={};
    consolidatedReports:String[] =[
        'TOTAL CREDIT',
        'CASH INVOICE',
        'MISCELLANEOUS',
        'TAP TO PAY',
        'TOTAL SEQUENCE',
        'TOTAL VAT',
        'TOTAL DOWNLOAD',
        'TOTAL ITEMS',
        'TOTAL REPORT',
        'REVENUE'
    ] 
    chooseOpt:any=["PDF","CSV"]
    constructor(
        private app: AppManagerService,private bar_Service:BarServiceService
    ) { 
        this.app.ShowReportDate = 'true';
    }
    value:any = Document
    ngOnInit(): void {
        

        // if(this.donutData && this.donutData.length>0){
        //     this.donutData.map((x:any)=>{
    
        //         x.percent = Math.round(x.actual / x.target * 100);
        //         this.finalData.push(x);
        //     });
        // }
         //this.loadScripts();
        this.selected=new Date().toLocaleDateString(undefined, { month: 'short'});
        this.getConsolidateData();
    }

    private loadScripts(): void {
        
        (function($) {
            "use strict";
            $('.knob').knob();

            $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
            $('#side_menu_bar > ul > li.nav-item > a#li_consolidated').addClass("active");

            var randomData = function() {
                return [{
                        key: "01",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "02",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "03",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "04",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "05",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "06",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "07",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "08",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "09",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "10",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "11",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "12",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "13",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "14",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "15",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "16",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "17",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "18",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "19",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "20",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "21",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "22",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "23",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "24",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "25",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "26",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "27",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "28",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "29",
                        value: Math.floor(100 * Math.random() + 20)
                    }, {
                        key: "30",
                        value: Math.floor(100 * Math.random() + 20)
                    },

                ]
                }

            $("#bar-graph").simpleBarGraph({
                data: randomData(),
                rowsCount: 8,
                height: "150px",
                rowCaptionsWidth: "20px",
                barsColor: "#72AC47"
                })

        })(jQuery);
        
    }

    ngAfterViewInit():void {
        this.loadScripts();
        
        
    }
    async getConsolidateData(){
        await this.bar_Service.getConsolidateData().then(data=>{
            this.allDonutData = data;
        });
        this.getfData(this.selected)

    }
    
   pdfData:any=[]
    downloadCSV(title:any){
        console.log("#########################",this.choose);
        this.csvData=[];
        let Obj:any={};
        if(this.finalData){
            this.finalData.map((csv:any)=>{
                if(title === csv.type){
                    Obj.type = csv.type;
                    Obj.target= csv.target;
                    Obj.actual= csv.actual;
                    Obj.percent= csv.percent;
                   this.csvData.push(Obj);
                }
            })
        }
        if(this.choose ==="CSV"){
            console.log("################",this.csvData);
            const options = {
                title: '',fieldSeparator: ',',quoteStrings: '"',decimalseparator: '.',showLabels: true,showTitle: true,useBom: true,
                headers: ['Type','Target', 'Actual', 'Percent']
            };
            this.csvOptions=options;
            this.report_title=title;

            new  AngularCsv(this.csvData, this.report_title, this.csvOptions);
        }
    }
    pdfFlag:boolean=false;
    downloadPDF(title:any){
        this.pdfFlag=true;
        this.pdfData=[];
        let Obj:any={};
        if(this.finalData){
            this.finalData.map((csv:any)=>{
                if(title === csv.type){
                    Obj.type = csv.type;
                    Obj.target= csv.target;
                    Obj.actual= csv.actual;
                    Obj.percent= csv.percent;
                   this.pdfData.push(Obj);
                }
            })
        }
    }

    onSelectMonth(event:any){
        this.selected = event.target.value;
        this.getfData(this.selected)
    }
    onSelectReport(e:any){
        this.choose =e.target.value;
    }

    async getfData(month:any){
        this.finalData =[];
        await this.allDonutData.map((mData:any)=>{
            if(month === mData.month){
                mData.data.map((fData:any)=>{
                    fData.percent = Math.round(fData.actual / fData.target * 100);
                    const tempVal = 100 - fData.percent;
                    fData.doNut =`${fData.percent} ${tempVal}`
                    this.finalData.push(fData);
                })
            }
        })
        // this.loadScripts()
        // this.finalData = this.finalData.slice(0,12);
    }



}
