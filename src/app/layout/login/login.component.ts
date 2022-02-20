import { UsersService } from './../../data/services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { IdentityService } from 'src/app/core/services/identity.service';
import { LoginModel } from 'src/app/data/types/login';
declare var jQuery: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    errorMessage: string = '';
    returnUrl: string = '';
    showLoadingIndicator = false
    prCountries:any=0;
    merchants_num:any=0;
    trans_num:any=0;
    num_hrs:any=0;
    slideIndex:any = 0;

    private unsubscribeAll: Subject<any>;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private identity: IdentityService,
        private dataService: UsersService,
        private app: AppManagerService
    ) { 
        this.unsubscribeAll = new Subject();
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
        
    }

    ngOnInit(): void {
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || 'dashboard';
        // this.identity.isLoggedIn();

        this.loadJQueryScripts();
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            this.showLoadingIndicator = true;
            const userdata = this.loginForm.value;

            const model = new LoginModel();
            model.emailAddress = userdata.email;
            model.password = userdata.password;

            this.dataService.checkLogin(model)
                .pipe(takeUntil(this.unsubscribeAll))
                .subscribe((result: any) => { 
                    if (result) {
                        this.identity.UserName = result.name;
                        this.identity.EmailAddress = result.email;
                        this.router.navigate(['/dashboard']);
                    }
                });
        }
    }

    //#region | Private Functions |

    private loadJQueryScripts(): void {
        (($) => {
            'use strict'
            
            $(document).on("mouseover", ".btn-tp", (e: any) => { 
                $(e.target).parent().parent().find(".dropdown-menu").addClass("hover");
            });
    
            $(document).on("mouseout", ".btn-tp", (e: any) => {
                $(e.target).parent().parent().find(".dropdown-menu").removeClass("hover");
            });
    
            $(document).on("click", "#btn_services", () => {
                if ($("#content-services").hasClass("show")) {
                    $("#content-services").removeClass("show");
                } else {
                    $("#content-services").addClass("show");
                    $("#content-partner").removeClass("show")
                    $("#global-locations").removeClass("show");
                }
            });
    
            $(document).on("click", "#btn_partner", () => {
                if ($("#content-partner").hasClass("show")) {
                    $("#content-partner").removeClass("show");
                } else {
                    $("#content-partner").addClass("show");
                    $("#content-services").removeClass("show");
                    $("#global-locations").removeClass("show");
                }
            });
    
            $(document).on("click", "#btn_locations", () => {
                if ($("#global-locations").hasClass("show")) {
                    $("#global-locations").removeClass("show");
                } else {
                    $("#global-locations").addClass("show");
                    $("#content-services").removeClass("show");
                    $("#content-partner").removeClass("show");
                }
            });
    
            })(jQuery);
    }

    images = [
        {title: 'Tap to Pay', short: '', src: "assets/images/services.png"},
        {title: 'Tap to Pay2', short: '', src: "https://picsum.photos/id/1011/900/500"},
        {title: 'Tap to Pay3', short: '', src: "https://picsum.photos/id/984/900/500"}
    ];

    imageObject: Array<object> = [{
        image: 'assets/images/woman.jpg',
        thumbImage: 'assets/images/slider1.jpg',
        // alt: 'alt of image',
        // title: 'title of image'
      }, {
        image: 'assets/images/man.jpg',
        thumbImage: 'assets/images/services.png',
   
      }, {
        image: 'assets/images/plant.jpg',
        thumbImage: 'assets/images/services.png',
      
      }, {
        image: 'assets/images/services.png',
        thumbImage: 'assets/images/services.png',
      
      }
      ];

    textObject:Array<object> = [{
        title: 'Who We Are ?',
        content: 'PayRow B2B Fintech player addressing retail and microfinance industry using the business model of payment service provider as third-party company that assists businesses to accept a wide range of online payment methods, such as online banking, credit cards, debit cards, e-wallets, cash cards, and more. to ensure customer’s transactions make it from point A to point B, safely and securely.',
      }, {
        title: 'PayRow Services',
        content: 'Mobile payments that enables secure contactless card payment acceptance on any IOS/Android device. The technology is termed ‘Tap on Phone’ due to the way in which a payment card is tapped on a mobile device or phone. It is used by a business or a merchant to receive’ a payment.',
   
      }, {
        title: 'Global Partners',
        content: 'Mobile payments that enables secure contactless card payment acceptance on any IOS/Android device. The technology is termed ‘Tap on Phone’ due to the way in which a payment card is tapped on a mobile device or phone. It is used by a business or a merchant to receive’ a payment.',
      
      }, {
        title: 'CPOCS',
        content: 'Mobile payments that enables secure contactless card payment acceptance on any IOS/Android device. The technology is termed ‘Tap on Phone’ due to the way in which a payment card is tapped on a mobile device or phone. It is used by a business or a merchant to receive’ a payment.',
      
      }
    ];
    num_countries:any =setInterval(()=>{
        this.prCountries++;
        if(this.prCountries == 6){
            clearInterval(this.num_countries);
        } 
    },100)
    num_merchants:any =setInterval(()=>{
        this.merchants_num++;
        if(this.merchants_num == 12){
            clearInterval(this.num_merchants);
        } 
    },50);
    num_transtions:any =setInterval(()=>{
        this.trans_num++;
        if(this.trans_num == 13){
            clearInterval(this.num_transtions);
        } 
    },50)
    num_Hours:any =setInterval(()=>{
        this.num_hrs++;
        if(this.num_hrs == 12){
            clearInterval(this.num_Hours);
        } 
    },80)


    showSlides(){
        var i;
        var slides:any = document.getElementsByClassName("mySlides");
        var dots:any = document.getElementsByClassName("dot");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        this.slideIndex++;
        if (this.slideIndex > slides.length) {this.slideIndex = 1}    
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[this.slideIndex-1].style.display = "block";  
        dots[this.slideIndex-1].className += " active";
        setTimeout(this.showSlides, 2000); // Change image every 2 seconds
    }

    //#endregion
}
