import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the MarketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-market',
  templateUrl: 'market.html',
})
export class MarketPage {

  objectKeys = Object.keys;
  coins: Object;
  likedCoins = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataProvider, private storage: Storage) {

  }

  ionViewDidLoad() {
   
  }

  ionViewWillEnter() {
    this.refreshCoins();
  }

  refreshCoins() {
    this.storage.get('likedCoins').then((val) => {

      // If the value is not set then display default coins
      if(!val) {
        this.likedCoins.push('BTC','ETH','DASH', 'IOT');
        this.storage.set('likedCoins', this.likedCoins);

        this._data.getCoins(this.likedCoins)
          .subscribe(res => {
            this.coins = res;
          })
      } 
      // User had liked coins
      else {
        this.likedCoins = val;

        this._data.getCoins(this.likedCoins)
          .subscribe(res => {
            this.coins = res;
          })
      }

    })
  }

}
