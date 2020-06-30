import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { AngularMaterialModule } from 'app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';



@NgModule({
  declarations: [
    CheckOutComponent,
    OrderSuccessComponent,
    ShoppingCartComponent,
    MyOrdersComponent,  
    ProductsComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    ProductFilterComponent,
    
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    RouterModule.forChild([
      {path: 'products', component : ProductsComponent},
      {path: 'shopping-cart', component : ShoppingCartComponent},
      {path: 'check-out', component : CheckOutComponent, canActivate:[AuthGuardService]},
      {path: 'order-success/:id', component : OrderSuccessComponent, canActivate:[AuthGuardService]},
      {path: 'my/orders', component : MyOrdersComponent, canActivate:[AuthGuardService]},
      ])
  ]
})
export class ShoppingModule { }
