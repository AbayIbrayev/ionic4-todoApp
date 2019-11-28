import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
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
        animate('900ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class HomePage implements OnInit {
  taskList = [];
  taskName: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) { }

  ngOnInit() {
  }

  addTask() {
    if (this.taskName.length > 0) {
      let task = this.taskName;
      this.taskList.push(task);
      this.taskName = "";
    }
  }

  deleteTask(index) {
    setTimeout(() => {
      this.taskList.splice(index, 1);
    }, 200)
  }

  async updateTask(index) {
    const alert = await this.alertCtrl.create({
      header: 'Update Task?',
      message: 'Type in your new task to update.',
      inputs: [{ name: 'editTask', placeholder: 'Task' }],
      buttons: [{ text: 'Cancel', role: 'cancel' },
      {
        text: 'Update', handler: data => {
          this.taskList[index] = data.editTask;
        }
      }
      ]
    });
    await alert.present();
  }

}
