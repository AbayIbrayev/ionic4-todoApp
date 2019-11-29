import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, AlertController, LoadingController} from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [
    trigger('fadein', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('500ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class HomePage implements OnInit {
  taskList = [];
  taskName: string = "";
  userId: any;
  fireStoreTaskList: any;
  fireStoreList: any;
  @ViewChild('taskInput', {static: false}) input;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public afAuth: AngularFireAuth, public firestore: AngularFirestore, public loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
      this.input.setFocus();
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.fireStoreTaskList = this.firestore.doc<any>('users/' + this.userId).collection('tasks').valueChanges();
        this.fireStoreList = this.firestore.doc<any>('users/' + this.userId).collection('tasks');
      }
    });
  }

  addTask() {
    // if (this.taskName.length > 0) {
    //   let task = this.taskName;
    //   this.taskList.push(task);
    //   this.taskName = "";
    // }
    
    if (this.taskName.length > 0) {
      let task = this.taskName;
      let id = this.firestore.createId();
      this.fireStoreList.doc(id).set({
        id: id,
        taskName: task
      });
      this.taskName = "";
    }
    this.input.setFocus();
  }

  deleteTask(index) {
    setTimeout(() => {
      this.fireStoreList.doc(index).delete();
    }, 500)
  }

  async updateTask(index) {
    const alert = await this.alertCtrl.create({
      header: 'Update Task?',
      message: 'Type in your new task to update.',
      inputs: [{ name: 'editTask', placeholder: 'Task' }],
      buttons: [{ text: 'Cancel', role: 'cancel' },
      {
        text: 'Update', handler: data => {
          this.fireStoreList.doc(index).update({ taskName: data.editTask });
        }
      }
      ]
    });
    await alert.present();
  }

  async logout() {
    const loading = await this.loadingCtrl.create({
      message: "Logging out..",
    });
    await loading.present();

    this.afAuth.auth.signOut().then(authData => {
      this.navCtrl.navigateRoot('/login');
    });
  }
  
  ionViewDidLeave(){
    this.loadingCtrl.dismiss();
  }

}
