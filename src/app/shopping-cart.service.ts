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

  async cleartCart(){

    let cartId= await this.getOrCreatCartId();
    this.db.object('/shopping-carts/'+cartId+'/items').remove()
  }
  
  
  
  private creat(){
    return this.db.list('/shopping-carts').push({
      dateCreatd: new Date().getTime()

    })


  }

  getCart() {
    let cart_Id= this.getOrCreatCartId()
    
    return this.db.object('/shopping-carts/'+cart_Id).valueChanges().pipe(map((x:any)=>new ShoppingCart(x.items) )) 

  }
  private getOrCreatCartId(){

    let cartId=localStorage.getItem('cartId');
    if (cartId) return cartId;  
    
    let result=this.creat()
    localStorage.setItem('cartId', result.key);
    return result.key;
    
  }
  private getItem(cartId, productId){
   
    return this.db.object('/shopping-carts/'+cartId+'/items/'+productId)



  }
  addToCart(product: Product, productKey){
    let cart=this.getOrCreatCartId();
    let items$=this.getItem(cart, productKey)
    items$.valueChanges().pipe(take(1))
    .subscribe((item:any) =>{if (item) items$.update({quantity : item.quantity + 1});
                            else items$.set({title : product.title,
                              imageURL : product.imageURL,
                              price : product.price, quantity : 1})}  
    )}

   removeFromCart(product: Product, productKey){
        this.updateItem(product, productKey, -1)

    }
    private updateItem(product:Product, productKey,change:number){
      let cart=this.getOrCreatCartId();
      
      let items$=this.getItem(cart, productKey)
      
      items$.valueChanges().pipe(take(1))
      .subscribe((item:any) =>{
        let quantity = item.quantity +change
        if (quantity===0) items$.remove();
        else items$.update({
        title : product.title,
        imageURL : product.imageURL,
        price : product.price, 
        quantity : quantity})
                             
    })


    }
  }