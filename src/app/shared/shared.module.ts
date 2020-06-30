import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AngularMaterialModule } from './../angular-material/angular-material.module';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductSeriveService } from './services/product-serive.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  exports:[
    ProductCardComponent,
    ProductQuantityComponent,
    
  ],
  providers:[
    OrderService, 
    ShoppingCartService , 
    ProductSeriveService, 
    CategoryService, 
    AuthService, 
    AuthGuardService, 
    UserService
  ],
})
export class SharedModule { }
