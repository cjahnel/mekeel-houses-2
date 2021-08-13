import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { first, share, switchMap } from 'rxjs/operators';

export interface Roles {
  admin?: boolean;
  benevolentDictator?: boolean;
  teacher?: boolean;
}

export interface User {
  displayName?: string;
  email: string;
  photoUrl?: string;
  roles?: Roles;
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isTeacher$: Observable<boolean>;
  user$: Observable<firebase.User | null>;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.isTeacher$ = this.auth.user
      .pipe(
        share(),
        switchMap(firebaseUser => {
          if (firebaseUser) {
            return this.firestore.doc<User>(`users/${firebaseUser.uid}`).valueChanges()
              .pipe(
                first(),
                switchMap(user => {
                  return of(!!user?.roles?.teacher);
                })
              );
          } else {
            return of(false);
          }
        })
      );
    this.user$ = this.auth.user;
  }

  async login(): Promise<void> {
    await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

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
  
  async logout(): Promise<void> {
    await this.auth.signOut();
  }

}
