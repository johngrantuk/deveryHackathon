import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

const devery = require('@devery/devery');
const DeveryRegistry = devery.DeveryRegistry;

let deveryRegistryClient = new DeveryRegistry();

class App2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.getApp();
  }

  async getApp(){
    let productAddress = '0x8f80708Cae88d8487A8A270E7a641f16cEEe472e';
    productAddress = '0x2a6aa0af60f753e020030d5fe7cf1a6da3de9a81';
       let itemAddress = '0xEefc64D684A2dE1566b9A3368150cC882aA0B683';

       /*
       Random Item: 0xEefc64D684A2dE1566b9A3368150cC882aA0B683 App.jsx:180:17
Item hash: 0x6963fe6722d3c53961ba5ad092bc05b97fa3470a94e497f741acd5a70b95f060 App.jsx:182:19
Marking item... App.jsx:183:19
transaction address 0xedf26e5c471c99eae5bfbb4ff3e2b23574b2ae50863d29bc1b12399d5e81f27a
*/

      let noApps = await deveryRegistryClient.appAccountsLength();
      console.log('NoApps: ' + noApps);

       let app = await deveryRegistryClient.getApp('0xf8b908e7DBb3a0f2581aa8F1962f9360e10DC059')
       if(app.active){
           console.log(app.appName);
           //... other stuff
       }
       else{
         console.log("AutoApp doesn't exist. Creating...");
         this.createApp();
       }

       let brand = await deveryRegistryClient.getBrand('0xf8b908e7DBb3a0f2581aa8F1962f9360e10DC059')
       if(!brand.active){
         console.log('Brand not created, creating...')
         transaction = await deveryRegistryClient.addBrand("0xf8b908e7DBb3a0f2581aa8F1962f9360e10DC059","Garage Brand")
         return;
           //... other stuff
       }


       let product = await deveryRegistryClient.getProduct(productAddress)
       if(product.active){
          console.log('Product Details:')
           console.log(product.details);
           this.MarkItem(productAddress, itemAddress)
           //... other stuff
                  // this.productTest(itemAddress);
          let item = await deveryRegistryClient.check(itemAddress);
          console.log('Item Check:')
          console.log(item.productAccount)
          console.log(item)
       }else{
         console.log('Product doesnt exist');
         let proAddress = devery.Utils.getRandomAddress();
         console.log('Addr: ' + proAddress)
         let transaction = await deveryRegistryClient.addProduct(proAddress,'MOT','Accredited: 7823B12AE',1999,'Kirknewton')
         console.log('transaction address',transaction.hash);
         console.log('Wait for mine')
       }




  }

  async createApp(){
     try{
         let transaction = await deveryRegistryClient.addApp("AutoApp","0xf8b908e7DBb3a0f2581aa8F1962f9360e10DC059",5)
         console.log('transaction address',transaction.hash);
     }
     catch(err){
        console.log(err)
         if(err.message.indexOf('User denied')){
              console.log('The user denied the transaction')
             //...
         }

     ///handle other exceptions here
   }

 }

  async MarkItem(productAddress, itemAddress){
       try{
           console.log('MARKITEM')

           let hash = deveryRegistryClient.addressHash(itemAddress).then(hash => {
                console.log('Item hash: ' + hash);

                console.log('Marking item...')
                deveryRegistryClient.mark(productAddress, hash).then(transaction => {
                  console.log('transaction address',transaction.hash);


                }).catch(err => {
                  console.log('Hash errror')
                  console.log(err.message)
                })


           })

       }
       catch(err){

        console.log('Add Product Error:')
        console.log(err.message);
           if(err.message.indexOf('User denied')){
                console.log('Add Product - The user denied the transaction')
               //...
           }

       ///handle other exceptions here
       }

  }

  render() {
        return (
          <div>
              <h1>POT HOLE HUNTER</h1>

          </div>
        );
  }
}

export default hot(module)(App);
