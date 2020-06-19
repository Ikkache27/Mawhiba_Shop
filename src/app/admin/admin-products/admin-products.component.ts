import { Product } from './../../models/product';
import { ProductSeriveService } from './../../product-serive.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';



@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})


export class AdminProductsComponent implements OnInit, OnDestroy {
  products:{key: string, value:Product}[];
  filtredProduct:any[] 
  displayedColumns: string[] = ['Title', 'Price', 'Edit'];
  subscription : Subscription
  constructor(private productService :ProductSeriveService) { }

  ngOnInit(): void {
    this.subscription=this.productService.getAll().subscribe(p => this.filtredProduct=this.products=p)
     }

  ngOnDestroy(){
    this.subscription.unsubscribe()

  }
  

  filter(query:string){
    this.filtredProduct =(query) ? 
    this.products.filter(p=>p.value.title.toLowerCase().includes(query.toLowerCase())) : this.products 



  }


}


