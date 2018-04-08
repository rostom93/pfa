import { Component, ViewChild } from '@angular/core';

import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';
import { Unsubscribe } from '@firebase/util';
import { firebaseConfig } from './credentials.backup';

import { AuthProvider } from '../providers/auth/auth';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { GestcliPage } from '../pages/gestcli/gestcli';
import { GestlivreurPage } from '../pages/gestlivreur/gestlivreur';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public authProvider: AuthProvider
  ) {
    
    firebase.initializeApp(firebaseConfig);

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'gestion des clients', component: GestcliPage },
      { title: 'gestion des Livreurs', component: GestlivreurPage }
    ];

    const unsubscribe: Unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.rootPage = HomePage;
        unsubscribe();
      } else {
        this.rootPage = 'LoginPage';
        unsubscribe();
      }
    });

    
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  async logOut(): Promise<void> {
    await this.authProvider.logoutUser();
    this.nav.setRoot(LoginPage);
  }

}
