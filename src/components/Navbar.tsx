"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { CircleUserRound, Trophy, User } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdLogout } from "react-icons/md";
import { AiOutlineHistory } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { MdOutlineFeedback } from "react-icons/md";
import { RiFileList2Line } from "react-icons/ri";

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
      <div className="mx-14">
        <nav className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Image
              src="/logo/farmcred-03.png"
              alt="FarmCred Logo"
              width={200}
              height={50}
              className="mr-2"
            />
          </div>
          <div className="flex items-center">
            <ul className="flex space-x-8">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-2 outline-none">
                <Trophy className="text-[#157148]" />
                {initial ? (
                  <Avatar>
                    <AvatarImage></AvatarImage>
                    <AvatarFallback className="text-[#157148] font-semibold border-1 border-[#157148]">
                      {initial}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <CircleUserRound className="w-8 h-8 flex items-center justify-center text-[#157148]" />
                )}
                <span className="text-sm font-semibold text-[#157148]">
                  {username}
                </span>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-84 mt-2">
              <DropdownMenuLabel className=" bg-[#eff3e4] px-4 py-8 rounded-md ">
                <div className="flex flex-col items-center justify-center space-y-1">
                  {initial ? (
                    <Avatar>
                      <AvatarImage></AvatarImage>
                      <AvatarFallback className="text-[#157148] font-semibold border-1 border-[#157148]">
                        {initial}
                      </AvatarFallback>
                    </Avatar>
                  ) : null}

                  <div className="flex space-x-1 text-[#157148] text-sm">
                    <span className="font-semibold">{username}</span>
                    {/*<span>{id}</span>*/}
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuItem className="text-[#157148]">
                <Link
                  href="/dashboard/transactions"
                  className="flex items-center gap-2 w-full"
                >
                  <AiOutlineHistory className="text-[#157148]" />
                  Transaction History
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[#157148]">
                <Link
                  href="/dashboard/transfers"
                  className="flex items-center gap-2 w-full"
                >
                  <BsClockHistory className="text-[#157148]" />
                  Transfer History
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[#157148]">
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-2 w-full"
                >
                  <IoSettingsOutline className="text-[#157148]" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[#157148]">
                <Link
                  href="/signout"
                  className="flex items-center gap-2 w-full"
                >
                  <MdLogout className="text-[#157148]" />
                  Sign out
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-[#157148]">
                <Link href="/help" className="flex items-center gap-2 w-full">
                  <IoMdHelpCircleOutline className="text-[#157148]" />
                  Help & FAQ
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[#157148]">
                <Link href="/terms" className="flex items-center gap-2 w-full">
                  <RiFileList2Line className="text-[#157148]" />
                  Terms and Conditions
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[#157148]">
                <Link
                  href="/feedback"
                  className="flex items-center gap-2 w-full"
                >
                  <MdOutlineFeedback className="text-[#157148]" />
                  Send Feedback
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
