import { Component, OnInit ,forwardRef, OnDestroy} from '@angular/core';
import {
  ControlValueAccessor,NG_VALUE_ACCESSOR,FormBuilder,
  FormGroup,Validators,FormControl,NG_VALIDATORS, Validator
} from '@angular/forms';
import {Subscription} from 'rxjs';
export interface BankFormValues {
    bankName: string;
    bankBranch: string;
    bankAcNo: number;
    ibanNo:number;
    vatNumber:number
}
@Component({
    selector: 'app-bank-form',
    templateUrl: './bank-form.component.html',
    styleUrls: ['./bank-form.component.scss'],
    providers:[
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting:forwardRef(()=>BankFormComponent),
            multi:true
        },
        {
            provide: NG_VALIDATORS,
            useExisting:forwardRef(()=>BankFormComponent),
            multi:true
        }
    ]
})
export class BankFormComponent implements ControlValueAccessor, OnDestroy ,Validator {
    bankForm:FormGroup
    subscriptions: Subscription[]=[];

    get value():BankFormValues{
        return this.bankForm.value;
    }
    set value(value: BankFormValues){
        this.bankForm.setValue(value);
        this.onChange(value);
        this.onTouched();
    }
    constructor(private fb :FormBuilder) { 
        this.bankForm = this.fb.group({
            bankName:new FormControl("",[Validators.required]), 
            bankBranch: new FormControl("",[Validators.required]),
            bankAcNo: new FormControl("",[Validators.required]),
            ibanNo:["",Validators.required],
            vatNumber: ["",Validators.required]
        })
        this.subscriptions.push(
            this.bankForm.valueChanges.subscribe(value=>{
                this.onChange(value);
                this.onTouched();
            })
        )
    }

  
    ngOnDestroy(): void {
        this.subscriptions.forEach(s=>s.unsubscribe());
    }
    writeValue(value: any): void {
        if(value) this.value =value;
        if(value === null){this.bankForm.reset();}
    }
    registerOnChange(fn: any): void {
        this.onChange =fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched =fn;
    }
   

    // ngOnInit(): void {
    // }

    onChange: any = () => {};
    onTouched: any = () => {};

    //  inner form validation to the parent form
    validate(_: FormControl) {
        return this.bankForm.valid ? null : { profile: { valid: false } };
    }

}
