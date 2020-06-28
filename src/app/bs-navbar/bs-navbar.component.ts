import { ShoppingCart } from './../models/shopping-cart';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppUser } from '../models/app-user';
import { AngularFireObject } from '@angular/fire/database';


@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent  implements OnInit, OnDestroy{
  appUser : AppUser
  cart 
  subscription : Subscription
  constructor(private auth : AuthService, private shoppingCartService : ShoppingCartService) { 
    
  }
  ngOnInit(){
       
    this.auth.appUser$.subscribe(appUser => this.appUser=appUser)
    this.shoppingCartService.getCart().subscribe(cart=>this.cart=cart)
   
  }
  ngOnDestroy(){

    this.subscription.unsubscribe()
  }
  
  login(){

      this.auth.login()


  }

  logout(){
    this.auth.logout()

  }

}
