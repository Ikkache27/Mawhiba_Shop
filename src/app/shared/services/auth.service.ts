import { UserService } from './user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, empty ,of} from 'rxjs'; 
import { ActivatedRoute } from '@angular/router';
import { AppUser } from 'shared/models/app-user';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ : Observable<firebase.User>;
  params: Observable<any> = of(null);
  constructor(private userService: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$=afAuth.authState;
   }
  
  login(){
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl)

    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())

  }
    
  logout(){

    this.afAuth.signOut()

  }

   get appUser$(): Observable<AppUser>{
    return this.user$.pipe(switchMap(user => 
      {if (user) 
        return this.userService.get(user.uid).valueChanges()
      
        return this.params
      
      
      }))  
      

}


}
