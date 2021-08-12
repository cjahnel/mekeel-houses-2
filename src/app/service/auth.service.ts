import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

// export interface Roles {
//   admin?: boolean;
//   benevolentDictator?: boolean;
//   teacher?: boolean;
// }

// export interface User {
//   displayName?: string;
//   email: string;
//   photoUrl?: string;
//   roles?: Roles;
//   uid: string;
// }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user: Observable<User | undefined | null>;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    // this.user = this.auth.user.pipe(
    //   switchMap(user => {
    //     if (user) {
    //       return this.firestore.doc<firebase.User>(`users/${user.uid}`).valueChanges()
    //     } else {
    //       return of(null)
    //     }
    //   })
    // )
    // this.user = this.afAuth.authState.pipe(
    //   switchMap(user => {
    //     if (user) {
    //       return this.firestore.doc<User>(`users/${user.uid}`).valueChanges()
    //     } else {
    //       return of(null);
    //     }
    //   })
    // )
  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut();
  }

  // async login() {
  //   await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  //   this.updateUserData(this.auth.user)
  // }
  // logout() {
  //   this.auth.signOut();
  // }

  // async login() {
  //   await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  //   this.afAuth.user
  //   const provider = new auth.GoogleAuthProvider();
  //   const credential = await this.afAuth.signInWithPopup(provider);
  //   return this.updateUserData(credential.user);
  // }

  // async signOut() {
  //   await this.afAuth.signOut();
  //   return this.router.navigate(['/']);
  // }

  // private updateUserData({ uid, email, displayName, photoURL }: Observable<firebase.User>) {
  //   const userRef = this.firestore.doc(`users/${uid}`);

  //   const data = {
  //     uid,
  //     email,
  //     displayName,
  //     photoURL,
  //   };

  //   return userRef.set(data, { merge: true });
  // }

  // private checkAuthorization(user: User, allowedRoles: string[]): boolean {
  //   if (!user || !user.roles) {
  //     return false;
  //   }
  //   for (const role of allowedRoles) {
  //     if (user.roles[role]) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // isTeacher(user: User): boolean {
  //   const allowed = ['teacher', 'admin', 'benevolentDictator'];
  //   return this.checkAuthorization(user, allowed);
  // }

  // isAdmin(user: User): boolean {
  //   const allowed = ['admin', 'benevolentDictator'];
  //   return this.checkAuthorization(user, allowed);
  // }

  // isBenevolentDictator(user: User): boolean {
  //   const allowed = ['benevolentDictator'];
  //   return this.checkAuthorization(user, allowed);
  // }
}
