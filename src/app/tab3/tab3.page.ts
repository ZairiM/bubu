import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public storage: Storage, public alertController: AlertController, public camera: Camera) {}

  user:any;

  guardar(){
    this.storage.set('us', { name:'Marion', lastname:'Pineda', phone:'+57 123456789'});
  }

  leer(){
    this.storage.get('us').then((val) => {
      console.log(val);
      this.user = val;
    }).catch((error)=>{
      console.log(error);
    });
    this.presentAlertMultipleButtons();
  }

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      header: 'Usuario',
      subHeader: 'Los datos del usuario son:',
      message: this.user.name +"-" +this.user.lastname+"-"+this.user.phone,
      buttons: ['Cancelar','Guardar']
    });

    await alert.present();
  }

  tomarCamara(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      // Handle error
     });
  }
}
