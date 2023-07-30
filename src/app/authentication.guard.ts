
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { SellerService } from './services/seller.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class authenticationGuard implements CanActivate {
  constructor(private sellerService: SellerService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree>|boolean|UrlTree {

    if (localStorage.getItem('login')) {
      return true
    }
    return this.sellerService.isUserLoggedIn;
  }
}
