import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { CircleUserRound, Trophy, User } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const username = "Sidney Mensah";
  const initial = username.charAt(0).toUpperCase();
  const [active, isActive] = useState();

  const navlinks = [
    { name: "Home", href: "/dashboard" },
    { name: "Transactions", href: "/dashboard/transactions" },
    { name: "Transfers", href: "/dashboard/transfers" },
    { name: "Trust Breakdown", href: "/dashboard/trust-breakdown" },
    { name: "Settings", href: "/dashboard/settings" },
  ];

  

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
                  <Button variant="link">
                    <Link href={link.href} className="text-[#05402E] text-lg">
                      {link.name}
                    </Link>
                  </Button>
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
