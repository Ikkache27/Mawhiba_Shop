import { ShoppingCart } from './../models/shopping-cart';
import { Observable } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app-user';
import { AngularFireObject } from '@angular/fire/database';


@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent  implements OnInit{
  appUser : AppUser
  cart$ 
  constructor(private auth : AuthService, private shoppingCartService : ShoppingCartService) { 
    
  }
  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser => this.appUser=appUser)
    this.cart$= await this.shoppingCartService.getCart()
    
   
  }
  login(){

      this.auth.login()


  }

  logout(){
    this.auth.logout()

  }

}
