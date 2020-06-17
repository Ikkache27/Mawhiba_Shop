import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { database } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db : AngularFireDatabase) { }
  getCategories(){
    return this.db.list('/categories',ref => ref.orderByChild('name')).snapshotChanges()
    .pipe(map(action => action.map(data => ({key: data.payload.key, value:data.payload.val()}))))


  }

}
