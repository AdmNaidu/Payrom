import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import * as _ from 'lodash'
import {BarServiceService} from 'src/services/bar-service.service';
import { ILoadedEventArgs, ChartTheme, IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit {
        complaintsData:any=[]
    distributorForm: FormGroup;
    searchText: any;
    public palette: String[];
    sortValue: any;
    sortType: string;
    sortReverse: boolean = false;
    complaintObj:any=[]
    remarksoutData:any=[];

    public remarksMsg: any
    public finalTabularData: any = [];
    public finalData: any = [];
    selectedStatus: any = ""
    constructor(
        private app: AppManagerService, private fb: FormBuilder, private bar_srvc:BarServiceService
    ) {
        this.app.ShowReportDate = 'true';
    }
    status: any = [{ key: "Open", color: "green" }, { key: "Close", color: "Yellow" }, { key: "Dispute", color: "Red" }]
    public complaintsList: any = [
        { userId: 201, cust_name: "Arvind", contact: "9897856863", email: "a@gmail.com", remarks: [{ date: new Date(), data: "Hi there" }], date: new Date("12-20-2021"), complaint_Num: 732984, delay: 7, status: "Open" },
        { userId: 202, cust_name: "Sudhakar", contact: "7725328298", email: "b@gmail.com", remarks: [], date: new Date("12-17-2021"), complaint_Num: 987124, delay: 12, status: "Open" },
        { userId: 203, cust_name: "Chandra", contact: "8745096543", email: "c@gmail.com", remarks: [], date: new Date("12-18-2021"), complaint_Num: 912739, delay: 5, status: "Dispute" },
        { userId: 204, cust_name: "Sadhana", contact: "6532987654", email: "d@gmail.com", remarks: [], date: new Date("12-5-2021"), complaint_Num: 561433, delay: 10, status: "Open" },
        { userId: 205, cust_name: "Vikram", contact: "9875983785", email: "e@gmail.com", remarks: [], date: new Date("12-14-2021"), complaint_Num: 614276, delay: 3, status: "Close" },
        { userId: 206, cust_name: "Arun Kumar", contact: "8157320946", email: "f@gmail.com", remarks: [], date: new Date("12-14-2021"), complaint_Num: 187251, delay: 9, status: "Dispute" },
        { userId: 207, cust_name: "Ram", contact: "6723954679", email: "g@gmail.com", remarks: [], date: new Date("12-08-2021"), complaint_Num: 986753, delay: 5, status: "Open" },
        { userId: 208, cust_name: "Krishna", contact: "9536896637", email: "h@gmail.com", remarks: [], date: new Date("12-7-2021"), complaint_Num: 564365, delay: 10, status: "Close" },
        { userId: 209, cust_name: "Prasd", contact: "7572338758", email: "i@gmail.com", remarks: [], date: new Date("12-01-2021"), complaint_Num: 635272, delay: 4, status: "Dispute" },
        { userId: 210, cust_name: "RadheSyam", contact: "9587682623", email: "j@gmail.com", remarks: [], date: new Date("12-07-2021"), complaint_Num: 847982, delay: 11, status: "Open" },
        { userId: 211, cust_name: "Kiran", contact: "9765635263", email: "k@gmail.com", remarks: [], date: new Date("12-14-2021"), complaint_Num: 416798, delay: 7, status: "Close" }
    ]

    public remarksData: any = [];
    public remarksDataOut:any=[];

    public radius: Object = { bottomLeft: 0, bottomRight: 0, topLeft: 5, topRight: 5 }
    months: String[] = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', ' Nov', 'Dec'];
    public tooltip: Object = {
        enable: true
    };
    public title: string = '';
    public legend: Object = {
        visible: false
    }
    public chartArea: Object = {
        border: {
        width: 0
        }
    };

    ngOnInit(): void {

        this.getcomplaintsData();
        this.complaintsList;
    
    }

    ngAfterViewInit(): void {

        this.loadScripts()
    }
    public randomIntFromInterval(min: any, max: any): any { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    private loadScripts(): void {
        (function ($) {
        "use strict";
        $('.knob').knob();

        $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
        $('#side_menu_bar > ul > li.nav-item > a#li_complaints').addClass("active");
        })(jQuery);
    }
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(
        (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(
            /-dark/i,
            'Dark'
        )
        );

    }

    sortOrders(prop: any) {
        this.sortType = prop;
        this.complaintsList = this.sortReverse === false ?
        _.orderBy(this.complaintsList, [prop], ['desc']) :
        _.orderBy(this.complaintsList, [prop], ['asc']);
        this.sortReverse = !this.sortReverse;
    }


    sort(event: any) {
        if (event) {
        this.sortValue = event;
        }
        this.complaintsList = event === "A to Z" ? _.orderBy(this.complaintsList, [(obj) => obj['cust_name'].toLowerCase()], ['asc'])
        : event === "Z to A" ? _.orderBy(this.complaintsList, [(obj) => obj['cust_name'].toLowerCase()], ['desc'])
            : event === "date_low" ? _.orderBy(this.complaintsList, ['date'], ['asc'])
            : _.orderBy(this.complaintsList, ['date'], ['desc'])
    }

    async getcomplaintsData(){
        await this.bar_srvc.getcompalintsData().then(data=>{
            this.complaintsData =data;
        });
        this.complaintsData.map((data: any) => {
            // switch(data.status){
            // 	case "Open" :
            // 		data.color = new Date(data.date).getDate() === new Date().getDate()  
            //         ? "yellow" : new Date().getDate() - new Date(data.date).getDate() <= 5 
            //         ? "blue" :"red"
            // 		break;
            // 	case "Dispute" :
            // 		data.color =  "red"
            // 		break;
            // 	case "Close" :
            // 		data.color =  "green"
            // 		break;
            // 	default:
            // 		break;
            // }
            
            data.color = data.status === 'Dispute' ? 'red' : data.status === 'Close' ? 'green' : 'yellow'
            });
    }
    updateRemarks(msg:any){
        // this.remarksData.map((data:any)=>{
            
        //     data["outData"] = msg;
        //     data["outDate"]  = new Date().toISOString().slice(0, 10);
        //     data["outName"] ="Distributor Name Here"
        // })

        this.remarksDataOut.map((data:any)=>{
            
            data["outData"] = msg;
            data["outDate"]  = new Date().toISOString().slice(0, 10);
            data["outName"] ="Distributor Name Here"
        })
        // const Obj:any={};
        // Obj["outData"] = msg;
        // Obj["outDate"]  = new Date().toISOString().slice(0, 10);
        // Obj["outName"] ="Distributor Name Here"
        // this.remarksDataOut =[...this.remarksDataOut,Obj]
        this.remarksMsg =""
    }
    edit(complaint:any){
        
        this.complaintObj =[];
        this.complaintObj.push(complaint);
        this.remarksData =[];
        
        this.remarksDataOut=[];
        for(let i in complaint.remarks){
            complaint.remarks[i]["userId"]=complaint.userId;
            complaint.remarks[i].in.map((iData:any)=>{
                iData["name"]=complaint.cust_name;
            })
            let obj:any={};
            obj["userId"]=complaint.userId;
            this.remarksData = complaint.remarks[i].in;
            this.remarksDataOut =complaint.remarks[i].out;
            this.remarksDataOut.push(obj)
        }
    
    }

}
