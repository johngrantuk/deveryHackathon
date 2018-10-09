import { getMultihashFromBytes32 } from './multihash';

const ipfsHelper = require('./ipfsHelper');

exports.getItems = async (Web3, ItemContract, Account) => {
  const noItems = await ItemContract.getItemCount({ from: Account });
  const items = [];
  let i = 1;
  while (i < noItems.toNumber() + 1) {
    const hash = await ItemContract.getItem.call(i, { from: Account });
    const specHashDigest = hash[0];
    const specHashfunction = hash[1].toNumber();
    const specHashSize = hash[2].toNumber();
    const owner = hash[3];
    const bounty = hash[4].toNumber();
    const finalised = hash[5];
    const cancelled = hash[6];
    const specHash = getMultihashFromBytes32(
      specHashDigest,
      specHashfunction,
      specHashSize,
    );
    const info = await ipfsHelper.getItemSpecification(specHash);
    const noAnswers = hash[7].toNumber();
    const isBountyCollected = hash[8];

    items.push({
      id: info.id,
      itemNo: i,
      date: info.date,
      info: info.info,
      picLink: 'https://ipfs.io/ipfs/' + info.picHash,
      infoHash: specHash,
      bounty,
      bountyEth: Web3.fromWei(bounty, 'ether'),
      owner,
      finalised,
      cancelled,
      noAnswers,
      isBountyCollected,
      uportName: info.uportName,
    });
    i++;
  }

  return items;
};

exports.getItemAnswers = async (ItemContract, Account, ItemNo) => {
  let hash = await ItemContract.getItem.call(ItemNo, { from: Account });
  const noAnswers = hash[7].toNumber();
  const answers = [];
  let i = 1;

  while (i < noAnswers + 1) {
    hash = await ItemContract.getAnswer.call(ItemNo, i, { from: Account });
    const answerHashDigest = hash[0];
    const answerHashfunction = hash[1].toNumber();
    const answerHashSize = hash[2].toNumber();
    const answerOwner = hash[3];
    // let itemId = hash[4].toNumber();
    const output = getMultihashFromBytes32(
      answerHashDigest,
      answerHashfunction,
      answerHashSize,
    );

    const info = await ipfsHelper.getItemSpecification(output);

    answers.push({
      id: info.id,
      itemNo: ItemNo,
      answerNo: i,
      owner: answerOwner,
      date: info.date,
      answer: info.answer,
      uportName: info.uportName,
    });
    i++;
  }

  return answers;
};

exports.getItemAnswer = async (ItemContract, Account, ItemNo) => {
  const hash = await ItemContract.getAcceptedAnswer.call(ItemNo, {
    from: Account,
  });
  const answerHashDigest = hash[0];
  const answerHashfunction = hash[1].toNumber();
  const answerHashSize = hash[2].toNumber();

  const answerHash = getMultihashFromBytes32(
    answerHashDigest,
    answerHashfunction,
    answerHashSize,
  );

  const info = await ipfsHelper.getItemSpecification(answerHash);

  return info;
};
