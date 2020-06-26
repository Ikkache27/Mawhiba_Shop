import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {
  @Input('product') product:Product;
  @Input('product-key') productKey;
  
  
  @Input('shopping-cart') shoppingCart;
  
  constructor(private shoppingCartService : ShoppingCartService) {
    
  }
  ngOnInit(): void {
    
    
  }
  addtoCart(){
    this.shoppingCartService.addToCart(this.product, this.productKey)
  }
  removeFromCart(){
    this.shoppingCartService.removeFromCart(this.product, this.productKey)

  }
  


}
