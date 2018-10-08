import uuid from 'uuid';

const IPFS = require('ipfs-api')
const OrbitDB = require('orbit-db')

//const ipfs = IpfsApi('localhost', '5001')
let ipfs;
let orbitdb;

export const startDb = async () => {
  ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
  orbitdb = new OrbitDB(ipfs)
  let db = await orbitdb.log('hello')

  db = await orbitdb.keyvalue('first-database');
  await db.load()
  console.log(db.address.toString());

  let value = db.get('name');
  console.log(value)
  await db.put('name', 'john');

  value = db.get('name');
  console.log(value)
  // /orbitdb/Qmeh81koUnU5a6XE177a4Pn8Np34YwCniVj3yLgzqZMC8s/first-database
}

export const docsDb = async () => {
  ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
  orbitdb = new OrbitDB(ipfs);
  let db = await orbitdb.docs('tests');
  await db.load();
  console.log(db.address.toString());

  const hash = await db.put({ _id: new Date(), name: 'WHOOP', followers: 500 });
  const all = db.query((doc) => doc.followers >= 1);
  console.log(all);

  if(all.length == 0){
    console.log('Loading example data...');
  }
}

export const LoadUsersCar = async (UserAccount) => {
  ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
  orbitdb = new OrbitDB(ipfs);
  let db = await orbitdb.docs('cars');
  await db.load();

  console.log('User: ' + UserAccount)

  const all = db.query((doc) => doc.owner == UserAccount);

  if(all.length == 0){
    console.log('No Owner Cars');
  }else{
      console.log('Owner Cars: ')
      console.log(all);
  }
}

export const saveCar = async (Car) => {
  console.log('Saving car...');
  console.log(Car);
  ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
  orbitdb = new OrbitDB(ipfs);
  let db = await orbitdb.docs('cars');
  await db.load();

  const hash = await db.put(Car);
  console.log('Ok.');
}

export const saveCarOld = async (Owner, Type, Model, Year, PicHash, IsSelling) => {
  ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
  orbitdb = new OrbitDB(ipfs);
  let db = await orbitdb.docs('cars');
  await db.load();

  const hash = await db.put({ _id: uuid.v4(), owner: Owner, type: Type, model: Model, year: Year, picHash: PicHash, isSelling: IsSelling, created: new Date() });
}
