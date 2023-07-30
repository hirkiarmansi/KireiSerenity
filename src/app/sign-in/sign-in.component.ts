import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import{Router} from '@angular/router';
import { sign_Up } from '../data-type';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  constructor(private seller:SellerService,private router:Router){}
  ngOnInit():void{
    this.seller.relodSeller()
  }
  signUp(data:sign_Up):void{
    this.seller.userSignUp(data)
  }
}
