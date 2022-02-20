import { Component, OnInit } from '@angular/core';
import {BarServiceService} from 'src/services/bar-service.service';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
declare var jQuery: any;
@Component({
  selector: 'app-user-id',
  templateUrl: './user-id.component.html',
  styleUrls: ['./user-id.component.scss']
})
export class UserIdComponent implements OnInit {
    storeData:any=[];
    storeCatData:any=[];
    catFData:any =[];
    csvData:any=[];
    selectStore:string;
    selectStoreCat:string;
    nextTab:any;
    searchId:any;
    searchText:any
    csvOptions:any;
    report_title:string;
    csvstore:string;
    headers:any;
    constructor(private bar_Service:BarServiceService) { }
    ngOnInit(): void {
        this.getposData();
        this.loadScripts();
    }


    async getposData(){
        await this.bar_Service.getPosIdData().then(data=>{
            this.storeData =data;
        });
        this.storeData.map((sData:any)=>{
            sData.data.map((data:any)=>{
                data.catData.map((fData:any)=>{
                    sData.sTransactionValue = sData.sTransactionValue + fData.transactionValue
                })
            })
        })
    
    }

    onSelectSore(e:any){
        this.storeCatData =[];
        this.catFData =[];
        this.storeData.map((sData:any)=>{
            if(e.target.value === sData.storeName){
                this.storeCatData = sData.data;
            }
        });
    }

    onSelectCat(e:any){
        this.catFData=[];
        this.storeCatData.map((cData:any)=>{
            cData.data.map((data:any)=>{
                if(e.target.value === data['cat']){
                    this.catFData = data.catData;
                }
            });
            this.catFData.map((fData:any)=>{
                fData['storeId'] = cData.storeId;
            });
        });
    }

    posDetailsFunc(id:any){
        this.storeCatData=[];
        this.storeData.map((sData:any)=>{
            if(parseInt(id) === sData.userId){
                this.nextTab =id;
                this.storeCatData.push(sData);
                this.selectStoreCat = sData.data[0].cat;
            }
        });
        this.storeCatData.map((cData:any)=>{
            cData.data.map((data:any)=>{
                if(this.selectStoreCat === data['cat']){
                    this.catFData = data.catData;
                };
            });
            this.catFData.map((fData:any)=>{
                fData['storeId'] = cData.storeId;
            });
        });
        
        if(this.storeCatData.length === 0){
            alert(`${id} Does Not Exist`)
        };
        this.searchId ="";
        //console.log("###########################",this.storeCatData[0].data[0].cat);
    };
    goBack(){
        this.nextTab =undefined;
    };

    downloadReport(type:any,opt?:any){
        this.csvData=[];
        switch(type){
            case  'Stores':
            case  'Store' :
                this.headers =  ['USERID','STOREID', 'STORENAME', 'EMAIL','ADDRESS','ACTIVATIONDATE','TRANSACTIONVALUE'] ;
                if(this.storeData && this.storeData.length >0){
                    this.storeData.map((data:any)=>{
                        let Obj:any={};
                        if(opt === data.userId){
                            Obj['userId'] = data.userId;
                            Obj['storeId'] = data.storeId;
                            Obj['storeName'] = data.storeName;
                            Obj['email'] = data.sEmail;
                            Obj['address'] = data.address;
                            Obj['activationDate'] = data.sActivationDate;
                            Obj['transactionValue'] = data.sTransactionValue;
                            this.csvData = [...this.csvData,Obj];
                        };
                        if(!opt){
                            Obj['userId'] = data.userId;
                            Obj['storeId'] = data.storeId;
                            Obj['storeName'] = data.storeName;
                            Obj['email'] = data.sEmail;
                            Obj['address'] = data.address;
                            Obj['activationDate'] = data.sActivationDate;
                            Obj['transactionValue'] = data.sTransactionValue;
                            this.csvData = [...this.csvData,Obj];
                        };
                    });
                };
            break;
            case 'Categories':
            case 'Category':
                this.headers =['USERID','STOREID', 'NAME','CONTACT', 'EMAIL','REMARKS','ACTIVATIONDATE','TRANSACTIONVALUE'];
                if(this.catFData && this.catFData.length >0){
                    this.catFData.map((fData:any)=>{
                        let Obj:any={};
                        if(opt === fData.userId){
                            this.csvstore =fData.storeId
                            Obj['userId'] = fData.userId;
                            Obj['storeId'] = fData.storeId;
                            Obj['name'] = fData.name;
                            Obj['contact'] =fData.contact
                            Obj['email'] = fData.email;
                            Obj['remarks'] = fData.remarks;
                            Obj['activationDate'] = fData.activationDate;
                            Obj['transactionValue'] = fData.transactionValue;
                            this.csvData = [...this.csvData,Obj];
                        };
                        if(!opt){
                            this.csvstore =fData.storeId
                            Obj['userId'] = fData.userId;
                            Obj['storeId'] = fData.storeId;
                            Obj['name'] = fData.name;
                            Obj['contact'] =fData.contact
                            Obj['email'] = fData.email;
                            Obj['remarks'] = fData.remarks;
                            Obj['activationDate'] = fData.activationDate;
                            Obj['transactionValue'] = fData.transactionValue;
                            this.csvData = [...this.csvData,Obj];
                        };
    
                    });
                };
            break;
            default :
            break;
        }
        
        if(this.csvData && this.csvData.length > 0){
            const options = {
                title: '',fieldSeparator: ',',quoteStrings: '"',decimalseparator: '.',showLabels: true,showTitle: true,useBom: true,
                headers: this.headers
            };
            this.csvOptions=options;
            this.report_title = type === 'Stores' ? 'ALL STORES': type === 'Categories' || type === 'Category' ? `STORE-${this.csvstore} ${this.selectStoreCat}`:'Store'
            new  AngularCsv(this.csvData, this.report_title, this.csvOptions);
        }else{
            alert("something went wrong")
        };

    };

    private loadScripts(): void {
        (function($) {
        "use strict";
        $('.knob').knob();

        $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
        $('#side_menu_bar > ul > li.nav-item > a#li_distributor').addClass("active");
        })(jQuery);
    };

}
