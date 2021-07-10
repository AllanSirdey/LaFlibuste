import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'la-flib';

  constructor() {
    const firebaseConfig = {
        apiKey: "AIzaSyD-FM3WXYlpnhJDI6LzWTY5BYCAEQSW224",
        authDomain: "la-flib.firebaseapp.com",
        projectId: "la-flib",
        storageBucket: "la-flib.appspot.com",
        messagingSenderId: "449122164912",
        appId: "1:449122164912:web:7a7e11eefa6b0eca2c5b75",
        measurementId: "G-2D0Q9VKFNW"
      };

      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
    }
}
