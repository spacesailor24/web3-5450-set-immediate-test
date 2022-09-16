import Web3 from 'web3';

import { ERC20TokenAbi, ERC20TokenBytecode } from './ERC20Token';

const chainIdDiv = document.getElementById('chainId');
const accountsDiv = document.getElementById('accounts');

const type0x0ReceiptDiv = document.getElementById('type0x0Receipt');
const type0x0TransactionDiv = document.getElementById('type0x0Transaction');

const type0x2ReceiptDiv = document.getElementById('type0x2Receipt');
const type0x2TransactionDiv = document.getElementById('type0x2Transaction');

const erc20AddressDiv = document.getElementById('erc20Address');
const erc20NameDiv = document.getElementById('erc20Name');
const erc20SymbolDiv = document.getElementById('erc20Symbol');
const erc20DecimalsDiv = document.getElementById('erc20Decimals');
const erc20TotalSupplyDiv = document.getElementById('erc20TotalSupply');
const erc20TransferReceiptDiv = document.getElementById('erc20TransferReceipt');
const erc20TransferTransactionDiv = document.getElementById('erc20TransferTransaction');

(async () => {
    const web3 = new Web3('http://127.0.0.1:8545');

    const chainId = await web3.eth.getChainId();
    chainIdDiv.innerHTML = chainId;

    const accounts = await web3.eth.getAccounts();
    accountsDiv.innerHTML = JSON.stringify(accounts, null, 2);

    const transaction0x0Receipt = await web3.eth.sendTransaction({
        type: 0,
        from: accounts[0],
        to: accounts[1],
        value: 1
    }, { number: 'NUMBER_NUMBER' , bytes: 'BYTES_HEX' });
    type0x0ReceiptDiv.innerHTML = JSON.stringify(transaction0x0Receipt, null, 2);
    const transaction0x0 = await web3.eth.getTransaction(transaction0x0Receipt.transactionHash, { number: 'NUMBER_NUMBER' , bytes: 'BYTES_HEX' });
    type0x0TransactionDiv.innerHTML = JSON.stringify(transaction0x0, null, 2);

    const transaction0x2Receipt = await web3.eth.sendTransaction({
        type: 2,
        from: accounts[0],
        to: accounts[1],
        value: 1
    }, { number: 'NUMBER_NUMBER' , bytes: 'BYTES_HEX' });
    type0x2ReceiptDiv.innerHTML = JSON.stringify(transaction0x2Receipt, null, 2);
    const transaction0x2 = await web3.eth.getTransaction(transaction0x2Receipt.transactionHash, { number: 'NUMBER_NUMBER' , bytes: 'BYTES_HEX' });
    type0x2TransactionDiv.innerHTML = JSON.stringify(transaction0x2, null, 2);

    const deployedErc20Contract = await new web3.eth.Contract(ERC20TokenAbi).deploy({
        data: ERC20TokenBytecode,
        arguments: ['999999999'],
    }).send({ from: accounts[0], gas: '10000000' });
    erc20AddressDiv.innerHTML = deployedErc20Contract.options.address;
    erc20NameDiv.innerHTML = await deployedErc20Contract.methods.name().call();
    erc20SymbolDiv.innerHTML = await deployedErc20Contract.methods.symbol().call();
    erc20DecimalsDiv.innerHTML = await deployedErc20Contract.methods.decimals().call();
    erc20TotalSupplyDiv.innerHTML = await deployedErc20Contract.methods.totalSupply().call();
    // TODO Update contract.methods.x to accept format object
    const erc20TransferReceipt = await deployedErc20Contract.methods.transfer(accounts[1], 1).send({
        from: accounts[0]
    });
    Object.keys(erc20TransferReceipt).forEach(key => {
        if (typeof erc20TransferReceipt[key] === 'bigint') erc20TransferReceipt[key] = erc20TransferReceipt[key].toString();
        if (key === 'logs') {
            erc20TransferReceipt[key].forEach(log => {
                Object.keys(log).forEach(logKey => {
                    if (typeof log[logKey] === 'bigint') log[logKey] = log[logKey].toString();
                })
            })
        }
    });
    erc20TransferReceiptDiv.innerHTML = JSON.stringify(erc20TransferReceipt, null, 2);
    const erc20TransferTransaction = await web3.eth.getTransaction(erc20TransferReceipt.transactionHash, { number: 'NUMBER_NUMBER' , bytes: 'BYTES_HEX' });
    erc20TransferTransactionDiv.innerHTML = JSON.stringify(erc20TransferTransaction, null, 2);
})();
