import { Subscription } from 'rxjs';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';




@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  cart;
  cartSubscription :Subscription;
  
  constructor( private shoppingCartService : ShoppingCartService) { }

  ngOnInit(){
    this.cartSubscription=this.shoppingCartService.getCart().subscribe(cart=>this.cart=cart)
    

  }
  ngOnDestroy(){
    this.cartSubscription.unsubscribe()
  }

  

}
