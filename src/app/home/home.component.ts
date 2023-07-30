import { Component,OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 trendyProducts:undefined| product[];
  productData: undefined|product;
  productQuantity:number=1;
 constructor(private product:ProductsService){}
 ngOnInit(): void {
   this.product.trendyProducts().subscribe((data)=>{
    this.trendyProducts=data;
   });
 }
}
