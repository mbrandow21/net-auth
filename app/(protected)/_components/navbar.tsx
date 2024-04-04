"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";

const Navbar = () => {
  const pathName = usePathname();

  return ( 
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathName === "/Server" ? "default" : "outline"}
        >
          <Link
            href="/Server"
          >
            Server
          </Link>
        </Button>
        <Button
          asChild
          variant={pathName === "/client" ? "default" : "outline"}
        >
          <Link
            href="/client"
          >
            Client
          </Link>
        </Button>
        <Button
          asChild
          variant={pathName === "/Admin" ? "default" : "outline"}
        >
          <Link
            href="/Admin"
          >
            Admin
          </Link>
        </Button>
        <Button
          asChild
          variant={pathName === "/settings" ? "default" : "outline"}
        >
          <Link
            href="/settings"
          >
            Settings
          </Link>
        </Button>
      </div>
      <UserButton />
    </nav>
   );
}
 
export default Navbar;