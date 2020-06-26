import { map, take, first } from 'rxjs/operators';
import { Product } from './models/product';
import { async } from '@angular/core/testing';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

import { Injectable } from '@angular/core';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db : AngularFireDatabase) { }

  private creat(){
    return this.db.list('shopping-carts').push({
      dateCreatd: new Date().getTime()

    })


  }

  async getCart() : Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreatId();
    return this.db.object('/shopping-carts/'+cartId).valueChanges().pipe(map((x:any)=>new ShoppingCart(x.items))) 

  }
  private async getOrCreatId(): Promise<string>{

    let cartId=localStorage.getItem('cartId')
    if (cartId) return cartId;

    let result = await this.creat()
    localStorage.setItem('cartId', result.key);
    return result.key;
    
  }
  private getItem(cartId, productId){
   
    return this.db.object('/shopping-carts/'+cartId+'/items/'+productId)



  }
  async addToCart(product: Product, productKey){
    let cart = await this.getOrCreatId();
    let items$=this.getItem(cart, productKey)
    items$.valueChanges().pipe(take(1))
    .subscribe((item:any) =>{if (item) items$.update({quantity : item.quantity + 1});
                            else items$.set({product : product, quantity : 1})}  
    )}

    async removeFromCart(product: Product, productKey){
        this.updateQuantity(product, productKey, -1)

    }
    private async updateQuantity(product, productKey,change:number){
      let cart = await this.getOrCreatId();
      let items$=this.getItem(cart, productKey)
      items$.valueChanges().pipe(take(1))
      .subscribe((item:any) =>{items$.update({product : product, quantity : (item.quantity || 0) + change})
                             
    })


    }
  }