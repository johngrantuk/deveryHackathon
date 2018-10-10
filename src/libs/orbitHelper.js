import uuid from 'uuid';

const IPFS = require('ipfs-api');
const OrbitDB = require('orbit-db');

// const ipfs = IpfsApi('localhost', '5001')
let ipfs;
let orbitdb;

export const startDb = async () => {
  ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
  orbitdb = new OrbitDB(ipfs);
  let db = await orbitdb.log('hello');

  db = await orbitdb.keyvalue('first-database');
  await db.load();
  console.log(db.address.toString());

  let value = db.get('name');
  console.log(value);
  await db.put('name', 'john');

  value = db.get('name');
  console.log(value);
  // /orbitdb/Qmeh81koUnU5a6XE177a4Pn8Np34YwCniVj3yLgzqZMC8s/first-database
};

export const docsDb = async () => {
  ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
  orbitdb = new OrbitDB(ipfs);
  const db = await orbitdb.docs('tests');
  await db.load();
  console.log(db.address.toString());

  const hash = await db.put({ _id: new Date(), name: 'WHOOP', followers: 500 });
  const all = db.query(doc => doc.followers >= 1);
  console.log(all);

  if (all.length == 0) {
    console.log('Loading example data...');
  }
};

export const LoadUsersCar = async UserAccount => {
  ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
  orbitdb = new OrbitDB(ipfs);
  const db = await orbitdb.docs('cars');
  await db.load();

  console.log('User: ' + UserAccount);

  const all = db.query(doc => doc.owner == UserAccount);

  if (all.length == 0) {
    console.log('No Owner Cars');
  } else {
    console.log('Owner Cars: ');
    console.log(all);
  }
};

export const LoadCars = async () => {
  console.log('Loading Cars...')
  ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
  orbitdb = new OrbitDB(ipfs);
  const db = await orbitdb.docs('cars');
  await db.load();

  const all = db.query(doc => doc);

  if (all.length == 0) {
    console.log('No Cars');
    return [];
  } else {
    console.log('Cars: ');
    console.log(all);
    return all;
  }
};

export const LoadServices = async () => {
  console.log('Loading Services...')
  ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
  orbitdb = new OrbitDB(ipfs);
  const db = await orbitdb.docs('services');
  await db.load();

  const all = db.query(doc => doc);

  if (all.length == 0) {
    console.log('No Services');
    return [];
  } else {
    console.log('Services: ');
    console.log(all);
    return all;
  }
};

export const saveCar = async Car => {
  console.log('Saving car...');
  console.log(Car);
  ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
  orbitdb = new OrbitDB(ipfs);
  const db = await orbitdb.docs('cars');
  await db.load();

  const hash = await db.put(Car);
  console.log('Ok.');
};

export const saveService = async Service => {
  console.log('Saving service...');
  console.log(Service);
  ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
  orbitdb = new OrbitDB(ipfs);
  const db = await orbitdb.docs('services');
  await db.load();

  const hash = await db.put(Service);
  console.log('Ok.');
};

export const LoadBrands = async () => {
  console.log('Loading Brands...')
  ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
  orbitdb = new OrbitDB(ipfs);
  const db = await orbitdb.docs('brands');
  await db.load();

  const all = db.query(doc => doc);

  if (all.length == 0) {
    console.log('No Brands');
    return [];
  } else {
    console.log('Brands: ');
    console.log(all);
    return all;
  }
};

export const saveRecord = async (DbName, Record) => {
  /*
  Product DB:
  {"_id":"eacdc32f-9b97-4dcd-b29f-642c2241624a","brand":"0xeefc64d684a2de1566b9a3368150cc882aa0b683","address":"0x9D827bbfE2D04e3c076384F5D659dE795e875C90","name": "Tyre","details":"PremiumTyre-17651","year":"2018","origin":"UK"}
  */
  
  console.log('Saving record to: ' + DbName);
  console.log(Record);
  ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
  orbitdb = new OrbitDB(ipfs);
  const db = await orbitdb.docs(DbName);
  await db.load();

  const hash = await db.put(Record);
  console.log('Ok.');
};

export const LoadBrandProducts = async (BrandAddress) => {
  console.log('Loading Brands...')
  ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
  orbitdb = new OrbitDB(ipfs);
  const db = await orbitdb.docs('products');
  await db.load();

  const all = db.query(doc => doc.brand.toLowerCase() == BrandAddress.toLowerCase());

  if (all.length == 0) {
    console.log('No Products');
    return [];
  } else {
    console.log('Products: ');
    console.log(all);
    return all;
  }
};
