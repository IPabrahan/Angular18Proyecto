import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  router = inject(Router)
  userData: any = null;
  $isLoggedIn: WritableSignal<boolean> = signal(false)

  constructor(private auth: AngularFireAuth) {
    //Comprobar si el usuario esta logueado automaticamente
    this.auth.authState.subscribe(data => {
      if (data) {
        //Estoy loggedIn
        this.userData = data;
        this.$isLoggedIn.set(true);
      } else {
        //No estoy loggeIn
        this.userData = null;
        this.$isLoggedIn.set(false);
        this.router.navigate(['/login']);
      }
    })
  }

  async login() {
    try {
      let user = await this.auth.signInWithPopup(new GoogleAuthProvider())
      console.log(user)
      return user;
    } catch (err) {
      console.error(err)
      return err;
    }
  }

  logout() {
    this.auth.signOut();
  }

}
