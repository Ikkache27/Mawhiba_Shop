import { ShoppingCart } from 'shared/models/shopping-cart';
import { Product } from 'shared/models/product';
import { take } from 'rxjs/operators';
import { CategoryService } from 'shared/services/category.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product:Product;
  @Input('product-key') productKey;
  
  @Input('show-actions') showActions=true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  @Input('categoryImageUrl') categoryImageUrl;
  @Input('categoryImageURL') categoryImageURL$;
  constructor(private shoppingCartService : ShoppingCartService, private categoryService: CategoryService) {
    
  }
  ngOnInit(): void {
    if (this.product.category) {this.categoryImageURL$=this.categoryService.getCategoryUrl(this.product.category)
      
    
   }
    
  }
  addtoCart(){
    this.shoppingCartService.addToCart(this.product, this.productKey)
  }
  

  
}
