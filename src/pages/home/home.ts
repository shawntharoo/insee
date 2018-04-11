import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { PrintProvider } from '../../providers/print/print';
import { PrinterListModalPage } from '../printer-list-modal/printer-list-modal';
import { Printer, PrintOptions } from '@ionic-native/printer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedPrinter: any = [];
  items = ["asdas", "saff", "hdhfd", "zjndnf"];
  hardwares=[];
  myInput:any;

  constructor(public navCtrl: NavController, private modalCtrl: ModalController,
    private printProvider: PrintProvider,
    private alertCtrl: AlertController,
    private printer: Printer) { 

  }

  print() {
    var content = "test printing";
    this.printer.isAvailable().then(onSuccess => {
      let mno = this.alertCtrl.create({
        title: "success",
        buttons: ['Dismiss']
      });
      mno.present();
    }).catch(e => console.log("reject: " + e));

    let options: PrintOptions = {
      name: 'MyDocument',
      printerId: 'printer007',
      duplex: true,
      landscape: true,
      grayscale: true
    };

    this.printer.print(content, options).then(onSuccess => {
      let mno = this.alertCtrl.create({
        title: "success",
        buttons: ['Dismiss']
      });
      mno.present();
    }).catch(e => console.log("reject: " + e));
  }

  listBTDevice() {
    this.printProvider.searchBt().then(datalist => {

      //1. Open printer select modal
      let abc = this.modalCtrl.create(PrinterListModalPage, { data: datalist });

      //2. Printer selected, save into this.selectedPrinter
      abc.onDidDismiss(data => {
        this.selectedPrinter = data;

        let xyz = this.alertCtrl.create({
          title: data.name + " selected",
          buttons: ['Dismiss']
        });
        xyz.present();

      });

      //0. Present Modal
      abc.present();

    }, err => {
      console.log("ERROR", err);
      let mno = this.alertCtrl.create({
        title: "ERROR " + err,
        buttons: ['Dismiss']
      });
      mno.present();
    })

  }

  testConnectPrinter() {
    var id = this.selectedPrinter.id;
    if (id == null || id == "" || id == undefined) {
      //nothing happens, you can put an alert here saying no printer selected
    }
    else {
      let foo = this.printProvider.connectBT(id).subscribe(data => {
        console.log("CONNECT SUCCESSFUL", data);

        let mno = this.alertCtrl.create({
          title: "Connect successful",
          buttons: ['Dismiss']
        });
        mno.present();

      }, err => {
        console.log("Not able to connect", err);
        let mno = this.alertCtrl.create({
          title: "ERROR " + err,
          buttons: ['Dismiss']
        });
        mno.present();
      });
    }
  }

  testPrinter() {
    var id = this.selectedPrinter.id;
    if (id == null || id == "" || id == undefined) {
      //nothing happens, you can put an alert here saying no printer selected
    }
    else {
      let foo = this.printProvider.testPrint(id);
    }
  }

  // onInput(searchTerm){
  //   return this.items.filter((item) => {
  //     return item.toLowerCase().indexOf(searchTerm.target.value.toLowerCase()) > -1;
  // }); 
  // }

    onInput(searchTerm){
      this.hardwares = [];
     this.items.filter((item) => {
      if (item.toLowerCase().indexOf(searchTerm.target.value.toLowerCase()) > -1){
        this.hardwares.push(item);
      }
  }); 
  }

  fillBox(selHard){
    this.myInput = selHard;
    this.hardwares = null;
  }

}
