import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit {
    public palette: String[];
    finalData:any=[];
    constructor() { }
    

    public chartData1: Array<any> = 
    [
        { x: 'Jan', y: 200 }, { x: 'Feb', y: 270 }, { x: 'Mar', y: 380 }, { x: 'Apr', y: 400 }, { x: 'May', y: 350 }, { x: 'Jun', y: 100 }, { x: 'Jul', y: 290 }, { x: 'Aug', y: 310 }, { x: 'Sep', y: 100 }, { x: 'Oct', y: 420 }, { x: 'Nov', y: 160 }, { x: 'Dec', y: 260 }
    ];
    public chartData2: Array<any> = [
        { x: 'Jan', y: 200 }, { x: 'Feb', y: 270 }, { x: 'Mar', y: 380 }, { x: 'Apr', y: 400 }, { x: 'May', y: 350 }, { x: 'Jun', y: 100 }, { x: 'Jul', y: 290 }, { x: 'Aug', y: 310 }, { x: 'Sep', y: 100 }, { x: 'Oct', y: 420 }, { x: 'Nov', y: 160 }, { x: 'Dec', y: 260 }
    ];
    public chartData3: Array<any> = [
        { x: 'Jan', y: 200 }, { x: 'Feb', y: 270 }, { x: 'Mar', y: 380 }, { x: 'Apr', y: 400 }, { x: 'May', y: 350 }, { x: 'Jun', y: 100 }, { x: 'Jul', y: 290 }, { x: 'Aug', y: 310 }, { x: 'Sep', y: 100 }, { x: 'Oct', y: 420 }, { x: 'Nov', y: 160 }, { x: 'Dec', y: 260 }
    ];
    public donutData: any = [
		{ dounttitle: "Total Cases", svgImg: 'assets/images/credit.png', value: 2000, color: '#95D67B', target: 2000000000, actual: 1470000000, percent: null },
		{ dounttitle: "Open Cases", svgImg: 'assets/images/credit.png', value: 10000, color: '#6CB49C', target: 1000000000, actual: 720000000, percent: null },
		{ dounttitle: "Closed Cases", svgImg: 'assets/images/credit.png', value: 1000, color: '#AACC00', target: 1000000000, actual: 750000000, percent: null }
	]

    
    	//Initializing Primary X Axis
	public prXAxis: Object = {
		majorGridLines: { width: 0 },
		minorGridLines: { width: 0 },
		majorTickLines: { width: 0 },
		minorTickLines: { width: 0 },
		interval: 1,
		lineStyle: { width: 0 },
		valueType: 'Category'
	};
	//Initializing Primary Y Axis
	public prYAxis: Object = {
		lineStyle: { width: 0 },
		majorTickLines: { width: 0 },
		majorGridLines: { width: 1 },
		minorGridLines: { width: 1 },
		minorTickLines: { width: 0 },
		labelFormat: '${value} M'
	};
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

        this.chartData1 = this.months.map(item => {
			let num = this.randomIntFromInterval(100, 600);
			return { x: item, y: num }
		});



		this.chartData2 = this.months.map(item => {
			let num = this.randomIntFromInterval(150, 400);
			return { x: item, y: num }
		});

		this.chartData3 = this.months.map(item => {
			let num = this.randomIntFromInterval(150, 400);
			return { x: item, y: num }
		});

        this.palette = ["#72AC47", "#406326", "#204406"];
        if (this.donutData && this.donutData.length > 0) {
			this.donutData.map((x: any) => {

				x.percent = Math.round(x.actual / x.target * 100);
				this.finalData.push(x);
			})
		}
    }
    public randomIntFromInterval(min: any, max: any): any { // min and max included 
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

    ngAfterViewInit(): void {
        (($) => {
          "use strict";
          $('.knob').knob();
          $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
          $('#side_menu_bar > ul > li.nav-item > a#li_distributor').addClass("active");
        })(jQuery);
    
    }



}
