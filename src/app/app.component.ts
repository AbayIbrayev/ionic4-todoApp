import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { AngularFireAuth } from 'angularfire2/auth';

import { Router, RouterEvent, NavigationEnd } from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{

  ngOnInit() { }

  rootPage: any = LoginPage;

  pages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'About',
      url: '/about',
      icon: 'information-circle'
    }
  ];

  selectedPath = '';


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afAuth: AngularFireAuth,
    private router: Router,
    private menuCtrl: MenuController
  ) {
    this.initializeApp();
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  
  const authObserver = this.afAuth.authState.subscribe(user => {
    if (user) {
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      } else {
          this.rootPage = LoginPage;
          authObserver.unsubscribe();
      }
    });

  }
}