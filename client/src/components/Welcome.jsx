import React, { useContext, useState } from "react"
import { AiFillPlayCircle } from "react-icons/ai"
import { SiEthereum } from "react-icons/si"
import { BsInfoCircle } from "react-icons/bs"
import { TransactionContext } from "../context/TransactionContext"
import { Loader } from "./";
import {shortenAddress} from "../utils/shortenAddress"

function Welcome() {
  const { connectWallet, currentAccount, formData, handleChange, sendTransaction } = useContext(TransactionContext);
  const handleSubmit = (e) => {
    const { addressTo, amount, message } = formData;
    e.preventDefault();
    if (!addressTo || !amount || !message) return;
    sendTransaction();
  }
  const commonStyle = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";
  const inputStyle = "my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism";
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between mf:p-20 py-12 px-4">
        <div className="flex flex-1 flex-col justify-between mf:mr-10">
          <div>
            <h1 className="text-3xl sm:text-5xl text-white py-1 text-gradient">Send Crypto <br /> across the world</h1>
            <p className="text-left my-5 text-white font-light mf:w-9/12 text-base">
              Explore the crypto world. Buy and sell cryptocurrencies easily on Blockchain.
            </p>
          </div>
          {!currentAccount && <button type="button" onClick={connectWallet} className="bg-indigo-600 border-0 py-1 px-3 mt-3 focus:outline-none hover:bg-indigo-800 rounded-full text-2xl text-white font-semibold">Connect Wallet</button>}
          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${commonStyle}`}>Reliability</div>
            <div className={commonStyle}>Security</div>
            <div className={`rounded-tr-2xl ${commonStyle}`}>Ethereum</div>
            <div className={`rounded-bl-2xl ${commonStyle}`}>Web 3.0</div>
            <div className={commonStyle}>Low fees</div>
            <div className={`rounded-br-2xl ${commonStyle}`}>Blockchain</div>
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  Address
                </p>
                <p className="text-white font-semibold text-lg">
                  {currentAccount ? shortenAddress(currentAccount) : "Ethereum"}
                </p>
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <input type="text" placeholder="Address to" name="addressTo" onChange={(e) => handleChange(e)} className={inputStyle} />
            <input type="number" placeholder="Amount (ETH)" name="amount" step="0.0001" onChange={(e) => handleChange(e)} min={0} className={inputStyle} />
            <input type="text" placeholder="Enter Message" name="message" onChange={(e) => handleChange(e)} className={inputStyle} />
            <div className="h-[1px] w-full bg-gray-400 my-2" />
            {false ? (<Loader />)
              : (<button type="button" onClick={handleSubmit} className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer bg-slate-700 hover:bg-slate-800">Send Now</button>)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome