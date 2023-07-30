import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { SaleComponent } from './sale/sale.component';
import { SignInComponent} from './sign-in/sign-in.component';
import {LoginComponent} from './login/login.component';
import {SellerHomeComponent} from './seller-home/seller-home.component';
import { authenticationGuard } from './authentication.guard';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';


const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
  },
  {
    path:'cart',
    component:CartComponent
  },
  {
    path:'sale',
    component:SaleComponent
  },
  // { path: '', redirectTo: '/signIn', pathMatch: 'full' },
  {
    path:'signIn',
    component:SignInComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'seller-home',
    component:SellerHomeComponent,
    canActivate:[authenticationGuard]
  },
  {
    path:'search/:query',
    component:SearchComponent
  },{
    path:'details/:productId',
    component:ProductDetailsComponent
  },
  {
    path:'checkout',
    component:CheckoutComponent
  },
  {
    path:'myOrders',
    component:MyOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
