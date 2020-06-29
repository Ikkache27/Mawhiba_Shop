import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$
  displayedColumns: string[] = ['image','product', 'quantity','price'];
  
  constructor(private ShoppingCartService : ShoppingCartService) { }

  async ngOnInit() {
  this.cart$=await this.ShoppingCartService.getCart()
  }

  clearCart(){

    this.ShoppingCartService.cleartCart();
  }

}
