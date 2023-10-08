"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import SignOutButton from "../SignOutButton";
import Image from "next/image";

import Logo from "/public/imgs/transparent-logo.png";

const NavBar = ({ token }: any) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserSignedIn, setIsUserSignedIn] = useState(!!token);
  const path = `/${token?.user.role}`;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-sky-100 border-gray-20">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-2xl font-semibold whitespace-nowrap">
          <Image src={Logo} width={100} height={100} alt="logo image" />
        </span>
        <div className="flex items-center md:order-2">
          {isUserSignedIn ? (
            <button
              className=" flex items-center justify-center gap-2 hover:bg-sky-200 p-4 rounded-lg"
              onClick={toggleDropdown}
            >
              <div className="w-7 h-7 bg-sky-500 rounded flex items-center justify-center">
                <FontAwesomeIcon
                  className="font-bold text-white"
                  icon={faUser}
                />
              </div>
              <span>Bonjour: {token.user.name}</span>
            </button>
          ) : (
            <Link href="/auth/signin" className="hover:bg-sky-200 p-2 rounded">
              Se connecter
            </Link>
          )}

          {isDropdownOpen && (
            <div className="flex flex-col absolute w-64 top-24 right-[21rem] rounded-2xl  bg-white border border-gray-200">
              <ul className="flex flex-col gap-1">
                <Link href={path}>
                  <li className="hover:bg-slate-100 p-4 rounded-t-2xl">
                    Profile
                  </li>
                </Link>
                <li className="hover:bg-slate-100 p-4 rounded-b-2xl">
                  <SignOutButton />
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
