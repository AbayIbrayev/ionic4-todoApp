import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openWebsite() {
    window.open("https://github.com/AbayIbrayev/ionic4-todoApp", '_blank');
  }

}
