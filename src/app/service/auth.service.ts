import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

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
  user$: Observable<firebase.User | null>;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.user$ = this.auth.user;
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

  login(): void {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

    // let callback: ((snapshot: firebase.firestore.DocumentSnapshot<unknown>) => void) | null = null;
    // let metadataRef: DocumentReference<unknown> | null = null;
    // let listener: () => void;
    // this.auth.onAuthStateChanged(user => {
    //   // Remove previous listener.
    //   if (callback) {
    //     // metadataRef.off('value', callback);
    //     listener();
    //   }
    //   // On user login add new listener.
    //   if (user) {
    //     // Check if refresh is required.
    //     metadataRef = this.firestore.doc(`metadata/${user.uid}/refreshTime`).ref;
    //     // metadataRef = firebase.database().ref('metadata/' + user.uid + '/refreshTime');
    //     callback = (snapshot: firebase.firestore.DocumentSnapshot<unknown>) => {
    //       // Force refresh to pick up the latest custom claims changes.
    //       // Note this is always triggered on first call. Further optimization could be
    //       // added to avoid the initial trigger when the token is issued and already contains
    //       // the latest claims.
    //       user.getIdToken(true);
    //     };
    //     // Subscribe new listener to changes on that node.
    //     listener = metadataRef.onSnapshot(callback);
    //   }
    // });
  }

  async isAdmin(): Promise<boolean | undefined> {
    const currentUser = await this.auth.currentUser;
    const idTokenResult = await currentUser?.getIdTokenResult();
    return idTokenResult?.claims.admin;
  }
  
  logout(): void {
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
