import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import{Router} from '@angular/router';
import{cart, log_in, product}from '../data-type';
import { ProductsService } from '../services/products.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authError:string="";
  constructor(private seller:SellerService,private router:Router,private product:ProductsService){}
  ngOnInit(): void {
    
  }
  logIn(data:log_in):void{
    this.seller.userLogin(data)
    this.seller.invalidAuth.subscribe((result)=>{
      console.warn(result)
      if(result){
        this.authError="User not found"
      }
      else{
        this.localCartToRemoteCart();
      }
    })
  }

  localCartToRemoteCart(){
    let data=localStorage.getItem('localCart');
    console.warn(data);
    let user = localStorage.getItem('login');
    let userId=user && JSON.parse(user).id;
    if(data){
      let cartDataList:product[]=JSON.parse(data);
      console.log('cartDataList:',cartDataList)

      cartDataList.forEach((product:product,index)=>{
        let cartData:cart={
          ...product,
          productId:parseInt(product.id),
          userId:parseInt(userId)
        };

        delete cartData.id;

        setTimeout(() => {
          this.product.AddToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn("Item stored in DB");
            }
          })
        },500);
        if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
      }) 
    }

    setTimeout(()=>{
      this.product.getCartList(userId);
    },2000);
  }
  
}
