import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { BarServiceService } from 'src/services/bar-service.service';
import { MdrService } from 'src/services/mdr.service'
declare var jQuery: any;

@Component({
  selector: 'app-risk',
  templateUrl: './risk.component.html',
  styleUrls: ['./risk.component.scss']
})
export class RiskComponent implements OnInit {
  step = 1;
  basic_step = false;
  personal_step = false;
  address_step = false;
  bank_step = false;
  card_step = false;
  license_step = false;
  staff_step = false;
  education_step = false;
  hr_Tag: boolean = false;
  terms_step: boolean = false;
  //check
  public rowData: any = [];
  public newData: any = {};
  mdrForm: FormGroup;
  cards: FormArray;

  storeData: any = [
    { userId: 1, storeId: 101, name: "Aravind", email: "aravind@gmail.com", address: "UAE", joiningDate: "10-21-2021", cust_score: 10 },
    { userId: 2, storeId: 102, name: "Sadhana", email: "Sadhana@gmail.com", address: "India", joiningDate: "10-21-2021", cust_score: 8 },
    { userId: 3, storeId: 103, name: "Sudhakar", email: "Sudhakar@gmail.com", address: "USA", joiningDate: "10-21-2021", cust_score: 9 }
  ];
  storeCatData: any = [];
  catFData: any = [];
  csvData: any = [];
  selectStore: string;
  selectStoreCat: string;
  nextTab: any;
  searchId: any;
  searchText: any
  csvOptions: any;
  report_title: string;
  csvstore: string;
  headers: any;
  constructor(
    private fb: FormBuilder, private app: AppManagerService, private mdr_service: MdrService, private bar_Service: BarServiceService
  ) {
    this.app.ShowReportDate = 'false';
  }

  ngOnInit(): void {
    this.mdrForm = this.fb.group({
      marchentId: new FormControl(""),
      marchentName: new FormControl(""),
      otc: new FormControl(""),
      mdrType: new FormControl(""),
      monthCharges: new FormControl(""),
      chStartDate: new FormControl(""),
      chEndDate: new FormControl(""),
      cardsVc: this.fb.array([this.createCards()]),
      cardsVd: this.fb.array([this.createCards()]),
      cardsMc: this.fb.array([this.createCards()]),
      cardsMd: this.fb.array([this.createCards()])
    })
    this.rowData;
    this.mdrData();
    // this.getposData();
    this.loadScripts();
    //this.addTableRow();
  }
  // async getposData() {
  //   await this.bar_Service.getPosIdData().then(data => {
  //     this.storeData = data;
  //   });
  //   this.storeData.map((sData: any) => {
  //     sData.data.map((data: any) => {
  //       data.catData.map((fData: any) => {
  //         sData.sTransactionValue = sData.sTransactionValue + fData.transactionValue
  //       })
  //     })
  //   })

  // }

  // onSelectSore(e: any) {
  //   this.storeCatData = [];
  //   this.catFData = [];
  //   this.storeData.map((sData: any) => {
  //     if (e.target.value === sData.storeName) {
  //       this.storeCatData = sData.data;
  //     }
  //   });
  // }

  // onSelectCat(e: any) {
  //   this.catFData = [];
  //   this.storeCatData.map((cData: any) => {
  //     cData.data.map((data: any) => {
  //       if (e.target.value === data['cat']) {
  //         this.catFData = data.catData;
  //       }
  //     });
  //     this.catFData.map((fData: any) => {
  //       fData['storeId'] = cData.storeId;
  //     });
  //   });
  // }

  posDetailsFunc(id: any) {
    this.storeCatData = [];
    this.storeData.map((sData: any) => {
      if (parseInt(id) === sData.userId) {
        this.nextTab = id;
        this.storeCatData.push(sData);
        this.selectStoreCat = sData.data[0].cat;
      }
    });

    if (this.storeCatData.length === 0) {
      alert(`${id} Does Not Exist`)
    };
    this.searchId = "";
    //console.log("###########################",this.storeCatData[0].data[0].cat);
  };
  goBack() {
    this.nextTab = undefined;
  };
  private loadScripts(): void {
    (function ($) {
      "use strict";

      $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
      $('#side_menu_bar > ul > li.nav-item > a#li_risk').addClass("active");
    })(jQuery);
  }
  createCards(): FormGroup {
    return this.fb.group({
      cardtype: "",
      toamt: "",
      chrgtype: "",
      rakrate: "",
      newrate: "",
      gst: "",
      other: "",

    })
  }

  async mdrData() {
    await this.mdr_service.getMdr()
      .subscribe((data: any) => {
        this.rowData = data
      })
  }
  addTableRow(cardtype: any) {
    if (cardtype === "VC") {
      this.cards = this.mdrForm.get('cardsVc') as FormArray;
      this.cards.push(this.createCards());
    } else if (cardtype === "VD") {
      this.cards = this.mdrForm.get('cardsVd') as FormArray;
      this.cards.push(this.createCards());
    } else if (cardtype === "MC") {
      this.cards = this.mdrForm.get('cardsMc') as FormArray;
      this.cards.push(this.createCards());
    } else {
      this.cards = this.mdrForm.get('cardsMd') as FormArray;
      this.cards.push(this.createCards());
    }


  }

  delTableRow(cardtype: any, index: any) {


    const cardsArray: any = cardtype === "VC" ? this.mdrForm.controls.cardsVc as FormArray :
      cardtype === "VD" ? this.mdrForm.controls.cardsVd as FormArray :
        cardtype === "MC" ? this.mdrForm.controls.cardsMc as FormArray :
          this.mdrForm.controls.cardsMd as FormArray;
    cardsArray.removeAt(index);
  }
  onSubmitMdr() {

  }

  next() {
    console.log(":&&&&&&&&&&&&&&&&&&&&&&&&&&&", this.step)
    if (this.step == 1) {
      this.basic_step = true;
      this.step++
    } else if (this.step == 2) {
      this.personal_step = true;
      this.step++
    } else if (this.step == 3) {
      this.card_step = true;
      this.step++
    } else if (this.step == 4) {
      this.bank_step = true;
      this.step++;
    } else if (this.step == 5) {
      this.address_step = true;
      this.step++;
    } else if (this.step == 6) {
      this.license_step = true;
      this.step++;
    } else if (this.step == 7) {
      this.staff_step = true;
      this.step++;
    } else if (this.step == 8) {
      this.terms_step = true;
      this.step++;
    }

  }
  previous() {
    this.step--
    if (this.step == 1) {
      this.basic_step = false;
    } else if (this.step == 2) {
      this.personal_step = false;
    } else if (this.step == 3) {
      this.card_step = false;
    } else if (this.step == 4) {
      this.bank_step = false;

    } else if (this.step == 5) {
      this.address_step = false;

    } else if (this.step == 6) {
      this.license_step = false;

    } else if (this.step == 7) {
      this.staff_step = false;
    }
    else if (this.step == 7) {
      this.terms_step = false;
    }
  }


}
