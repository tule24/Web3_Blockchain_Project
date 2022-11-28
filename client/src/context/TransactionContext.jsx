import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    return transactionContract;
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState();
    const [formData, setFormData] = useState({addressTo: "", amount: "", message: ""});
    const [transactions, setTransactions] = useState([]);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const getAllTransaction = async() => {
        try {
            if (!ethereum) return alert("Please install metamask");
            const transactionContract = getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions();
            const structTransaction = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                amount: parseInt(transaction.amount._hex) / (10**18),
                message: transaction.message
            }))
            setTransactions([...structTransaction]);
        } catch(err){
            console.log(err);
            throw new Error("No ethereum connect")
        }
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            accounts && setCurrentAccount(accounts[0]);
            accounts && getAllTransaction();
        } catch(err){
            console.log(err);
            throw new Error("No ethereum connect")
        }
    }

    const checkIfTransactionsExist = async() => {
        try {
            if (!ethereum) return alert("Please install metamask");
            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();
            window.localStorage.setItem("transactionCount", transactionCount.toNumber());
        } catch(err){
            console.log(err);
            throw new Error("No ethereum connect")
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            accounts && setCurrentAccount(accounts[0]);
        } catch (err) {
            console.log(err);
            throw new Error("No ethereum connect")
        }
    }

    const sendTransaction = async() => {
        try{
            if (!ethereum) return alert("Please install metamask");
            const {addressTo, amount, message} = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: "0x5208", // 21000 gwei
                    value: parsedAmount._hex, // 0.00001
                }]
            })

            const transactionHash = await transactionContract.transfer(addressTo, parsedAmount, message);
            await transactionHash.wait();   
            getAllTransaction();        
        } catch(err){
            console.log(err);
            throw new Error("No ethereum connect")
        }
    }
    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, [])
    return (
        <TransactionContext.Provider value={{connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, transactions}}>
            {children}
        </TransactionContext.Provider>
    )
}