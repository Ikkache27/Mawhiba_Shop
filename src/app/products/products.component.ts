import { ShoppingCart } from './../models/shopping-cart';
import { CategoryService } from './../category.service';
import { ShoppingCartService } from './../shopping-cart.service';
import { switchMap, take } from 'rxjs/operators';
import { Product } from './../models/product';
import { ProductSeriveService } from './../product-serive.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: {key:string,value:Product}[]=[]
  filtredProduct : {key:string,value:Product}[]=[]
  category;
  cart ;
  subscription : Subscription
  catUrl;
  
  constructor(private categoryService:CategoryService, private shoppingCartService : ShoppingCartService, private route:ActivatedRoute, private productSerive : ProductSeriveService) {
    
    this.populateProduct()
    
     
  }

  
  
  ngOnInit() {
     this.subscription=this.shoppingCartService.getCart().subscribe(cart=>this.cart=cart)

  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  populateProduct(){
    
    this.productSerive.getAll().pipe(switchMap(p=>{this.products=p;
      return this.route.queryParamMap}))
      .subscribe(params=> {this.category=params.get('category');  
      this.applyFilter()
  
        
  })
  }
applyFilter(){
  this.filtredProduct = (this.category)?
    this.products.filter(p=>p.value.category==this.category) : this.products
    
}

 
}
