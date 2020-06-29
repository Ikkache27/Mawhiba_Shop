import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {
  @Input('product') product;
  @Input('product-key') productKey;
  
  
  @Input('shopping-cart') shoppingCart;
  
  constructor(private shoppingCartService : ShoppingCartService) {
    
  }
  ngOnInit(): void {
    
    
  }
  addtoCart(){
    if (this.productKey) this.shoppingCartService.addToCart(this.product, this.productKey);
    else  this.shoppingCartService.addToCart(this.product, this.product.$key)
  }

  removeFromCart(){
    if (this.productKey) this.shoppingCartService.removeFromCart(this.product, this.productKey)
    else this.shoppingCartService.removeFromCart(this.product, this.product.$key)
  }
  


}
