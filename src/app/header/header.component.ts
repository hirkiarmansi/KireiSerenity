import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { product } from '../data-type';
@Component({
  selector: 'app-header',
  templateUrl: 
  './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: String = 'default';
  userName: String = '';
  searchResult: undefined | product[];
  cartItems=0;
  constructor(private route: Router, private product: ProductsService) { }
  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('login')) {
          let userStore = localStorage.getItem('login');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = "user";
        }
        else {
          this.menuType = 'default'
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItems=JSON.parse(cartData).length
    }

    this.product.cartData.subscribe((items)=>{
      this.cartItems=items.length
    })
  }
  logOut() {
    localStorage.removeItem('login');
    this.route.navigate(["/"]);
    this.product.cartData.emit([])
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
      })
    }
  }
  hideSearch() {
    this.searchResult = undefined
  }
  submitSearch(val: string) {
    this.route.navigate([`search/${val}`]);
  }
  redirectToDetails(id: string) {
    this.route.navigate(['/details/' + id])
  }
}
