import React, { useContext } from "react"
import { TransactionContext } from "../context/TransactionContext"
import { BiSearchAlt } from "react-icons/bi"
import { shortenAddress } from "../utils/shortenAddress"

function Transactions() {
  const { currentAccount, transactions } = useContext(TransactionContext);
  return (
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
      <h1 className="mb-4 text-2xl font-semibold leading-tight">Transactions</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col className="w-24" />
          </colgroup>
          <thead className="dark:bg-gray-700">
            <tr className="text-left">
              <th className="p-3">Id</th>
              <th className="p-3">From</th>
              <th className="p-3">To</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Message</th>
              <th className="p-3">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {currentAccount && transactions.length && transactions.map((transaction, index) => {
              return (
                <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900" key={index}>
                  <td className="p-3">
                    <p>{index}</p>
                  </td>
                  <td className="p-3">
                    <p>{shortenAddress(transaction.addressFrom)}</p>
                  </td>
                  <td className="p-3">
                    <p>{shortenAddress(transaction.addressTo)}</p>
                  </td>
                  <td className="p-3">
                    <p>{transaction.amount}</p>
                  </td>
                  <td className="p-3">
                    <p>{transaction.message}</p>
                  </td>
                  <td className="p-3">
                    <p>{transaction.timestamp}</p>
                  </td>
                </tr>
              )
            })}
            {!currentAccount && (<tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
              <td colSpan={7}>
                <div className="py-2 flex flex-col justify-center items-center text-base">
                  <BiSearchAlt fontSize={30} />
                  Please connect your account to see the latest transactions
                </div>
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Transactions