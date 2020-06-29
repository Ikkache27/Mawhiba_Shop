import { map , take} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { database } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db : AngularFireDatabase) { }
  getAll(){
    return this.db.list('/categories',ref => ref.orderByChild('name')).snapshotChanges()
    .pipe(map(action => action.map(data => ({key: data.payload.key, value:data.payload.val()}))))
  }


  getCategoryUrl(product){
    return  this.db.object('/categories/'+product).snapshotChanges().pipe(map((res:any) => {
      return res.payload.val().imageURL;}),take(1))

    }

 /**getImageUrlCategory(name){
    return  this.db.object('/categories/'+name).snapshotChanges().pipe(map(res => {
      return res.payload.val();
     }),take(1))


  }**/
}
