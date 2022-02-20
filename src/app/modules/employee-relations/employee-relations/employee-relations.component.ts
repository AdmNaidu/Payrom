import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import * as _ from 'lodash';
declare var jQuery: any;

@Component({
  selector: 'app-employee-relations',
  templateUrl: './employee-relations.component.html',
  styleUrls: ['./employee-relations.component.scss']
})
export class EmployeeRelationsComponent implements OnInit {
    empForm: FormGroup;
    searchText:any;
    sortValue:any;
    constructor(
        private app: AppManagerService, private fb:FormBuilder
    ) { 
        this.app.ShowReportDate = 'true';
    }
    public employeeDetails: any =[
        {   no:1,
            empName:"Ahmad",
            empId:3456,
            jobDescription:"Sales Associate",
            jobTitle:"Sales",
            empGrade:"25412",
            personalInfo:"Data all about personalinfo",
            salary: 12000,
            leaveBalance:"30 days",
            endService:new Date("23-4-2024"),
            avatar:"assets/images/avatar.png"
        },
        {   no:2,
            empName:"Sudhakar",
            empId:3456,
            jobDescription:"Sales Associate",
            jobTitle:"Sales",
            empGrade:"25412",
            personalInfo:"Data all about personalinfo",
            salary: 42000,
            leaveBalance:"30 days",
            endService:new Date("23-4-2024"),
            avatar:"assets/images/avatar2.png"
        },
        {   no:3,
            empName:"Aravind",
            empId:3456,
            jobDescription:"Sales Associate",
            jobTitle:"Sales",
            empGrade:"25412",
            personalInfo:"Data all about personalinfo",
            salary: 25000,
            leaveBalance:"30 days",
            endService:new Date("23-4-2024"),
            avatar:"assets/images/avatar3.png"
        },
        {   no:4,
            empName:"Chandra",
            empId:3456,
            jobDescription:"Sales Associate",
            jobTitle:"Sales",
            empGrade:"25412",
            personalInfo:"Data all about personalinfo",
            salary: 65000,
            leaveBalance:"30 days",
            endService:new Date("23-4-2024"),
            avatar:"assets/images/avatar4.png"
        },
        {   no:5,
            empName:"Kishore",
            empId:3456,
            jobDescription:"Sales Associate",
            jobTitle:"Sales",
            empGrade:"25412",
            personalInfo:"Data all about personalinfo",
            salary: 75000,
            leaveBalance:"30 days",
            endService:new Date("23-4-2024"),
            avatar:"assets/images/avatar5.png"
        },
    ]
    ngOnInit(): void {
        this.loadScripts();

        this.empForm  = this.fb.group({
            empName: new FormControl("",[Validators.required]),
            jobTitle: new FormControl("",[Validators.required]),
            salary: new FormControl("",[Validators.required]),
            empId: new FormControl("",[Validators.required]),
            empGrade: new FormControl("",[Validators.required]),
            leaveBalance: new FormControl("",[Validators.required]),
            jobDescription: new FormControl("",[Validators.required]),
            personalInfo: new FormControl("",[Validators.required]),
            endService: new FormControl("",[Validators.required]),
        })
    }
    

    private loadScripts(): void {
        (function($) {
        "use strict";

        $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
        $('#side_menu_bar > ul > li.nav-item > a#li_employee_relations').addClass("active");
        })(jQuery);
    }
    submit(){
        let obj :any={};
        obj = this.empForm.value;
        obj.avatar = "assets/images/avatar5.png";
        this.employeeDetails.push(obj);
        
        this.app.showSuccess("Employee Added Successfully!")
    }


    sort(event: any) {
        if (event) {
            this.sortValue = event;
        }
        this.employeeDetails = event ==="A to Z" ? _.orderBy(this.employeeDetails,[(obj)=>obj['empName'].toLowerCase()],['asc'])
                                : event ==="Z to A" ? _.orderBy(this.employeeDetails,[(obj)=>obj['empName'].toLowerCase()],['desc'])
                                : event === "salary_low" ? _.orderBy(this.employeeDetails,['salary'],['asc'])
                                :  _.orderBy(this.employeeDetails,['salary'],['desc'])
        
    }
    
}