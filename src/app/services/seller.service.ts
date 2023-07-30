import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{log_in, sign_Up} from '../data-type';
import{BehaviorSubject} from 'rxjs';
import{ Router}from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  invalidAuth=new EventEmitter<boolean>(false);
  isUserLoggedIn= new BehaviorSubject<boolean>(false);
  isLoginError= new EventEmitter<boolean>(false)

  constructor(private http:HttpClient,private router:Router) {}
  
  userSignUp(data: sign_Up){
    this.http.post('http://localhost:3000/login',data,{observe:'response'}).subscribe((result)=>{
      if(result){
        localStorage.setItem('login',JSON.stringify(result.body));
        this.router.navigate(['/']);
      }

    });
  }   
    relodSeller(){
      if(localStorage.getItem('login')){
      this.isUserLoggedIn.next(true);
      this.router.navigate(['/']);
        
      }
    };
    userLogin(data:log_in){
      this.http.get(`http://localhost:3000/login?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((result:any)=>{
        if(result && result.body.length){
          localStorage.setItem('login',JSON.stringify(result.body[0]));
          this.router.navigate(['/']);
          this.invalidAuth.emit(false)
        }
        else{
          this.invalidAuth.emit(true)
        }
      })
    }
}
