import { Component, OnInit } from '@angular/core';
import { cart, log_in, order, priceSummary } from '../data-type';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartData: cart[] | undefined;
  cartSummary: priceSummary = {
    price: 0,
    tax: 0,
    shippingPrice: 0,
    total: 0
  }

  userData: undefined | log_in;
  isLoggedIn: boolean = false;
  orderMsg: string | undefined;

  constructor(private product: ProductsService, private router: Router) { }
  ngOnInit(): void {
    const userStore = localStorage.getItem('login');
    this.userData = userStore ? JSON.parse(userStore) : {};

    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      console.warn(this.cartData);
      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      })
      console.warn(price);
      this.cartSummary.price = price;
      this.cartSummary.tax = price / 50;
      this.cartSummary.shippingPrice = 100;
      this.cartSummary.total = price + (price / 10) + 100

    })
  }
  orderNow() {
    let user = localStorage.getItem('login');
    let userId = user && JSON.parse(user).id;
    if (this.cartSummary.total) {
      let orderData: order = {
        email: this.userData.email,
        name: this.userData.name,
        address: this.userData.address,
        total: this.cartSummary.total,
        userId,
        contact: this.userData.contact,
        id: undefined
      }

      this.cartData.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItems(parseInt(item.id))
        }, 700)
      })

      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMsg = "Order has been placed";
          setTimeout(() => {
            this.orderMsg = undefined;
            this.router.navigate(['/myOrders'])

          }, 2000);


        }

      })
    }
  }

}
