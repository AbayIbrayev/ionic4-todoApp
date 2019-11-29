import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from "../../validators/email";
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public afAuth: AngularFireAuth, public firestore: AngularFirestore) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
   }

  ngOnInit() {
  }


  async loginUser() {
    this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then(() => {
      this.navCtrl.navigateRoot('/home');
    }, (error) => {
      this.loadingCtrl.dismiss().then(async () => {
        const alert = await this.alertCtrl.create({
          message: error.message,
          buttons: [{ text: "Ok", role: 'cancel' }]
        });
        await alert.present();
      });
    });
    const loading = await this.loadingCtrl.create({
      message: "Signing in..",
    });
    await loading.present();
  }

  ionViewDidLeave() {
    this.loadingCtrl.dismiss();
  }
}
