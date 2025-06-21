"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { CircleUserRound, Trophy, User } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface NavbarProps {
  username?: string;
}

const Navbar = ({ username = "Loading..." }: NavbarProps) => {
  const initial = username.charAt(0).toUpperCase();
  const pathname = usePathname();

  const navlinks = [
    { name: "Home", href: "/dashboard" },
    { name: "Transactions", href: "/dashboard/transactions" },
    { name: "Transfers", href: "/dashboard/transfers" },
    { name: "Trust Breakdown", href: "/dashboard/trust-breakdown" },
    { name: "Settings", href: "/dashboard/settings" },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <div>
      <div className=" mx-24">
        <nav className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Image
              src="/logo/logo-01.png"
              alt="FarmCred Logo"
              width={50}
              height={50}
              className="mr-2"
            />
          </div>
          <div className="flex items-center">
            <ul className="flex space-x-4">
              {navlinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className={`text-[#05402E] text-lg pb-1 transition-all duration-50 ${
                      isActive(link.href) 
                        ? 'border-b-2 border-[#05402E] font-semibold' 
                        : 'hover:border-b-2 hover:border-[#05402E]'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy className="text-[#05402E]" />
            <CircleUserRound className="w-8 h-8 flex items-center justify-center" />
            <span className="text-sm">{username}</span>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;