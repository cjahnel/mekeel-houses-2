import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AddPointsDialogComponent } from './main/house-card/add-points-dialog/add-points-dialog.component';
import { HouseCardComponent } from './main/house-card/house-card.component';
import { MainComponent } from './main/main.component';

var firebaseConfig = {
  apiKey: "AIzaSyAcMv9p9tgz8S4Y3BcBLcQu3oHBFD0mUkk",
  authDomain: "mekeel-houses.firebaseapp.com",
  databaseURL: "https://mekeel-houses.firebaseio.com",
  projectId: "mekeel-houses",
  storageBucket: "mekeel-houses.appspot.com",
  messagingSenderId: "555757491083",
  appId: "1:555757491083:web:4aeeb402a90e3da03dd58e",
  measurementId: "G-KRFCDTJ4YW"
};

@NgModule({
  declarations: [
    AddPointsDialogComponent,
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HouseCardComponent,
    MainComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
