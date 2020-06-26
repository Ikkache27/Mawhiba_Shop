import { Product } from './models/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';


export interface Item { title: string,price: number,category:string, imageURL:string }
@Injectable({
  providedIn: 'root'
})

export class ProductSeriveService {

  constructor(private afs : AngularFirestore, private db: AngularFireDatabase) { }

  creat(product){
    return this.db.list('/products').push(product)


  }
  getAll(){

    return  this.db.list<Product>('/products').snapshotChanges()
      .pipe(map(action => action.map(data => ({key: data.payload.key, value:data.payload.val()}))))
  }

  get(productId){
    return  this.db.object('/products/'+productId).snapshotChanges().pipe(map(res => {
      return res.payload.val();}),take(1))

    }

    update(productId, product){

      return this.db.object('/products/'+productId).update(product)
    }

    delete(productId){

      return this.db.object('/products/'+ productId).remove()

       



    }

}
