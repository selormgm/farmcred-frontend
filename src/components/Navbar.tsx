"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { CircleUserRound, Trophy, User } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

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
                    className={`text-lg pb-1 transition-all duration-150 relative
                      ${
                        isActive(link.href)
                          ? "text-[#158F20] font-semibold after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[130%] after:h-[2px] after:bg-[#158F20] after:rounded-[10px]"
                          : "text-[#157148] hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-1/2 hover:after:-translate-x-1/2 hover:after:w-[110%] hover:after:h-[2px] hover:after:bg-[#157148] hover:after:rounded-[10px]"
                      }
                      `}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy className="text-[#157148]" />
            {initial ? (
              <Avatar>
                <AvatarImage></AvatarImage>
                <AvatarFallback className="text-[#157148] border-1 border-[#157148]">
                  {initial}
                </AvatarFallback>
              </Avatar>
            ) : (
              <CircleUserRound className="w-8 h-8 flex items-center justify-center text-[#157148]" />
            )}

            <span className="text-sm text-[#157148]">{username}</span>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
