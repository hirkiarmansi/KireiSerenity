import { Component, OnInit } from '@angular/core';
import{cart, priceSummary} from '../data-type';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cartData:cart[]|undefined;
  cartSummary:priceSummary={
    price:0,
    tax:0,
    shippingPrice:0,
    total:0
  };
  removeCart=false;
  menuType: string = 'loading';
  isLoggedIn:boolean=false;
  userData: any={};
  constructor(private product:ProductsService, private route:Router){}

  ngOnInit(): void {
    const userStore = localStorage.getItem('login');
    this.userData = userStore ? JSON.parse(userStore) : {};
    this.isLoggedIn = this.userData.hasOwnProperty('email');

    if (this.isLoggedIn) {
      
      this.product.currentCart().subscribe((result) => {
        this.cartData = result;
        console.warn(this.cartData);
        let price = 0;
        result.forEach((item) => {
          if (item.quantity) {
            price = price + (+item.price * +item.quantity);
          }
        });
        this.cartSummary.price = price;
        this.cartSummary.tax = price / 50;
        this.cartSummary.shippingPrice = 100;
        this.cartSummary.total = price + (price / 10) + 100;
        console.warn(this.cartSummary);
  
        this.menuType = this.cartData && this.cartData.length ? 'default' : 'emptyCart';
      });
    }
  }
  checkout(){
    this.route.navigate(['/checkout'])
  }
  removeFromCart(cartId:string|undefined){
    cartId && this.product.removeFromCart(parseInt(cartId)).subscribe((result)=>{
          this.loadDetails();
    })
  }

  loadDetails(){
    this.product.currentCart().subscribe((result)=>{
    this.cartData=result;
    console.warn(this.cartData);
    let price=0;
    result.forEach((item)=>{
      if(item.quantity){
        price=price+(+item.price * +item.quantity)
      }
    })
    console.warn(price);
    this.cartSummary.price=price;
    this.cartSummary.tax=price/50;
    this.cartSummary.shippingPrice=100;
    this.cartSummary.total=price+(price/10)+100
    console.warn(this.cartSummary)
   })
  }
  

}
