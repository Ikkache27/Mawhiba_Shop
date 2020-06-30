import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from 'shared/services/auth-guard.service';

import { AngularMaterialModule } from './../angular-material/angular-material.module';
import { SharedModule } from './../shared/shared.module';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';



@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,

  ],
  imports: [
    
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    RouterModule.forChild([   
      {path: 'admin/product/new', component : ProductFormComponent, canActivate:[AuthGuardService, AdminAuthGuardService]},      
      {path: 'admin/product/:id', component : ProductFormComponent, canActivate:[AuthGuardService, AdminAuthGuardService]},
      {path: 'admin/products', component : AdminProductsComponent, canActivate:[AuthGuardService, AdminAuthGuardService]},
      {path: 'admin/orders', component : AdminOrdersComponent, canActivate:[AuthGuardService, AdminAuthGuardService]}
    ]),
  ],
  providers:[
    AdminAuthGuardService
  ],
})
export class AdminModule { }
