import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from "../../validators/email";
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  public resetPwdForm: FormGroup;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public afAuth: AngularFireAuth, public firestore: AngularFirestore) {
    this.resetPwdForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
    });
   }

  ngOnInit() {
  }

  resetUserPwd() {
    this.afAuth.auth.sendPasswordResetEmail(this.resetPwdForm.value.email).then(async (user) => {
      const alert = await this.alertCtrl.create({
        message: "We just sent a link to reset your password to your email.",
        buttons: [{
          text: "Ok", role: 'cancel',
          handler: () => {
            this.navCtrl.navigateBack('/login');
          }
        }]
      });
      await alert.present();
    }, async (error) => {
      const errorAlert = await this.alertCtrl.create({
        message: error.message,
        buttons: [{ text: "Ok", role: 'cancel' }]
      });
      await errorAlert.present();
    });
  }

}
