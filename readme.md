# Auto Tracker

Here's my [demo video]().

## Description

When purchasing a car it is difficult to verify the maintenance history, authenticity of the work carried out and the part provenance. If you're lucky some paper log books are present but these are often unreliable.

Auto Tracker is an app for the auto industry.

The app allows car owners to create a verifiable digital history of all maintenance and upgrades undertaken on the vehicle as well as prove the authenticity of any parts fitted. This information can then be shared, i.e. to potential buyers when selling the car.

The app allows registered service providers an interface to add products, mark work carried out to the Blockchain, track previous work history and ensure parts purchased are authentic.

![Screenshot](ScreenShot.png)

## How The App Works

#### Accounts:

All users must sign up using a valid Ethereum public address, ideally via MetaMask.

A 'Car Owner' register to use the app by adding details about their car which are then linked to their public account.

The app reads the currently active MetaMask account and adjusts the interface for that account info automatically.

#### App Flow:

'Service Providers' request the app Admin to add their 'brand' and address to the app as verified provider. Once this has been done they can then add products/service they will offer to car owners.

A 'Car Owner' takes their vehicle to their preferred service provider to carry out a job.

When a Service Provider has completed the work on the car they then mark the job as complete. This is now marked on the Blockchain providing a verifiable record linking the product, service provider, car and date.

Other users can trust that the provided history for any vehicle is now trustworthy and accurate.

#### Devery:

Devery built the Devery Protocol, a set of smart contracts enabling products to be marked on the Blockchain allowing for secure product verification and counterfeit protection. For the hackathon DeveryJS was released. An open-source Javascript framework for utilising the Devery protocol.

The app uses DeveryJS to make/read brands and products and mark products on the Blockchain. DeveryJS docs can be found [here](https://devery.github.io/deveryjs/index.html).


#### OrbitDb:

[OrbitDB](https://github.com/orbitdb/orbit-db) is a serverless, distributed, peer-to-peer database. OrbitDB uses IPFS as its data storage and IPFS Pubsub to automatically sync databases with peers.

The app uses a document database to store json records for the information that isn't stored on the Blockchain. This allows cost effective decentralisation.

## Running Project

Clone project: ```git clone https://github.com/johngrantuk/deveryHackathon```

```cd deveryHackathon```

Then: ```npm install```

Then: ```yarn start```

## Team Members and Contact info

John: @johngrantuk on github, johngrantuk@googlemail.com
