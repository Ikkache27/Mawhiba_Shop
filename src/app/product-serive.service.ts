import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductSeriveService {

  constructor(private db: AngularFireDatabase) { }

  creat(product){
    return this.db.list('/products').push(product)


  }


}
