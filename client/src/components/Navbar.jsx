import logo from "../assets/blockchain.svg";
import { BiWallet, BiMenu } from "react-icons/bi"
import { AiOutlineCloseCircle } from "react-icons/ai"
import React, { useState } from "react";
function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(true);
  return (
    <header className="body-font">
      <div className="mx-auto p-5 flex md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src={logo} alt="logo" className="w-28 md:w-24 lg:w-32  lg:mr-4 md:mr-0 mr-4" />
          <span className="lg:text-5xl md:text-4xl text-5xl">Blockchain</span>
        </a>
        <ul className="md:ml-auto md:flex flex-wrap items-center text-base justify-center hidden list-none">
          {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => {
            return (
              <li className="lg:mr-10 mr-4 text-white font-semibold text-xl lg:text-2xl cursor-pointer hover:text-slate-800" key={index}>{item}</li>
            )
          })}
          <li className="list-none">
            <button className="inline-flex items-center bg-indigo-600 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-800 rounded text-xl lg:text-2xl mt-4 md:mt-0 text-white font-semibold">
              Login <BiWallet className="ml-3" />
            </button>
          </li>
        </ul>
        <ul className="flex ml-auto relative md:hidden">
          {toggleMenu ? <AiOutlineCloseCircle fontSize={50} className=" text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
            : <BiMenu fontSize={50} className=" text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />}
          {toggleMenu && (
            <ul className="z-10 fixed top-0 -right-2 p-3 w-[50vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md text-white blue-glassmorphism">
              <li className="text-xl w-full my-2">
                <AiOutlineCloseCircle fontSize={50} className=" text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
              </li>
              {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => {
                return (
                  <li className="mr-2 mb-5 text-white font-semibold text-3xl cursor-pointer hover:text-slate-800" key={index}>{item}</li>
                )
              })}
            </ul>
          )}
        </ul>
      </div>
    </header>

  )
}

export default Navbar