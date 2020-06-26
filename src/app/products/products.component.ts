import { CategoryService } from './../category.service';
import { ShoppingCartService } from './../shopping-cart.service';
import { switchMap, take } from 'rxjs/operators';
import { Product } from './../models/product';
import { ProductSeriveService } from './../product-serive.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: {key:string,value:Product}[]=[]
  filtredProduct : {key:string,value:Product}[]=[]
  category;
  cart;
  catUrl;
  subscription : Subscription
  constructor(private categoryService:CategoryService, private shoppingCartService : ShoppingCartService, private route:ActivatedRoute, private productSerive : ProductSeriveService) {
    productSerive.getAll().pipe(switchMap(p=>{this.products=p;
      return route.queryParamMap}))
      
      .subscribe(params=> {this.category=params.get('category');  this.filtredProduct = (this.category)?
    this.products.filter(p=>p.value.category==this.category) : this.products
  
        
  })
    
     
  }

  
  
  async ngOnInit() {
    this.subscription=(await this.shoppingCartService.getCart())
    .subscribe(cart=> this.cart=cart)

  }

  ngOnDestroy(){
    this.subscription.unsubscribe()

  }

 
}
