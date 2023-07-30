import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  productData:undefined|product;
  productQuantity:number=1;
  removeCart=false;
  cartData:product|undefined;
  constructor(private activeRoute:ActivatedRoute,private product:ProductsService){}

  ngOnInit(): void {
    let productId=this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((result)=>{
      this.productData=result;

      let cartData=localStorage.getItem('localCart');
      if(productId && cartData){
        let items=JSON.parse(cartData);
        items=items.filter((item:product)=>
          productId==item.id.toString()
        )
        if(items.length){
          this.removeCart=true
        }
        else{
          this.removeCart=false
        }
      }

      let user=localStorage.getItem('login');

        if(user){
          let userId = user && JSON.parse(user).id; 
          this.product.getCartList(userId);
          this.product.cartData.subscribe((result)=>{
           let item = result.filter((item:product)=>productId?.toString()===item.productId?.toString())
            if(item.length){
              this.cartData=item[0];
              this.removeCart=true
            }
            else{
              this.removeCart=false
            }
          })
        }
        

    })
  }

  handleQuantity(val:string){
    if(this.productQuantity<20 && val==='plus'){
      this.productQuantity+=1;
    }
    else if(this.productQuantity>1 && val==='min'){
      this.productQuantity-=1;
    }
  }
  AddToCart(){
    if(this.productData){
      this.productData.quantity=this.productQuantity;
      if(!localStorage.getItem('login')){
        this.product.localAddToCart(this.productData);
        this.removeCart=true;
      }
      else{
        let user=localStorage.getItem('login');
        let userId = user && JSON.parse(user).id;       
        console.warn(userId);
        let cartData:cart={
          ...this.productData,
          userId,
          productId:parseInt(this.productData.id)
        }
        delete cartData.id;
        
        this.product.AddToCart(cartData).subscribe((result)=>{
          if(result){
            this.product.getCartList(userId);
            this.removeCart=true
          }
        })
      }
    }
  }

  removeFromCart(productId:string){
    if(!localStorage.getItem('login')){
      this.product.removeItemFromCart(productId);
    }
    else{

      this.cartData && this.product.removeFromCart(parseInt(this.cartData.id)).subscribe((result)=>{
        let user=localStorage.getItem('login');
        let userId = user && JSON.parse(user).id;   
        this.product.getCartList(userId)
      })
    }
    this.removeCart=false;
    
  }
}
