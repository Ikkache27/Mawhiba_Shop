import { AngularMaterialModule } from './../angular-material/angular-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent
    
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule.forChild([])
  ],
  exports:[
    BsNavbarComponent,
  ]
})
export class CoreModule { }
