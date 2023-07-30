import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { product } from '../data-type';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})

export class SaleComponent implements OnInit {
  trendyProducts:undefined| product[];
  constructor(private product:ProductsService){}
  ngOnInit(): void {
    this.product.trendyProducts().subscribe((data)=>{
     this.trendyProducts=data;
    });
  }
 }