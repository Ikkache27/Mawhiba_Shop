import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$
  displayedColumns: string[] = ['product', 'quantity','price'];
  
  constructor(private ShoppingCartService : ShoppingCartService) { }

  async ngOnInit() {
  this.cart$=await this.ShoppingCartService.getCart()
  }

}
